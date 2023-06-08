"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
const types_1 = require("../types");
const abi_1 = require("../abi");
const base_1 = require("./base");
class Root extends base_1.Base {
    constructor(rpc, abi, address) {
        super(rpc, abi, address);
        this.rpc = rpc;
        this.abi = abi;
        this.address = address;
        this._profileCache = new Map();
        this._serverCache = new Map();
        this._contractWallet = undefined;
    }
    get stateTtl() {
        return -1;
    }
    connectUserWallet(rpc) {
        this._contractWallet = new rpc.Contract(this.abi, this.address);
    }
    get contractWallet() {
        return this._contractWallet;
    }
    async getServer(serverId) {
        const saved = this._serverCache.get(serverId);
        if (saved)
            return saved;
        const instance = new this.impl.Server(this.rpc, await this.expectedServerAddress(serverId), this);
        await instance.init();
        this._serverCache.set(serverId, instance);
        return instance;
    }
    async getProfile(owner) {
        const profileAddress = await this.expectedProfileAddress(owner);
        const saved = this._profileCache.get(profileAddress.toString());
        if (saved)
            return saved;
        const instance = new this.impl.Profile(this.rpc, profileAddress, this);
        this._profileCache.set(profileAddress.toString(), instance);
        await instance.init();
        return instance;
    }
    async getProfileFromAddress(address) {
        const saved = this._profileCache.get(address.toString());
        if (saved)
            return saved;
        const instance = new this.impl.Profile(this.rpc, address, this);
        this._profileCache.set(address.toString(), instance);
        await instance.init();
        return instance;
    }
    // eslint-disable-next-line class-methods-use-this
    parseData() {
        return Promise.resolve(undefined);
    }
    async expectedPlatformAddr(root, deployer, platformType, initialData) {
        return this.rpc.getExpectedAddress(abi_1.PlatformAbi, {
            initParams: {
                _deployer: deployer,
                _initialData: initialData,
                _platformType: platformType,
                _root: root,
            },
            tvc: abi_1.PlatformTvc,
        });
    }
    async expectedProfileAddress(owner) {
        const { boc: initData } = await this.rpc.packIntoCell({
            data: { owner },
            structure: [
                { name: 'owner', type: 'address' },
            ],
        });
        return this.expectedPlatformAddr(this.address, this.address, types_1.PlatformType.PROFILE, initData);
    }
    async expectedServerAddress(serverID) {
        const { boc: initData } = await this.rpc.packIntoCell({
            data: { serverID },
            structure: [
                { name: 'serverID', type: 'uint64' },
            ],
        });
        return this.expectedPlatformAddr(this.address, this.address, types_1.PlatformType.SERVER, initData);
    }
}
exports.Root = Root;
