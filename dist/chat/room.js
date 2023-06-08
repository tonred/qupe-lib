"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoom = void 0;
const room_1 = require("../abstract/room");
const abi_1 = require("../abi");
const utils_1 = require("../utils");
const server_1 = require("./server");
const schema_1 = require("./schema");
const permissions_1 = require("../permissions");
class ChatRoom extends room_1.Room {
    constructor(rpc, address, root) {
        super(rpc, abi_1.ChatAbi.Room, address, root);
        this._profileContract = new this.rpc.Contract(abi_1.ChatAbi.Profile, utils_1.zeroAddress);
        this.storedMessages = new Map();
        this.pendingMessages = new Map();
        this.subscriptions = { onMessage: [] };
    }
    get stateTtl() {
        return 240;
    }
    getServer() {
        return new server_1.ChatServer(this.rpc, utils_1.zeroAddress, this.root);
    }
    addPendingMessage(data) {
        if (this.pendingMessages.size === 0) {
            this.pendingMessages.set(100000000, data);
        }
        else {
            this.pendingMessages.set(Math.max(...[...this.pendingMessages.keys()]) + 1, data);
        }
        this.subscriptions.onMessage.forEach(c => c());
    }
    gcPendingMessages() {
    }
    async getMessages(limit, startFrom) {
        const { transactions, continuation } = await this.rpc.getTransactions({
            address: this.address,
            continuation: startFrom,
            limit,
        });
        await this.processNewTransactions(transactions);
        return { continuation };
    }
    async processNewTransactions(transactions) {
        const acceptedMessages = [];
        for (const tx of transactions) {
            for (const { event, data } of await this.contract.decodeTransactionEvents({
                transaction: tx,
            })) {
                if (event === 'MessageAccepted') {
                    acceptedMessages.push([Number(data.messageID), (0, utils_1.decStringToUint256Hex)(data.messageHash)]);
                }
            }
        }
        console.log(`Found: ${acceptedMessages.length} messages`);
        const p = [];
        acceptedMessages.forEach(value => {
            if (this.storedMessages.has(value[0])) {
                p.push(Promise.resolve({ transaction: undefined }));
            }
            else {
                p.push(this.rpc.rawApi.findTransaction({ inMessageHash: value[1] }));
            }
        });
        const inMsgTxs = await Promise.all(p);
        await Promise.all(acceptedMessages.map(async (value, index) => {
            const { transaction } = inMsgTxs[index];
            if (transaction) {
                const decoded = await this._profileContract.decodeTransaction({
                    methods: ['sendMessage'],
                    transaction,
                });
                if (decoded) {
                    const data = decoded.input;
                    // @ts-ignore
                    data.message = (0, utils_1.contentDecoder)(data.message);
                    this.pendingMessages.forEach((pending, key, map) => {
                        if (pending.hash === value[1]) {
                            map.delete(key);
                        }
                    });
                    const sender = transaction.inMessage.dst;
                    const profile = await this.root.getProfileFromAddress(sender);
                    const userPermissions = profile.permissions.get(this.address.toString());
                    const isHidden = userPermissions ? !userPermissions.canSendMessage : undefined;
                    this.storedMessages.set(value[0], {
                        createdAt: transaction.createdAt,
                        data: data,
                        hash: value[1],
                        isHidden,
                        profile,
                        sender,
                    });
                }
            }
        }));
    }
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sendMessage(data, from, replayTo) {
        // @ts-ignore
        return Promise.resolve(undefined);
    }
    // @ts-ignore
    async subscribe(onMessage) {
        this.subscriptions.onMessage.push(onMessage);
        const s = await this.rpc.subscribe('transactionsFound', { address: this.address });
        s.on('data', data => {
            this.processNewTransactions(data.transactions).then(onMessage);
            // this._accountStore.getAccountState(this.address).then(() => {
            //     onMessage()
            // })
        });
        return s;
    }
    async update() {
        await this.getState(true);
        return this.parseData();
    }
    async parseMeta(bytes) {
        return schema_1.chatRoomMetaSchema.validate((0, utils_1.contentDecoder)(bytes));
    }
    async parseData() {
        const state = await this.getState();
        if (!state)
            return;
        const { fields } = await this.contract.getFields({ cachedState: state });
        if (!fields)
            return;
        const info = fields._info;
        this.roomData = {
            info: {
                highlightMessagePayment: info.highlightMessagePayment,
                messagePayment: info.messagePayment,
                meta: await this.parseMeta(info.meta),
            },
        };
        const { values: permissions } = fields._defaultPermissions;
        this.defaultPermissions = new permissions_1.UserPermissions(permissions);
        this.baseData = {
            balance: fields._balance,
            defaultPermissions: permissions,
            messagesCount: Number(fields._messagesCount),
            roomId: Number(fields._roomID),
            root: fields._root,
            serverId: Number(fields._serverID),
            token: fields._token,
            wallet: fields._wallet,
        };
    }
    info() {
        var _a;
        return (_a = this.roomData) === null || _a === void 0 ? void 0 : _a.info;
    }
}
exports.ChatRoom = ChatRoom;
