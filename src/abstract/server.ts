import { type Address, type ProviderRpcClient } from 'everscale-inpage-provider'

import { PlatformType } from '../types'
import {
    type MessageType, type ProfileType, type RoomType, type RootType,
} from './types'
import { Base } from './base'
import { UserPermissions } from '../permissions'

export abstract class Server<
    R extends RootType,
    // @ts-ignore
    // eslint-disable-next-line unused-imports/no-unused-vars-ts
    P extends ProfileType,
    // @ts-ignore
    // eslint-disable-next-line unused-imports/no-unused-vars-ts
    Rm extends RoomType,
    // @ts-ignore
    // eslint-disable-next-line unused-imports/no-unused-vars-ts
    M extends MessageType,
    Abi
> extends Base<Abi> {

    defaultPermissions = new UserPermissions()

    baseData?: {
        serverId: number
        roomsCount: number
        root: Address
        defaultPermissions: any
        balance: string
        token: Address
        wallet: Address
    }

    _roomsCache = new Map<number, Rm>()

    protected constructor(
        protected readonly rpc: ProviderRpcClient,
        protected readonly abi: Abi,
        readonly address: Address,
        readonly root: R,
    ) {
        super(rpc, abi, address)
    }

    async expectedRoomAddress(roomID: number): Promise<Address> {
        const { boc: initData } = await this.rpc.packIntoCell({
            data: { roomID, serverID: this.baseData!.serverId },
            structure: [
                { name: 'serverID', type: 'uint64' },
                { name: 'roomID', type: 'uint64' },
            ] as const,
        })
        return this.root.expectedPlatformAddr(this.root.address, this.address, PlatformType.ROOM, initData)
    }

    // abstract getRoomById(roomID: number): Promise<Rm>

    get id(): number | undefined {
        return this.baseData?.serverId
    }

    // abstract createRoom(): Promise<R | null>

    abstract update(): Promise<any>

    // abstract join(profile: P): Promise<void>
    // abstract getRoomById(id: number): Promise<R | null>

}
