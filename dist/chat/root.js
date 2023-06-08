"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoot = void 0;
const abi_1 = require("../abi");
const constants_1 = require("../constants");
const root_1 = require("../abstract/root");
const server_1 = require("./server");
const profile_1 = require("./profile");
const room_1 = require("./room");
const schema_1 = require("./schema");
const utils_1 = require("../utils");
class ChatRoot extends root_1.Root {
    constructor(rpc, address) {
        super(rpc, abi_1.ChatAbi.Root, address);
    }
    async deployServer(owner, meta, onCreate) {
        const tx = await this.contractWallet.methods.createServer({
            answerId: 0x1ea31cf1,
            info: {
                createRoomPayment: {
                    amount: 0,
                    token: utils_1.zeroAddress,
                },
                meta: (0, utils_1.contentEncoder)(await schema_1.chatServerMetaSchema.validate(meta)),
            },
            owner,
        }).send({
            amount: constants_1.MessageValues.Root.DeployServer.toString(),
            bounce: true,
            from: owner,
        });
        const ownerProfile = new this.rpc.Contract(abi_1.ChatAbi.Profile, await this.expectedProfileAddress(owner));
        const subscriber = new this.rpc.Subscriber();
        subscriber.trace(tx).on(i => {
            if (i.account.equals(ownerProfile.address)) {
                ownerProfile.decodeTransactionEvents({ transaction: i })
                    .then(events => {
                    events.forEach(e => {
                        if (e.event === 'Joined') {
                            this.getServer(Number(e.data.serverID)).then(s => {
                                onCreate(s);
                            });
                            subscriber.unsubscribe();
                        }
                    });
                });
            }
        });
        // const callbacks = new this.rpc.Contract(ChatAbi.Callbacks, this.address)
        //
        // for (const msg of tx.outMessages) {
        //     if (msg.dst && msg.dst.equals(this.address)) {
        //         // eslint-disable-next-line no-constant-condition
        //         while (true) {
        //             const { transaction: serverTx } = await this.rpc.rawApi.findTransaction({ inMessageHash: msg.hash })
        //             // eslint-disable-next-line no-promise-executor-return
        //             if (!serverTx) await new Promise(f => setTimeout(f, 3000))
        //             else {
        //                 for (const msgCallback of serverTx.outMessages) {
        //                     if (msgCallback.body) {
        //                         const r = await callbacks.decodeInputMessage({
        //                             body: msgCallback.body,
        //                             internal: true,
        //                             methods: ['ServerCreated'],
        //                         })
        //                         if (r) {
        //                             const server = new this.impl.Server(this.rpc, r.input.address, this)
        //                             await server.init()
        //                             this._serverCache.set(server.id!, server)
        //                             // @ts-ignore
        //                             return server
        //                         }
        //                     }
        //                 }
        //                 return undefined
        //             }
        //         }
        //     }
        // }
        return undefined;
    }
    async deployProfile(from, pubkeys, meta, onDeploy) {
        const tx = await this.contractWallet.methods.createProfile({
            answerId: 0,
            meta: (0, utils_1.contentEncoder)(await schema_1.chatProfileMetaSchema.validate(meta)),
            minTagValue: 0,
            pubkeys,
        }).send({
            amount: constants_1.MessageValues.Root.DeployProfile.toString(),
            bounce: true,
            from,
        });
        const expectedProfileAddress = await this.expectedProfileAddress(from);
        const subscriber = new this.rpc.Subscriber();
        subscriber.trace(tx).on(i => {
            if (i.account.equals(expectedProfileAddress)) {
                subscriber.unsubscribe();
                this.getProfileFromAddress(expectedProfileAddress).then(onDeploy);
            }
        });
    }
    get impl() {
        return { Profile: profile_1.ChatProfile, Room: room_1.ChatRoom, Server: server_1.ChatServer };
    }
}
exports.ChatRoot = ChatRoot;
