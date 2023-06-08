"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const base_1 = require("./base");
const permissions_1 = require("../permissions");
class Room extends base_1.Base {
    constructor(rpc, abi, address, root) {
        super(rpc, abi, address);
        this.rpc = rpc;
        this.abi = abi;
        this.address = address;
        this.root = root;
        this.defaultPermissions = new permissions_1.UserPermissions();
    }
}
exports.Room = Room;
