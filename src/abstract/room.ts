import { type Address, type ProviderRpcClient, type Subscription } from 'everscale-inpage-provider'

import {
    type MessageType, type ProfileType, type RootType, type ServerType,
} from './types'
import { Base } from './base'
import { UserPermissions } from '../permissions'

export abstract class Room<
    R extends RootType,
    S extends ServerType,
    P extends ProfileType,
    M extends MessageType,
    Abi
> extends Base<Abi> {

    defaultPermissions = new UserPermissions()

    baseData?: {
        serverId: number
        roomId: number
        messagesCount: number
        root: Address
        defaultPermissions: any
        balance: string
        token: Address
        wallet: Address
    }

    protected constructor(
        protected readonly rpc: ProviderRpcClient,
        protected readonly abi: Abi,
        readonly address: Address,
        readonly root: R,
    ) {
        super(rpc, abi, address)
    }

    abstract getServer(): S

    // abstract getMessages(limit: number, startFrom?: TransactionId): Promise<void>

    abstract update(): Promise<any>

    abstract subscribe(
        onMessage: () => Promise<void>,
        onUpdate: () => Promise<void>,
    ): Promise<Subscription<any>>


    abstract sendMessage(
        data: any,
        from: P,
        replayTo?: M,
    ): Promise<M>

}
