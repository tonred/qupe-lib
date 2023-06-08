"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.Room = exports.Profile = exports.Server = exports.Root = exports.Base = void 0;
const cache_1 = require("./cache");
const abi_1 = require("./abi");
const types_1 = require("./types");
const constants_1 = require("./constants");
class Base {
    constructor(rpc, abi, address, contract = new rpc.Contract(abi, address), _accountStore = (0, cache_1.accountStore)(rpc)) {
        this.rpc = rpc;
        this.abi = abi;
        this.address = address;
        this.contract = contract;
        this._accountStore = _accountStore;
        this.isListening = false;
    }
    async init() {
        await this.parseData();
    }
    async getState() {
        if (this.isListening) {
            return this._accountStore.getAccountState(this.address, -1);
        }
        return this._accountStore.getAccountState(this.address, this.stateTtl());
    }
}
exports.Base = Base;
class Root extends Base {
    constructor(rpc, address) {
        super(rpc, abi_1.RootAbi, address);
        this.rpc = rpc;
        this.address = address;
        this._profileCache = new Map();
        this._serverCache = new Map();
    }
    async getServer(server, serverId) {
        if (this._serverCache.has(serverId)) {
            return this._serverCache.get(serverId);
        }
        const instance = new server(this.rpc, await this.expectedServerAddress(serverId), this);
        await instance.init();
        this._serverCache.set(serverId, instance);
        return instance;
    }
    async getProfile(profile, owner) {
        if (this._profileCache.has(owner.toString())) {
            return this._profileCache.get(owner.toString());
        }
        const instance = new profile(this.rpc, await this.expectedProfileAddress(owner), this);
        await instance.init();
        this._profileCache.set(owner.toString(), instance);
        return instance;
    }
    async deployProfile(rpc, from, pubkeys) {
        const contract = new rpc.Contract(abi_1.RootAbi, this.contract.address);
        const tx = await contract.methods.createProfile({ answerId: 0, pubkeys, minTagValue: 0 }).send({
            from,
            amount: constants_1.MessageValues.Root.DeployProfile.toString(),
            bounce: true
        });
        console.log(tx);
    }
    // async getChatRoom(chatServer: ChatServer, roomId: number): Promise<ChatRoom | undefined> {
    //     const room = new ChatRoom(this.rpc, await this.expectedRoomAddress(chatServer.id!, roomId, chatServer.address))
    //     await room.init()
    //     return room
    // }
    // eslint-disable-next-line class-methods-use-this
    parseData() {
        return Promise.resolve(undefined);
    }
    stateTtl() {
        return -1;
    }
    async expectedPlatformAddr(root, deployer, platformType, initialData) {
        return await this.rpc.getExpectedAddress(abi_1.PlatformAbi, {
            tvc: abi_1.PlatformTvc,
            initParams: {
                _root: root,
                _deployer: deployer,
                _platformType: platformType,
                _initialData: initialData,
            },
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
class Server extends Base {
    constructor(rpc, abi, address, root) {
        super(rpc, abi, address);
        this.rpc = rpc;
        this.abi = abi;
        this.address = address;
        this.root = root;
    }
    async expectedRoomAddress(roomID) {
        const { boc: initData } = await this.rpc.packIntoCell({
            data: { serverID: this.baseData.serverId, roomID },
            structure: [
                { name: 'serverID', type: 'uint64' },
                { name: 'roomID', type: 'uint64' },
            ],
        });
        return this.root.expectedPlatformAddr(this.root.address, this.address, types_1.PlatformType.ROOM, initData);
    }
    get id() {
        var _a;
        return (_a = this.baseData) === null || _a === void 0 ? void 0 : _a.serverId;
    }
}
exports.Server = Server;
class Profile extends Base {
    constructor(rpc, abi, address, root) {
        super(rpc, abi, address);
        this.rpc = rpc;
        this.abi = abi;
        this.address = address;
        this.root = root;
        console.log(address.toString());
    }
}
exports.Profile = Profile;
class Room extends Base {
    constructor(rpc, abi, address, root) {
        super(rpc, abi, address);
        this.rpc = rpc;
        this.abi = abi;
        this.address = address;
        this.root = root;
    }
}
exports.Room = Room;
class Message extends Base {
}
exports.Message = Message;
