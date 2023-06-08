"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const types_1 = require("../types");
const base_1 = require("./base");
const permissions_1 = require("../permissions");
class Server extends base_1.Base {
    constructor(rpc, abi, address, root) {
        super(rpc, abi, address);
        this.rpc = rpc;
        this.abi = abi;
        this.address = address;
        this.root = root;
        this.defaultPermissions = new permissions_1.UserPermissions();
        this._roomsCache = new Map();
    }
    async expectedRoomAddress(roomID) {
        const { boc: initData } = await this.rpc.packIntoCell({
            data: { roomID, serverID: this.baseData.serverId },
            structure: [
                { name: 'serverID', type: 'uint64' },
                { name: 'roomID', type: 'uint64' },
            ],
        });
        return this.root.expectedPlatformAddr(this.root.address, this.address, types_1.PlatformType.ROOM, initData);
    }
    // abstract getRoomById(roomID: number): Promise<Rm>
    get id() {
        var _a;
        return (_a = this.baseData) === null || _a === void 0 ? void 0 : _a.serverId;
    }
}
exports.Server = Server;
