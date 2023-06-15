import { type Address, type ProviderRpcClient, type Subscription } from 'everscale-inpage-provider'

import { Profile } from '../abstract/profile'
import { type ChatServer } from './server'
import { ChatAbi } from '../abi'
import { type ChatRoot } from './root'
import { contentDecoder, contentEncoder, zeroAddress } from '../utils'
import { type ChatRoom } from './room'
import { CHAT_MESSAGE_VERSION, MessageValues } from '../constants'
import { EMPTY_PAYMENT } from '../abstract/constants'
import { type PaymentInfo } from '../types'
import {
    type ChatProfileMeta,
    chatProfileMetaSchema,
    type ChatRoomMeta,
    chatRoomMetaSchema,
    type ChatServerMeta,
    chatServerMetaSchema,
} from './schema'
import { UserPermissions } from '../permissions'
import { type ChatRoomData } from './types'


export class ChatProfile extends Profile<ChatRoot, ChatServer, typeof ChatAbi.Profile> {

    jointServers = new Map<number, boolean>()

    balances = new Map<string, string>()

    meta?: ChatProfileMeta

    owner?: Address


    constructor(rpc: ProviderRpcClient, address: Address, root: ChatRoot) {
        super(rpc, ChatAbi.Profile, address, root)
    }

    async subscribe(onStateChanged: () => void): Promise<Subscription<'contractStateChanged'>> {
        const subscription = await this.rpc.subscribe('contractStateChanged', { address: this.address })
        subscription.on('data', data => {
            this.balance = data.state.balance
            this.isDeployed = data.state.isDeployed
            onStateChanged()
        })
        return subscription
    }

    protected get stateTtl(): number {
        return 120
    }

    async joinServer(server: number | ChatServer, onJoin: () => void): Promise<void> {
        const serverId = typeof server === 'number' ? server : server.id
        if (!this._contractWallet || serverId === undefined || this.owner === undefined) return
        const tx = await this._contractWallet?.methods.join({ serverID: serverId }).send({
            amount: MessageValues.Server.Join.toString(),
            bounce: true,
            from: this.owner,
        })
        const subscriber = new this.rpc.Subscriber()
        await subscriber.trace(tx).filter(async i => {
            if (i.account.equals(this.address)) {
                const decoded = await this.contract.decodeTransactionEvents({ transaction: i })
                for (const event of decoded) {
                    if (event.event === 'Joined') {
                        onJoin()
                    }
                }
            }
            return false
        }).first()
        await subscriber.unsubscribe()

    }

    async sendMessage(
        rpc: ProviderRpcClient,
        room: ChatRoom,
        message: string,
        publicKey: string,
        forwardMessageHash?: string,
        replyToMessageHash?: string,
        onSend?: () => void,
        highlight: boolean | undefined = false,
        payment: PaymentInfo | undefined = EMPTY_PAYMENT,
    ): Promise<void> {
        if (!room.baseData) {
            return
        }
        const contract = new rpc.Contract(ChatAbi.Profile, this.contract.address)
        const messageData = { c: message }
        const params = {
            forwardMessageHash,
            highlight,
            message: contentEncoder(messageData),
            payment,
            replyToMessageHash,
            roomID: room.baseData.roomId,
            serverID: room.baseData.serverId,
            tags: [], // todo
            version: CHAT_MESSAGE_VERSION,
        }
        const delayedMessageExecution = await contract.methods.sendMessage({
            ...params,
            forwardMessageHash: forwardMessageHash || null,
            replyToMessageHash: replyToMessageHash || null,
        }).sendExternalDelayed({
            publicKey,
        })
        room.addPendingMessage({
            createdAt: new Date().getTime() / 1000,
            data: {
                ...params,
                message: messageData,
            },
            hash: delayedMessageExecution.messageHash,
            profile: this,
            sender: this.address,
        })
        if (onSend !== undefined) {
            delayedMessageExecution.transaction.then(tx => {
                const subscriber = new this.rpc.Subscriber()
                subscriber.trace(tx).filter(i => i.account.equals(room.address)).first().then(roomTx => {
                    if (roomTx) {
                        room.contract.decodeTransactionEvents({ transaction: roomTx }).then(events => {
                            events.forEach(e => {
                                if (e.event === 'MessageAccepted') {
                                    onSend()
                                }
                            })
                        })
                    }
                    subscriber.unsubscribe()
                })

            })
        }

    }

