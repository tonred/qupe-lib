"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatProfile = void 0;
const profile_1 = require("../abstract/profile");
const abi_1 = require("../abi");
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const constants_2 = require("../abstract/constants");
const schema_1 = require("./schema");
const permissions_1 = require("../permissions");
class ChatProfile extends profile_1.Profile {
    constructor(rpc, address, root) {
        super(rpc, abi_1.ChatAbi.Profile, address, root);
        this.jointServers = new Map();
    }
    async subscribe(onStateChanged) {
        const subscription = await this.rpc.subscribe('contractStateChanged', { address: this.address });
        subscription.on('data', data => {
            this.balance = data.state.balance;
            this.isDeployed = data.state.isDeployed;
            onStateChanged();
        });
        return subscription;
    }
    get stateTtl() {
        return 120;
    }
    async joinServer(server, onJoin) {
        var _a;
        const serverId = typeof server === 'number' ? server : server.id;
        if (!this._contractWallet || serverId === undefined || this.owner === undefined)
            return;
        const tx = await ((_a = this._contractWallet) === null || _a === void 0 ? void 0 : _a.methods.join({ serverID: serverId }).send({
            amount: constants_1.MessageValues.Server.Join.toString(),
            bounce: true,
            from: this.owner,
        }));
        const subscriber = new this.rpc.Subscriber();
        subscriber.trace(tx).on(i => {
            if (i.account.equals(this.address)) {
                this.contract.decodeTransactionEvents({ transaction: i }).then(events => {
                    events.forEach(e => {
                        if (e.event === 'Joined') {
                            subscriber.unsubscribe();
                            onJoin();
                        }
                    });
                });
            }
        });
    }
    async sendMessage(rpc, room, message, publicKey, forwardMessageHash, replyToMessageHash, onSend, highlight = false, payment = constants_2.EMPTY_PAYMENT) {
        if (!room.baseData) {
            return;
        }
        const contract = new rpc.Contract(abi_1.ChatAbi.Profile, this.contract.address);
        const messageData = { c: message };
        const params = {
            forwardMessageHash,
            highlight,
            message: (0, utils_1.contentEncoder)(messageData),
            payment,
            replyToMessageHash,
            roomID: room.baseData.roomId,
            serverID: room.baseData.serverId,
            tags: [],
            version: constants_1.CHAT_MESSAGE_VERSION,
        };
        const delayedMessageExecution = await contract.methods.sendMessage({
            ...params,
            forwardMessageHash: forwardMessageHash || null,
            replyToMessageHash: replyToMessageHash || null,
        }).sendExternalDelayed({
            publicKey,
        });
        room.addPendingMessage({
            createdAt: new Date().getTime() / 1000,
            data: {
                ...params,
                message: messageData,
            },
            hash: delayedMessageExecution.messageHash,
            profile: this,
            sender: this.address,
        });
        if (onSend !== undefined) {
            delayedMessageExecution.transaction.then(tx => {
                const subscriber = new this.rpc.Subscriber();
                subscriber.trace(tx).on(i => {
                    if (i.account.equals(room.address)) {
                        room.contract.decodeTransactionEvents({ transaction: i }).then(events => {
                            events.forEach(e => {
                                if (e.event === 'MessageAccepted') {
                                    subscriber.unsubscribe();
                                    onSend();
                                }
                            });
                        });
                    }
                });
            });
        }
    }
    async getServers() {
        const servers = [];
        for (const entrie of this.jointServers.entries()) {
            if (entrie[1]) {
                servers.push(await this.root.getServer(entrie[0]));
            }
        }
        return servers;
    }
    async createRoom(server, meta, anyoneCanSendMessage, onCreate) {
        if (!this.owner || !this._contractWallet)
            return;
        const tx = await this._contractWallet.methods.createRoom({
            anyCanSendMessage: anyoneCanSendMessage,
            info: {
                highlightMessagePayment: constants_2.EMPTY_PAYMENT,
                messagePayment: constants_2.EMPTY_PAYMENT,
                meta: (0, utils_1.contentEncoder)(await schema_1.chatRoomMetaSchema.validate(meta)),
            },
            owner: this.owner,
            payment: constants_2.EMPTY_PAYMENT,
            serverID: server.id,
        }).send({
            amount: constants_1.MessageValues.Server.CreateRoom.toString(),
            bounce: true,
            from: this.owner,
        });
        const subscriber = new this.rpc.Subscriber();
        subscriber.trace(tx).on(i => {
            if (i.account.equals(server.address)) {
                server.contract.decodeTransactionEvents({ transaction: i }).then(events => {
                    events.forEach(e => {
                        if (e.event === 'RoomCreated') {
                            server.getRoomById(Number(e.data.roomID)).then(room => {
                                onCreate(room);
                            });
                            subscriber.unsubscribe();
                        }
                    });
                });
            }
        });
    }
    async setBan(serverID, roomID, user, isBan, onSaved) {
        if (!this._contractWallet || !this.owner)
            return;
        const tx = await this._contractWallet.methods
            .setBan({
            isBan,
            roomID,
            serverID,
            user,
        })
            .send({
            amount: constants_1.MessageValues.Profile.BanUser.toString(),
            bounce: true,
            from: this.owner,
        });
        const profileAddress = await this.root.expectedProfileAddress(user);
        const subscriber = new this.rpc.Subscriber();
        subscriber.trace(tx).on(i => {
            if (i.account.equals(profileAddress)) {
                subscriber.unsubscribe();
                onSaved();
            }
        });
    }
    async setUserPermissions(permissions, entity, user, onSaved) {
        if (!this._contractWallet || !this.owner)
            return;
        const tx = await this._contractWallet.methods
            .setPermissions({
            entity,
            permissions: { values: permissions.values },
            user,
        })
            .send({
            amount: constants_1.MessageValues.Profile.UpdateUserPermissions.toString(),
            bounce: true,
            from: this.owner,
        });
        const subscriber = new this.rpc.Subscriber();
        subscriber.trace(tx).on(i => {
            if (i.account.equals(entity)) {
                subscriber.unsubscribe();
                onSaved();
            }
        });
    }
    async setDefaultPermissions(permissions, entity, onSaved) {
        if (!this._contractWallet || !this.owner)
            return;
        const tx = await this._contractWallet.methods
            .setDefaultPermissions({
            entity,
            permissions: { values: permissions.values },
        })
            .send({
            amount: constants_1.MessageValues.Profile.UpdateDefaultPermissions.toString(),
            bounce: true,
            from: this.owner,
        });
        const subscriber = new this.rpc.Subscriber();
        subscriber.trace(tx).on(i => {
            if (i.account.equals(entity)) {
                subscriber.unsubscribe();
                onSaved();
            }
        });
    }
    async editServerMeta(meta, server, onSaved) {
        const serverInfo = server.info();
        if (!this._contractWallet || !this.owner || !serverInfo)
            return;
        const tx = await this._contractWallet.methods
            .changeServerInfo({
            info: {
                createRoomPayment: serverInfo.createRoomPayment,
                meta: (0, utils_1.contentEncoder)(await schema_1.chatServerMetaSchema.validate(meta)),
            },
            serverID: server.id,
        })
            .send({
            amount: constants_1.MessageValues.Profile.UpdateServerInfo.toString(),
            bounce: true,
            from: this.owner,
        });
        const subscriber = new this.rpc.Subscriber();
        subscriber.trace(tx).on(i => {
            if (i.account.equals(server.address)) {
                subscriber.unsubscribe();
                onSaved();
            }
        });
    }
    async editRoomMeta(meta, room, onSaved) {
        const roomInfo = room.info();
        if (!this._contractWallet || !this.owner || !roomInfo)
            return;
        const tx = await this._contractWallet.methods
            .changeRoomInfo({
            info: {
                highlightMessagePayment: roomInfo.highlightMessagePayment,
                messagePayment: roomInfo.messagePayment,
                meta: (0, utils_1.contentEncoder)(await schema_1.chatServerMetaSchema.validate(meta)),
            },
            roomID: room.baseData.roomId,
            serverID: room.baseData.serverId,
        })
            .send({
            amount: constants_1.MessageValues.Profile.UpdateRoomInfo.toString(),
            bounce: true,
            from: this.owner,
        });
        const subscriber = new this.rpc.Subscriber();
        subscriber.trace(tx).on(i => {
            if (i.account.equals(room.address)) {
                subscriber.unsubscribe();
                onSaved();
            }
        });
    }
    async editMeta(meta, onSaved) {
        if (!this._contractWallet || !this.owner)
            return;
        const tx = await this._contractWallet.methods
            .updateMeta({ meta: (0, utils_1.contentEncoder)(await schema_1.chatProfileMetaSchema.validate(meta)) })
            .send({
            amount: constants_1.MessageValues.Profile.UpdateMeta.toString(),
            bounce: true,
            from: this.owner,
        });
        const subscriber = new this.rpc.Subscriber();
        subscriber.trace(tx).on(i => {
            if (i.account.equals(this.address)) {
                subscriber.unsubscribe();
                onSaved();
            }
        });
    }
    async update() {
        await this.getState(true);
        return this.parseData();
    }
    async parseData() {
        const state = await this.getState();
        if (!state)
            return;
        this.balance = state.balance;
        this.isDeployed = state.isDeployed;
        const { fields } = await this.contract.getFields({ cachedState: state });
        if (!fields)
            return;
        this.owner = fields._owner;
        fields._servers.forEach(value => {
            this.jointServers.set(Number(value[0]), value[1]);
        });
        fields._permissions.forEach(value => {
            this.permissions.set(value[0].toString(), new permissions_1.UserPermissions(value[1].values));
        });
        this.meta = await schema_1.chatProfileMetaSchema.validate((0, utils_1.contentDecoder)(fields._meta));
    }
}
exports.ChatProfile = ChatProfile;
