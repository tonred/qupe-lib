import { type Address, type ProviderRpcClient } from 'everscale-inpage-provider'

import { ChatAbi } from '../abi'
import { MessageValues } from '../constants'
import { Root } from '../abstract/root'
import { ChatServer } from './server'
import { ChatProfile } from './profile'
import { ChatRoom } from './room'
import {
    type ChatProfileMeta, chatProfileMetaSchema, type ChatServerMeta, chatServerMetaSchema,
} from './schema'
import { contentEncoder, zeroAddress } from '../utils'

export class ChatRoot extends Root<
    ChatServer,
    ChatProfile,
    ChatRoom,
    any,
    typeof ChatAbi.Root
> {

    constructor(rpc: ProviderRpcClient, address: Address) {
        super(rpc, ChatAbi.Root, address)
    }

    async deployServer(
        owner: Address,
        meta: ChatServerMeta,
        onCreate: (s?: ChatServer) => void,
    ): Promise<ChatServer | undefined> {
        const tx = await this.contractWallet.methods.createServer({
            answerId: 0x1ea31cf1,
            info: {
                createRoomPayment: {
                    amount: 0,
                    token: zeroAddress,
                },
                meta: contentEncoder(await chatServerMetaSchema.validate(meta)),
            },
            owner,
        }).send({
            amount: MessageValues.Root.DeployServer.toString(),
            bounce: true,
            from: owner,
        })
        const ownerProfile = new this.rpc.Contract(ChatAbi.Profile, await this.expectedProfileAddress(owner))
        const subscriber = new this.rpc.Subscriber()
        subscriber.trace(tx).on(i => {
            if (i.account.equals(ownerProfile.address)) {
                ownerProfile.decodeTransactionEvents({ transaction: i })
                    .then(events => {
                        events.forEach(e => {
                            if (e.event === 'Joined') {
                                this.getServer(Number(e.data.serverID)).then(s => {
                                    onCreate(s)
                                })
                                subscriber.unsubscribe()
                            }
                        })
                    })

            }
        })
        // const callbacks = new this.rpc.Contract(ChatAbi.Callbacks, this.address)
        //
        // for (const msg of tx.outMessages) {
        //     if (msg.dst && msg.dst.equals(this.address)) {
        //         // eslint-disable-next-line no-constant-condition
        //         while (true) {
        //             const { transaction: serverTx } = await this.rpc.rawApi.findTransaction({ inMessageHash: msg.hash })
        //             // eslint-disable-next-line no-promise-executor-return
        //             if (!serverTx) await new Promise(f => setTimeout(f, 3000))
        //             else {
        //                 for (const msgCallback of serverTx.outMessages) {
        //                     if (msgCallback.body) {
        //                         const r = await callbacks.decodeInputMessage({
        //                             body: msgCallback.body,
        //                             internal: true,
        //                             methods: ['ServerCreated'],
        //                         })
        //                         if (r) {
        //                             const server = new this.impl.Server(this.rpc, r.input.address, this)
        //                             await server.init()
        //                             this._serverCache.set(server.id!, server)
        //                             // @ts-ignore
        //                             return server
        //                         }
        //                     }
        //                 }
        //                 return undefined
        //             }
        //         }
        //     }
        // }
        return undefined
    }

    async deployProfile(
        from: Address,
        pubkeys: (string | number)[],
        meta: ChatProfileMeta,
        onDeploy: (profile?: ChatProfile) => void,
    ): Promise<void> {
        const tx = await this.contractWallet.methods.createProfile({
            answerId: 0,
            meta: contentEncoder(await chatProfileMetaSchema.validate(meta)),
            minTagValue: 0,
            pubkeys,
        }).send({
            amount: MessageValues.Root.DeployProfile.toString(),
            bounce: true,
            from,
        })

        const expectedProfileAddress = await this.expectedProfileAddress(from)

        const subscriber = new this.rpc.Subscriber()
        subscriber.trace(tx).on(i => {
            if (i.account.equals(expectedProfileAddress)) {
                subscriber.unsubscribe()
                this.getProfileFromAddress(expectedProfileAddress).then(onDeploy)
            }
        })
    }

    get impl(): {
        Server: new(rpc: ProviderRpcClient, address: Address, root: ChatRoot) => ChatServer,
        Profile: new(rpc: ProviderRpcClient, address: Address, root: ChatRoot) => ChatProfile,
        Room: new(rpc: ProviderRpcClient, address: Address, root: ChatRoot) => ChatRoom,
        Message?: new(rpc: ProviderRpcClient, address: Address) => undefined
        } {
        return { Profile: ChatProfile, Room: ChatRoom, Server: ChatServer }
    }

}
