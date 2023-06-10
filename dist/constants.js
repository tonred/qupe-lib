"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMPTY_PAYMENT = exports.MessageValues = exports.CHAT_MESSAGE_VERSION = void 0;
const utils_1 = require("./utils");
exports.CHAT_MESSAGE_VERSION = 1;
exports.MessageValues = {
    Profile: {
        BanUser: 1000000000,
        Proxy: 1000000000,
        UpdateDefaultPermissions: 1000000000,
        UpdateMeta: 500000000,
        UpdateRoomInfo: 1000000000,
        UpdateServerInfo: 1000000000,
        UpdateUserPermissions: 1000000000,
        Withdraw: 500000000,
    },
    Root: {
        DeployProfile: 1000000000,
        DeployServer: 2000000000,
    },
    Server: {
        CreateRoom: 2000000000,
        Join: 500000000,
    },
};
exports.EMPTY_PAYMENT = {
    amount: 0,
    token: utils_1.zeroAddress,
};
