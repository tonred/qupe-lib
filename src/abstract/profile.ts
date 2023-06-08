import { type Address, type Contract, type ProviderRpcClient } from 'everscale-inpage-provider'

import { type RootType, type ServerType } from './types'
import { Base } from './base'
import { type UserPermissions } from '../permissions'

export abstract class Profile<
    // @ts-ignore
    // eslint-disable-next-line unused-imports/no-unused-vars-ts
    R extends RootType,
    S extends ServerType,
    Abi
> extends Base<Abi> {

    permissions = new Map<string, UserPermissions>()

    protected _contractWallet?: Contract<Abi> = undefined

    protected constructor(
        protected readonly rpc: ProviderRpcClient,
        protected readonly abi: Abi,
        readonly address: Address,
        readonly root: R,
    ) {
        super(rpc, abi, address)
    }

    connectUserWallet(rpc: ProviderRpcClient): void {
        this._contractWallet = new rpc.Contract(this.abi, this.address)
    }

    abstract getServers(): Promise<S[]>

    abstract update(): Promise<any>

}
