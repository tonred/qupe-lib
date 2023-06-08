import {
    type Address, type ProviderRpcClient, type TransactionId, type Subscription,
} from 'everscale-inpage-provider'
import { type Transaction } from 'everscale-inpage-provider/dist/models'

import { Room } from '../abstract/room'
import { ChatAbi } from '../abi'
import { contentDecoder, decStringToUint256Hex, zeroAddress } from '../utils'
import { ChatServer } from './server'
import { type ChatMessage, type ChatRoomMeta, chatRoomMetaSchema } from './schema'
import { type ChatRoot } from './root'
import { type ChatRoomData, type MessageData } from './types'
import { type ChatProfile } from './profile'
import { UserPermissions } from '../permissions'

export interface StoredMessage {
    hash: string,
    data: MessageData,
    createdAt: number,
    sender: Address,
    profile: ChatProfile,
    isHidden?: boolean
}
export class ChatRoom extends Room<ChatRoot, ChatServer, ChatProfile, any, typeof ChatAbi.Room> {

    roomData?: {
        info: ChatRoomData
    }


    private _profileContract = new this.rpc.Contract(ChatAbi.Profile, zeroAddress)

    storedMessages = new Map<number, StoredMessage>()

    pendingMessages = new Map<number, StoredMessage>()

    subscriptions: {
        onMessage: (() => void)[]
    } = { onMessage: [] }

    constructor(rpc: ProviderRpcClient, address: Address, root: ChatRoot) {
        super(rpc, ChatAbi.Room, address, root)
    }

    protected get stateTtl(): number {
        return 240
    }

    getServer(): ChatServer {
        return new ChatServer(this.rpc, zeroAddress, this.root)
    }

    addPendingMessage(data: StoredMessage): void {
        if (this.pendingMessages.size === 0) {
            this.pendingMessages.set(100_000_000, data)
        }
        else {
            this.pendingMessages.set(Math.max(...[...this.pendingMessages.keys()]) + 1, data)
        }
        this.subscriptions.onMessage.forEach(c => c())
    }


    gcPendingMessages(): void {

    }

    async getMessages(limit: number, startFrom?: TransactionId): Promise<{ continuation: TransactionId | undefined }> {
        const { transactions, continuation } = await this.rpc.getTransactions({
            address: this.address,
            continuation: startFrom,
            limit,
        })
        await this.processNewTransactions(transactions)

        return { continuation }
    }

    private async processNewTransactions(transactions: Transaction[]): Promise<void> {
        const acceptedMessages: [number, string][] = []
        for (const tx of transactions) {
            for (const { event, data } of await this.contract.decodeTransactionEvents({
                transaction: tx,
            })) {
                if (event === 'MessageAccepted') {
                    acceptedMessages.push([Number(data.messageID), decStringToUint256Hex(data.messageHash)])
                }
            }
        }
        console.log(`Found: ${acceptedMessages.length} messages`)
        const p: Promise<{ transaction: Transaction<any> | undefined }>[] = []
        acceptedMessages.forEach(value => {
            if (this.storedMessages.has(value[0])) {
                p.push(Promise.resolve({ transaction: undefined }))
            }
            else {
                p.push(this.rpc.rawApi.findTransaction({ inMessageHash: value[1] }))
            }
        })
        const inMsgTxs = await Promise.all(p)
        await Promise.all(acceptedMessages.map(async (value, index) => {
            const { transaction } = inMsgTxs[index]
            if (transaction) {
                const decoded = await this._profileContract.decodeTransaction({
                    methods: ['sendMessage'],
                    transaction,
                })
                if (decoded) {
                    const data = decoded.input
                    // @ts-ignore
                    data.message = contentDecoder<MessageData['message']>(data.message)
                    this.pendingMessages.forEach((pending, key, map) => {
                        if (pending.hash === value[1]) {
                            map.delete(key)
                        }
                    })
                    const sender = transaction.inMessage.dst
                    const profile = await this.root.getProfileFromAddress(sender)
                    const userPermissions = profile.permissions.get(this.address.toString())
                    const isHidden = userPermissions ? !userPermissions.canSendMessage : undefined
                    this.storedMessages.set(value[0], {
                        createdAt: transaction.createdAt,
                        data: data as MessageData,
                        hash: value[1],
                        isHidden,
                        profile,
                        sender,
                    })
                }
            }
        }))
    }

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendMessage(data: any, from: ChatProfile, replayTo: ChatMessage | undefined): Promise<ChatMessage> {
        // @ts-ignore
        return Promise.resolve(undefined)
    }

    // @ts-ignore
    async subscribe(onMessage: () => void): Promise<Subscription<any>> {
        this.subscriptions.onMessage.push(onMessage)
        const s = await this.rpc.subscribe('transactionsFound', { address: this.address })
        s.on('data', data => {
            this.processNewTransactions(data.transactions).then(onMessage)

            // this._accountStore.getAccountState(this.address).then(() => {
            //     onMessage()
            // })
        })
        return s
    }

    async update(): Promise<any> {
        await this.getState(true)
        return this.parseData()
    }

    async parseMeta(bytes: string): Promise<ChatRoomMeta> {
        return chatRoomMetaSchema.validate(contentDecoder(bytes))
    }

    async parseData(): Promise<void> {
        const state = await this.getState()
        if (!state) return
        const { fields } = await this.contract.getFields({ cachedState: state })
        if (!fields) return

        const info = fields._info
        this.roomData = {
            info: {
                highlightMessagePayment: info.highlightMessagePayment,
                messagePayment: info.messagePayment,
                meta: await this.parseMeta(info.meta),
            },
        }
        const { values: permissions } = fields._defaultPermissions
        this.defaultPermissions = new UserPermissions(permissions)
        this.baseData = {
            balance: fields._balance,
            defaultPermissions: permissions,
            messagesCount: Number(fields._messagesCount),
            roomId: Number(fields._roomID),
            root: fields._root,
            serverId: Number(fields._serverID),
            token: fields._token,
            wallet: fields._wallet,
        }
    }

    info(): ChatRoomData | undefined {
        return this.roomData?.info
    }

}