    async getServers(): Promise<ChatServer[]> {
        const servers = []
        for (const entrie of this.jointServers.entries()) {
            if (entrie[1]) {
                servers.push(await this.root.getServer(entrie[0]))
            }
        }
        return servers
    }

    async depositNative(amount: string, onDeposit: () => void): Promise<void> {
        if (!this.owner || !this._contractWallet) return
        const tx = await this._contractWallet.methods.deposit({})
            .send({
                amount,
                bounce: true,
                from: this.owner,
            })
        const subscriber = new this.rpc.Subscriber()
        await subscriber.trace(tx).filter(i => i.account.equals(this.address)).first()
        await subscriber.unsubscribe()
        onDeposit()
    }

    async withdrawNativeFrom(entity: Address, onWithdraw: () => void): Promise<void> {
        if (!this.owner || !this._contractWallet) return
        const tx = await this._contractWallet.methods.withdrawFrom({
            entity,
            recipient: this.owner,
            token: zeroAddress,
        })
            .send({
                amount: MessageValues.Profile.Proxy.toString(),
                bounce: true,
                from: this.owner,
            })
        const subscriber = new this.rpc.Subscriber()
        await subscriber.trace(tx).filter(i => i.account.equals(entity)).first()
        await subscriber.unsubscribe()
        onWithdraw()
    }

    async withdrawNative(amount: string, onWithdraw: () => void): Promise<void> {
        if (!this.owner || !this._contractWallet) return
        const tx = await this._contractWallet.methods.withdraw({
            amount,
            recipient: this.owner,
            token: zeroAddress,
        })
            .send({
                amount: MessageValues.Profile.Withdraw.toString(),
                bounce: true,
                from: this.owner,
            })
        const subscriber = new this.rpc.Subscriber()
        await subscriber.trace(tx).filter(i => i.account.equals(this.address)).first()
        await subscriber.unsubscribe()
        onWithdraw()
    }

    async createRoom(
        server: ChatServer,
        meta: ChatRoomMeta,
        anyoneCanSendMessage: boolean,
        onCreate: (r?: ChatRoom) => void,
        messagePayment?: PaymentInfo,
    ): Promise<void> {
        if (!this.owner || !this._contractWallet) return
        const tx = await this._contractWallet.methods.createRoom({
            anyCanSendMessage: anyoneCanSendMessage,
            info: {
                highlightMessagePayment: EMPTY_PAYMENT,
                messagePayment: messagePayment || EMPTY_PAYMENT,
                meta: contentEncoder(await chatRoomMetaSchema.validate(meta)),
            },
            owner: this.owner,
            payment: EMPTY_PAYMENT,
            serverID: server.id!,
        }).send({
            amount: MessageValues.Server.CreateRoom.toString(),
            bounce: true,
            from: this.owner,
        })
        const subscriber = new this.rpc.Subscriber()
        const serverTx = await subscriber.trace(tx).filter(i => i.account.equals(server.address)).first()
        if (serverTx) {
            server.contract.decodeTransactionEvents({ transaction: serverTx }).then(events => {
                events.forEach(e => {
                    if (e.event === 'RoomCreated') {
                        server.getRoomById(Number(e.data.roomID)).then(room => {
                            onCreate(room)
                        })
                    }
                })
            })
        }
        await subscriber.unsubscribe()
    }

    async setBan(
        serverID: number,
        roomID: number,
        user: Address,
        isBan: boolean,
        onSaved: () => void,
    ): Promise<any> {
        if (!this._contractWallet || !this.owner) return
        const tx = await this._contractWallet.methods
            .setBan({
                isBan,
                roomID,
                serverID,
                user,
            })
            .send({
                amount: MessageValues.Profile.BanUser.toString(),
                bounce: true,
                from: this.owner,
            })
        const profileAddress = await this.root.expectedProfileAddress(user)
        const subscriber = new this.rpc.Subscriber()
        await subscriber.trace(tx).filter(i => i.account.equals(profileAddress)).first()
        await subscriber.unsubscribe()
        onSaved()
    }

    async setUserPermissions(
        permissions: UserPermissions,
        entity: Address,
        user: Address,
        onSaved: () => void,
    ): Promise<any> {
        if (!this._contractWallet || !this.owner) return
        const tx = await this._contractWallet.methods
            .setPermissions({
                entity,
                permissions: { values: permissions.values },
                user,
            })
            .send({
                amount: MessageValues.Profile.UpdateUserPermissions.toString(),
                bounce: true,
                from: this.owner,
            })
        const subscriber = new this.rpc.Subscriber()
        await subscriber.trace(tx).filter(i => i.account.equals(entity)).first()
        await subscriber.unsubscribe()
        onSaved()
    }

