"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatServer = void 0;
const schema_1 = require("./schema");
const abi_1 = require("../abi");
const utils_1 = require("../utils");
const room_1 = require("./room");
const server_1 = require("../abstract/server");
const permissions_1 = require("../permissions");
class ChatServer extends server_1.Server {
    get stateTtl() {
        return 240;
    }
    async update() {
        await this.getState(true);
        await this.parseData();
    }
    constructor(rpc, address, root) {
        super(rpc, abi_1.ChatAbi.Server, address, root);
    }
    async createRoom() {
        return Promise.resolve(null);
    }
    info() {
        var _a;
        return (_a = this.chatData) === null || _a === void 0 ? void 0 : _a.info;
    }
    async parseMeta(bytes) {
        // todo validate
        return schema_1.chatServerMetaSchema.validate((0, utils_1.contentDecoder)(bytes));
    }
    //
    // getRoomById(id: number): Promise<ChatRoom | null> {
    //     console.log(id)
    //     return Promise.resolve(null)
    // }
    async parseData() {
        const state = await this.getState();
        if (!state)
            return;
        const { fields } = await this.contract.getFields({ cachedState: state });
        if (!fields)
            return;
        const info = fields._info;
        this.chatData = {
            info: {
                createRoomPayment: info.createRoomPayment,
                meta: await this.parseMeta(info.meta),
            },
        };
        const { values: permissions } = fields._defaultPermissions;
        this.defaultPermissions = new permissions_1.UserPermissions(permissions);
        this.baseData = {
            balance: fields._balance,
            defaultPermissions: permissions,
            roomsCount: Number(fields._roomsCount),
            root: fields._root,
            serverId: Number(fields._serverID),
            token: fields._token,
            wallet: fields._wallet,
        };
    }
    async getRooms() {
        var _a, _b;
        if ((_a = this.baseData) === null || _a === void 0 ? void 0 : _a.roomsCount) {
            return Promise.all([...Array((_b = this.baseData) === null || _b === void 0 ? void 0 : _b.roomsCount)].map((_, index) => this.getRoomById(index)));
        }
        return [];
    }
    async getRoomById(roomID) {
        const saved = this._roomsCache.get(roomID);
        if (saved)
            return saved;
        const addr = await this.expectedRoomAddress(roomID);
        const room = new room_1.ChatRoom(this.rpc, addr, this.root);
        await room.init();
        this._roomsCache.set(roomID, room);
        return room;
    }
}
exports.ChatServer = ChatServer;
