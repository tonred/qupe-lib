import { type Address, type Contract, type ProviderRpcClient } from 'everscale-inpage-provider'

import { PlatformType } from '../types'
import { PlatformAbi, PlatformTvc } from '../abi'
import {
    type ServerType, type ProfileType, type RoomType, type MessageType,
} from './types'
import { Base } from './base'


export abstract class Root<
    S extends ServerType,
    P extends ProfileType,
    R extends RoomType,
    M extends MessageType,
    Abi
> extends Base<Abi> {

    _profileCache = new Map<string, P>()

    _serverCache = new Map<number, S>()

    private _contractWallet?: Contract<Abi> = undefined

    protected constructor(
        protected readonly rpc: ProviderRpcClient,
        protected readonly abi: Abi,
        readonly address: Address,
    ) {
        super(rpc, abi, address)
    }

    protected get stateTtl(): number {
        return -1
    }

    abstract get impl(): {
        Server: new(rpc: ProviderRpcClient, address: Address, root: any) => S,
        Profile: new(rpc: ProviderRpcClient, address: Address, root: any) => P,
        Room: new(rpc: ProviderRpcClient, address: Address, root: any) => R,
        Message?: new(rpc: ProviderRpcClient, address: Address) => M
    }

    connectUserWallet(rpc: ProviderRpcClient): void {
        this._contractWallet = new rpc.Contract(this.abi, this.address)
    }

    protected get contractWallet(): Contract<Abi> {
        return this._contractWallet!
    }

    async getServer(
        serverId: number,
    ): Promise<S> {
        const saved = this._serverCache.get(serverId)
        if (saved) return saved
        const instance = new this.impl.Server(this.rpc, await this.expectedServerAddress(serverId), this)
        await instance.init()
        this._serverCache.set(serverId, instance)
        return instance
    }

    async getProfile(
        owner: Address,
    ): Promise<P> {
        const profileAddress = await this.expectedProfileAddress(owner)
        const saved = this._profileCache.get(profileAddress.toString())
        if (saved) return saved
        const instance = new this.impl.Profile(this.rpc, profileAddress, this)
        this._profileCache.set(profileAddress.toString(), instance)
        await instance.init()
        return instance
    }

    async getProfileFromAddress(
        address: Address,
    ): Promise<P> {
        const saved = this._profileCache.get(address.toString())
        if (saved) return saved
        const instance = new this.impl.Profile(this.rpc, address, this)
        this._profileCache.set(address.toString(), instance)
        await instance.init()
        return instance
    }

    abstract deployProfile(
        from: Address,
        pubkeys: (string | number)[],
        meta: any,
        onDeploy: (profile?: P) => void,
    ): Promise<void>

    // eslint-disable-next-line class-methods-use-this
    parseData(): Promise<void> {
        return Promise.resolve(undefined)
    }

    async expectedPlatformAddr(
        root: Address,
        deployer: Address,
        platformType: PlatformType,
        initialData: string,
    ): Promise<Address> {
        return this.rpc.getExpectedAddress(PlatformAbi, {
            initParams: {
                _deployer: deployer,
                _initialData: initialData,
                _platformType: platformType,
                _root: root,
            },
            tvc: PlatformTvc,
        })
    }

    async expectedProfileAddress(owner: Address): Promise<Address> {
        const { boc: initData } = await this.rpc.packIntoCell({
            data: { owner },
            structure: [
                { name: 'owner', type: 'address' },
            ] as const,
        })
        return this.expectedPlatformAddr(this.address, this.address, PlatformType.PROFILE, initData)
    }

    async expectedServerAddress(serverID: number): Promise<Address> {
        const { boc: initData } = await this.rpc.packIntoCell({
            data: { serverID },
            structure: [
                { name: 'serverID', type: 'uint64' },
            ] as const,
        })
        return this.expectedPlatformAddr(this.address, this.address, PlatformType.SERVER, initData)
    }

    // async packMessageInitData(serverID: number, roomID: number, messageID: number): Promise<Address> {
    //     const { boc: initData } = await this.rpc.packIntoCell({
    //         data: { serverID, roomID, messageID },
    //         structure: [
    //             { name: 'serverID', type: 'uint64' },
    //             { name: 'roomID', type: 'uint64' },
    //             { name: 'messageID', type: 'uint64' },
    //         ] as const,
    //     })
    //     return initData
    // }

    // deployChatServer
    // deployProfile

}