    async setDefaultPermissions(permissions: UserPermissions, entity: Address, onSaved: () => void): Promise<any> {
        if (!this._contractWallet || !this.owner) return
        const tx = await this._contractWallet.methods
            .setDefaultPermissions({
                entity,
                permissions: { values: permissions.values },
            })
            .send({
                amount: MessageValues.Profile.UpdateDefaultPermissions.toString(),
                bounce: true,
                from: this.owner,
            })
        const subscriber = new this.rpc.Subscriber()
        await subscriber.trace(tx).filter(i => i.account.equals(entity)).first()
        await subscriber.unsubscribe()
        onSaved()
    }

    async editServerMeta(meta: ChatServerMeta, server: ChatServer, onSaved: () => void): Promise<any> {
        const serverInfo = server.info()
        if (!this._contractWallet || !this.owner || !serverInfo) return
        const tx = await this._contractWallet.methods
            .changeServerInfo({
                info: {
                    createRoomPayment: serverInfo.createRoomPayment,
                    meta: contentEncoder(await chatServerMetaSchema.validate(meta)),
                },
                serverID: server.id!,
            })
            .send({
                amount: MessageValues.Profile.UpdateServerInfo.toString(),
                bounce: true,
                from: this.owner,
            })
        const subscriber = new this.rpc.Subscriber()
        await subscriber.trace(tx).filter(i => i.account.equals(server.address)).first()
        await subscriber.unsubscribe()
        onSaved()
    }

    async editRoomMeta(meta: ChatRoomMeta, room: ChatRoom, onSaved: () => void): Promise<any> {
        const roomInfo = room.info()
        if (!roomInfo) return
        const newInfo = {
            highlightMessagePayment: roomInfo.highlightMessagePayment,
            messagePayment: roomInfo.messagePayment,
            meta,
        }
        await this.editRoomInfo(newInfo, room, onSaved)
    }

    async editRoomInfo(info: ChatRoomData, room: ChatRoom, onSaved: () => void): Promise<any> {
        if (!this._contractWallet || !this.owner) return
        const tx = await this._contractWallet.methods
            .changeRoomInfo({
                info: {
                    ...info,
                    meta: contentEncoder(await chatServerMetaSchema.validate(info.meta)),
                },
                roomID: room.baseData!.roomId,
                serverID: room.baseData!.serverId,
            })
            .send({
                amount: MessageValues.Profile.UpdateRoomInfo.toString(),
                bounce: true,
                from: this.owner,
            })
        const subscriber = new this.rpc.Subscriber()
        await subscriber.trace(tx).filter(i => i.account.equals(room.address)).first()
        await subscriber.unsubscribe()
        onSaved()
    }

    async editMeta(meta: ChatProfileMeta, onSaved: () => void): Promise<any> {
        if (!this._contractWallet || !this.owner) return
        const tx = await this._contractWallet.methods
            .updateMeta({ meta: contentEncoder(await chatProfileMetaSchema.validate(meta)) })
            .send({
                amount: MessageValues.Profile.UpdateMeta.toString(),
                bounce: true,
                from: this.owner,
            })
        const subscriber = new this.rpc.Subscriber()
        await subscriber.trace(tx).filter(i => i.account.equals(this.address)).first()
        await subscriber.unsubscribe()
        onSaved()
    }

    async update(): Promise<any> {
        await this.getState(true)
        return this.parseData()
    }

    async parseData(): Promise<void> {
        const state = await this.getState()
        if (!state) return
        this.balance = state.balance
        this.isDeployed = state.isDeployed
        const { fields } = await this.contract.getFields({ cachedState: state })
        if (!fields) return
        this.owner = fields._owner
        fields._balances.forEach(value => {
            this.balances.set(value[0].toString(), value[1])
        })
        this.balances.set(zeroAddress.toString(), this.balance)
        fields._servers.forEach(value => {
            this.jointServers.set(Number(value[0]), value[1])
        })
        fields._permissions.forEach(value => {
            this.permissions.set(value[0].toString(), new UserPermissions(value[1].values))
        })
        this.meta = await chatProfileMetaSchema.validate(contentDecoder(fields._meta))
    }

}
