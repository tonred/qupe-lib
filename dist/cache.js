"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountStore = exports.AccountsStore = void 0;
const utils_1 = require("./utils");
class AccountsStore {
    constructor(rpc) {
        this.rpc = rpc;
        this.cache = new Map();
    }
    async getAccountState(address, ttl = 0) {
        if (ttl > 0) {
            const [time, state] = await this.getStoredOrDownload(address);
            if (time + ttl * 1000 >= (0, utils_1.now)()) {
                return state;
            }
            return this.downloadState(address);
        }
        if (ttl === 0) {
            return this.downloadState(address);
        }
        return (await this.getStoredOrDownload(address))[1];
    }
    async downloadState(address) {
        const { state } = await this.rpc.getFullContractState({ address });
        console.log(`Loaded new state: ${address.toString()}`);
        this.cache.set(address, [(0, utils_1.now)(), state]);
        return state;
    }
    async getStoredOrDownload(address) {
        const stored = this.cache.get(address);
        if (stored) {
            console.log(`Cache hit: ${address.toString()}`);
            return stored;
        }
        const state = await this.downloadState(address);
        return [(0, utils_1.now)(), state];
    }
    setAccountState(address, state) {
        this.cache.set(address, [(0, utils_1.now)(), state]);
    }
    purgeAll() {
        this.cache = new Map();
    }
    purge(address) {
        this.cache.delete(address);
    }
    purgeOld(ttl) {
        this.cache.forEach((value, key, map) => {
            if (value[0] + ttl * 1000 < (0, utils_1.now)()) {
                map.delete(key);
            }
        });
    }
}
exports.AccountsStore = AccountsStore;
let _accountStore;
const accountStore = (rpc) => {
    if (!_accountStore) {
        _accountStore = new AccountsStore(rpc);
    }
    return _accountStore;
};
exports.accountStore = accountStore;
