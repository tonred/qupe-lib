"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const base_1 = require("./base");
class Profile extends base_1.Base {
    constructor(rpc, abi, address, root) {
        super(rpc, abi, address);
        this.rpc = rpc;
        this.abi = abi;
        this.address = address;
        this.root = root;
        this.permissions = new Map();
        this._contractWallet = undefined;
    }
    connectUserWallet(rpc) {
        this._contractWallet = new rpc.Contract(this.abi, this.address);
    }
}
exports.Profile = Profile;
