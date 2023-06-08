import { type Address, type ProviderRpcClient } from 'everscale-inpage-provider'

import { type ChatServerMeta, chatServerMetaSchema } from './schema'
import { ChatAbi } from '../abi'
import { contentDecoder } from '../utils'
import { ChatRoom } from './room'
import { Server } from '../abstract/server'
import { type ChatRoot } from './root'
import { type ChatServerData } from './types'
import { type ChatProfile } from './profile'
import { UserPermissions } from '../permissions'


export class ChatServer extends Server<
    ChatRoot,
    ChatProfile,
    ChatRoom,
    any,
    typeof ChatAbi.Server
> {


    protected get stateTtl(): number {
        return 240
    }

    async update(): Promise<any> {
        await this.getState(true)
        await this.parseData()
    }

    chatData?: {
        info: ChatServerData
    }

    constructor(rpc: ProviderRpcClient, address: Address, root: ChatRoot) {
        super(rpc, ChatAbi.Server, address, root)
    }


    async createRoom(): Promise<ChatRoom | null> {
        return Promise.resolve(null)
    }

    info(): ChatServerData | undefined {
        return this.chatData?.info
    }

    async parseMeta(bytes: string): Promise<ChatServerMeta> {
        // todo validate
        return chatServerMetaSchema.validate(contentDecoder(bytes))
    }

    //
    // getRoomById(id: number): Promise<ChatRoom | null> {
    //     console.log(id)
    //     return Promise.resolve(null)
    // }

    async parseData(): Promise<void> {
        const state = await this.getState()
        if (!state) return
        const { fields } = await this.contract.getFields({ cachedState: state })
        if (!fields) return

        const info = fields._info
        this.chatData = {
            info: {
                createRoomPayment: info.createRoomPayment,
                meta: await this.parseMeta(info.meta),
            },
        }
        const { values: permissions } = fields._defaultPermissions
        this.defaultPermissions = new UserPermissions(permissions)
        this.baseData = {
            balance: fields._balance,
            defaultPermissions: permissions,
            roomsCount: Number(fields._roomsCount),
            root: fields._root,
            serverId: Number(fields._serverID),
            token: fields._token,
            wallet: fields._wallet,
        }
    }

    async getRooms(): Promise<ChatRoom[]> {
        if (this.baseData?.roomsCount) {
            return Promise.all([...Array(this.baseData?.roomsCount)].map((_, index) => this.getRoomById(index)))
        }
        return []
    }

    async getRoomById(roomID: number): Promise<ChatRoom> {
        const saved = this._roomsCache.get(roomID)
        if (saved) return saved
        const addr = await this.expectedRoomAddress(roomID)
        const room = new ChatRoom(this.rpc, addr, this.root)
        await room.init()
        this._roomsCache.set(roomID, room)
        return room
    }

}
