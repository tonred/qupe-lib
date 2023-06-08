"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
const cache_1 = require("../cache");
class Base {
    constructor(rpc, abi, address, contract = new rpc.Contract(abi, address), _accountStore = (0, cache_1.accountStore)(rpc)) {
        this.rpc = rpc;
        this.abi = abi;
        this.address = address;
        this.contract = contract;
        this._accountStore = _accountStore;
        this.balance = '0';
        this.isDeployed = false;
        this.isListening = false;
    }
    async init() {
        const state = await this.getState();
        if (!state)
            return;
        this.balance = state.balance;
        this.isDeployed = state.isDeployed;
        await this.parseData();
    }
    async getState(force = false) {
        if (force) {
            return this._accountStore.getAccountState(this.address, 0);
        }
        if (this.isListening) {
            return this._accountStore.getAccountState(this.address, -1);
        }
        return this._accountStore.getAccountState(this.address, this.stateTtl);
    }
}
exports.Base = Base;
