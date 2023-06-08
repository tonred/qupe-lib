"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatAbi = exports.PlatformAbi = exports.PlatformTvc = void 0;
/* eslint-disable sort-keys */
exports.PlatformTvc = 'te6ccgECEQEAAgkAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgBCSK7VMg4wMgwP/jAiDA/uMC8gsNBQQKA5btRNDXScMB+GaJ+Gkh2zzTAAGOFIMI1xgg+CjIzs7J+QBY+EL5EPKo3tM/AfhDIbnytCD4I4ED6KiCCBt3QKC58rT4Y9MfAds88jwLCAYDUu1E0NdJwwH4ZiLQ0wP6QDD4aak4ANwhxwDjAiHXDR/yvCHjAwHbPPI8DAwGARQgghBKLk/WuuMCBwKIMPhCbuMA+Ebyc9TU0fhJ+EvHBfLj6CH7BAHQIIs4rbNYxwWT103Q3tdM0O0e7VP4Svgq+E1VAoIQZuJPbO1D2Ns88gAIEASk7UTQ10nCAY/HcO1E0PQFcSGAQPQOjoGJ33IigED0Do6Bid9zI4BA9A5vkZPXCwfedCSAQPQPjoGI3/ht+Gz4a/hqgED0DvK91wv/+GJw+GPjDQsLCgkAQu1E0NP/0z/TADH6QNTR0PpA0wfU0fht+Gz4a/hq+GP4YgAAAEOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAr4RvLgTAIQ9KQg9L3ywE4PDgAUc29sIDAuNjYuMAEaoGbiT2xfBNs8+A/yABAAPvhN+Ez4S/hK+EP4QsjL/8s/z4POVSDIzssHzM3J7VQ=';
exports.PlatformAbi = {
    'ABI version': 2,
    version: '2.3',
    header: ['time'],
    functions: [
        {
            name: 'constructor',
            id: '0x4A2E4FD6',
            inputs: [
                { name: 'code', type: 'cell' },
                { name: 'params', type: 'cell' },
            ],
            outputs: [],
        },
    ],
    data: [
        { key: 1, name: '_root', type: 'address' },
        { key: 2, name: '_deployer', type: 'address' },
        { key: 3, name: '_platformType', type: 'uint8' },
        { key: 4, name: '_initialData', type: 'cell' },
    ],
    events: [],
    fields: [
        { name: '_pubkey', type: 'uint256' },
        { name: '_timestamp', type: 'uint64' },
        { name: '_constructorFlag', type: 'bool' },
        { name: '_root', type: 'address' },
        { name: '_deployer', type: 'address' },
        { name: '_platformType', type: 'uint8' },
        { name: '_initialData', type: 'cell' },
    ],
};
exports.ChatAbi = {
    Callbacks: {
        'ABI version': 2,
        version: '2.3',
        header: [],
        functions: [
            {
                name: 'ServerCreated',
                inputs: [
                    { name: 'address', type: 'address' },
                ],
                outputs: [],
            },
        ],
        data: [],
        events: [],
        fields: [],
    },
    Profile: {
        'ABI version': 2,
        version: '2.3',
        header: ['pubkey', 'time', 'expire'],
        functions: [
            {
                name: 'createRoom',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                    { name: 'owner', type: 'address' },
                    { name: 'anyCanSendMessage', type: 'bool' },
                    { components: [{ name: 'meta', type: 'bytes' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'messagePayment', type: 'tuple' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'highlightMessagePayment', type: 'tuple' }], name: 'info', type: 'tuple' },
                    { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'payment', type: 'tuple' },
                ],
                outputs: [],
            },
            {
                name: 'sendMessage',
                inputs: [
                    { name: 'version', type: 'uint8' },
                    { name: 'serverID', type: 'uint64' },
                    { name: 'roomID', type: 'uint64' },
                    { name: 'message', type: 'bytes' },
                    { components: [{ name: 'user', type: 'address' }, { name: 'value', type: 'uint128' }], name: 'tags', type: 'tuple[]' },
                    { name: 'replyToMessageHash', type: 'optional(uint256)' },
                    { name: 'forwardMessageHash', type: 'optional(uint256)' },
                    { name: 'highlight', type: 'bool' },
                    { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'payment', type: 'tuple' },
                ],
                outputs: [],
            },
            {
                name: 'changeServerInfo',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                    { components: [{ name: 'meta', type: 'bytes' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'createRoomPayment', type: 'tuple' }], name: 'info', type: 'tuple' },
                ],
                outputs: [],
            },
            {
                name: 'changeRoomInfo',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                    { name: 'roomID', type: 'uint64' },
                    { components: [{ name: 'meta', type: 'bytes' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'messagePayment', type: 'tuple' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'highlightMessagePayment', type: 'tuple' }], name: 'info', type: 'tuple' },
                ],
                outputs: [],
            },
            {
                name: 'getServers',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                ],
                outputs: [
                    { name: 'serverIDs', type: 'uint64[]' },
                ],
            },
            {
                name: 'getPermissions',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                    { name: 'entity', type: 'address' },
                ],
                outputs: [
                    { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'tuple' },
                ],
            },
            {
                name: 'updateMeta',
                inputs: [
                    { name: 'meta', type: 'bytes' },
                ],
                outputs: [],
            },
            {
                name: 'join',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                ],
                outputs: [],
            },
            {
                name: 'withdrawFrom',
                inputs: [
                    { name: 'entity', type: 'address' },
                    { name: 'token', type: 'address' },
                    { name: 'recipient', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'setPermissions',
                inputs: [
                    { name: 'entity', type: 'address' },
                    { name: 'user', type: 'address' },
                    { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' },
                ],
                outputs: [],
            },
            {
                name: 'setDefaultPermissions',
                inputs: [
                    { name: 'entity', type: 'address' },
                    { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'tuple' },
                ],
                outputs: [],
            },
            {
                name: 'forceChangeRoomPermissions',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                    { name: 'roomID', type: 'uint64' },
                    { name: 'usersList', type: 'address[]' },
                    { components: [{ name: 'values', type: 'bool[]' }], name: 'permissionsList', type: 'optional(tuple)[]' },
                    { components: [{ name: 'values', type: 'bool[]' }], name: 'defaultPermissions', type: 'tuple' },
                ],
                outputs: [],
            },
            {
                name: 'setBan',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                    { name: 'roomID', type: 'uint64' },
                    { name: 'user', type: 'address' },
                    { name: 'isBan', type: 'bool' },
                ],
                outputs: [],
            },
            {
                name: 'createWallet',
                inputs: [
                    { name: 'token', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'syncWallet',
                inputs: [
                    { name: 'token', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'deposit',
                inputs: [],
                outputs: [],
            },
            {
                name: 'withdraw',
                inputs: [
                    { name: 'token', type: 'address' },
                    { name: 'amount', type: 'uint128' },
                    { name: 'recipient', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'setMinTagValue',
                inputs: [
                    { name: 'minTagValue', type: 'uint128' },
                ],
                outputs: [],
            },
            {
                name: 'setPubkeys',
                inputs: [
                    { name: 'pubkeys', type: 'uint256[]' },
                ],
                outputs: [],
            },
            {
                name: 'onServerCreated',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                    { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' },
                ],
                outputs: [],
            },
            {
                name: 'onRoomCreated',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                    { name: 'roomID', type: 'uint64' },
                    { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' },
                ],
                outputs: [],
            },
            {
                name: 'onJoined',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                ],
                outputs: [],
            },
            {
                name: 'setServerPermissions',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                    { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' },
                    { name: 'callbackTo', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'setRoomPermissions',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                    { name: 'roomID', type: 'uint64' },
                    { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' },
                    { name: 'callbackTo', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'onSetBan',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                    { name: 'roomID', type: 'uint64' },
                    { name: 'isBan', type: 'bool' },
                    { name: 'callbackTo', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'onTagged',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                    { name: 'roomID', type: 'uint64' },
                    { name: 'messageID', type: 'uint64' },
                    { name: 'user', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'onMessageAccepted',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                    { name: 'roomID', type: 'uint64' },
                    { name: 'messageID', type: 'uint64' },
                    { name: 'messageHash', type: 'uint256' },
                    { name: 'deployed', type: 'bool' },
                ],
                outputs: [],
            },
            {
                name: 'onWalletDeployed',
                inputs: [
                    { name: 'wallet', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'getTokens',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                ],
                outputs: [
                    { name: 'tokens', type: 'address[]' },
                ],
            },
            {
                name: 'getWallet',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                    { name: 'token', type: 'address' },
                ],
                outputs: [
                    { name: 'wallet', type: 'address' },
                ],
            },
            {
                name: 'getBalance',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                    { name: 'token', type: 'address' },
                ],
                outputs: [
                    { name: 'balance', type: 'uint128' },
                ],
            },
            {
                name: 'onAcceptTokensTransfer',
                inputs: [
                    { name: 'token', type: 'address' },
                    { name: 'amount', type: 'uint128' },
                    { name: 'sender', type: 'address' },
                    { name: 'value3', type: 'address' },
                    { name: 'value4', type: 'address' },
                    { name: 'payload', type: 'cell' },
                ],
                outputs: [],
            },
            {
                name: 'onSync',
                inputs: [
                    { name: 'balance', type: 'uint128' },
                ],
                outputs: [],
            },
            {
                name: 'constructor',
                inputs: [],
                outputs: [],
            },
        ],
        data: [],
        events: [
            {
                name: 'Join',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                ],
                outputs: [],
            },
            {
                name: 'CreateRoom',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                ],
                outputs: [],
            },
            {
                name: 'SendMessage',
                inputs: [
                    { name: 'messageHash', type: 'uint256' },
                    { name: 'serverID', type: 'uint64' },
                    { name: 'roomID', type: 'uint64' },
                ],
                outputs: [],
            },
            {
                name: 'ServerCreated',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                ],
                outputs: [],
            },
            {
                name: 'RoomCreated',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                    { name: 'roomID', type: 'uint64' },
                ],
                outputs: [],
            },
            {
                name: 'Joined',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                ],
                outputs: [],
            },
            {
                name: 'CreateWallet',
                inputs: [
                    { name: 'token', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'SyncWallet',
                inputs: [
                    { name: 'token', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'Deposited',
                inputs: [
                    { name: 'token', type: 'address' },
                    { name: 'amount', type: 'uint128' },
                ],
                outputs: [],
            },
            {
                name: 'Withdrawn',
                inputs: [
                    { name: 'token', type: 'address' },
                    { name: 'amount', type: 'uint128' },
                    { name: 'recipient', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'SetBan',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                    { name: 'roomID', type: 'uint64' },
                    { name: 'isBan', type: 'bool' },
                ],
                outputs: [],
            },
            {
                name: 'PermissionChanged',
                inputs: [
                    { name: 'entity', type: 'address' },
                    { name: 'removed', type: 'bool' },
                ],
                outputs: [],
            },
            {
                name: 'Tagged',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                    { name: 'roomID', type: 'uint64' },
                    { name: 'messageID', type: 'uint64' },
                    { name: 'user', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'MessageAccepted',
                inputs: [
                    { name: 'messageHash', type: 'uint256' },
                    { name: 'serverID', type: 'uint64' },
                    { name: 'roomID', type: 'uint64' },
                    { name: 'messageID', type: 'uint64' },
                    { name: 'deployed', type: 'bool' },
                ],
                outputs: [],
            },
            {
                name: 'ChangeServerInfo',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                ],
                outputs: [],
            },
            {
                name: 'ChangeRoomInfo',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                    { name: 'roomID', type: 'uint64' },
                ],
                outputs: [],
            },
            {
                name: 'MultiVaultNewWallet',
                inputs: [
                    { name: 'token', type: 'address' },
                    { name: 'wallet', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'MultiVaultSync',
                inputs: [
                    { name: 'token', type: 'address' },
                    { name: 'balance', type: 'uint128' },
                ],
                outputs: [],
            },
        ],
        fields: [
            { name: '_pubkey', type: 'uint256' },
            { name: '_constructorFlag', type: 'bool' },
            { name: '_pendingWallets', type: 'map(address,bool)' },
            { name: '_wallets', type: 'map(address,address)' },
            { name: '_balances', type: 'map(address,uint128)' },
            { name: '_pendingSyncs', type: 'map(address,address)' },
            { name: '_root', type: 'address' },
            { name: '_platformCode', type: 'cell' },
            { name: '_owner', type: 'address' },
            { name: '_meta', type: 'bytes' },
            { name: '_sendMessageValue', type: 'uint128' },
            { name: '_minTagValue', type: 'uint128' },
            { name: '_pubkeys', type: 'map(uint256,bool)' },
            { name: '_servers', type: 'map(uint64,bool)' },
            { name: '_userDatas', type: 'map(address,cell)' },
            { components: [{ name: 'values', type: 'bool[]' }], name: '_permissions', type: 'map(address,tuple)' },
            { name: '_currentMessageHash', type: 'uint256' },
            { name: '_timestamp', type: 'uint64' },
        ],
    },
    Room: {
        'ABI version': 2,
        version: '2.3',
        header: ['time'],
        functions: [
            {
                name: 'changeInfo',
                inputs: [
                    { components: [{ name: 'user', type: 'address' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'payment', type: 'tuple' }, { name: 'userData', type: 'optional(cell)' }, { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' }], name: 'data', type: 'tuple' },
                    { components: [{ name: 'meta', type: 'bytes' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'messagePayment', type: 'tuple' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'highlightMessagePayment', type: 'tuple' }], name: 'info', type: 'tuple' },
                ],
                outputs: [],
            },
            {
                name: 'acceptMessage',
                inputs: [
                    { components: [{ name: 'user', type: 'address' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'payment', type: 'tuple' }, { name: 'userData', type: 'optional(cell)' }, { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' }], name: 'data', type: 'tuple' },
                    { name: 'messageHash', type: 'uint256' },
                    { components: [{ name: 'user', type: 'address' }, { name: 'value', type: 'uint128' }], name: 'tags', type: 'tuple[]' },
                    { name: 'properties', type: 'cell' },
                ],
                outputs: [],
            },
            {
                name: 'forceChangePermissions',
                inputs: [
                    { name: 'serverID', type: 'uint64' },
                    { name: 'usersList', type: 'address[]' },
                    { components: [{ name: 'values', type: 'bool[]' }], name: 'permissionsList', type: 'optional(tuple)[]' },
                    { components: [{ name: 'values', type: 'bool[]' }], name: 'defaultPermissions', type: 'tuple' },
                    { name: 'callbackTo', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'setBan',
                inputs: [
                    { components: [{ name: 'user', type: 'address' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'payment', type: 'tuple' }, { name: 'userData', type: 'optional(cell)' }, { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' }], name: 'data', type: 'tuple' },
                    { name: 'user', type: 'address' },
                    { name: 'isBan', type: 'bool' },
                ],
                outputs: [],
            },
            {
                name: 'withdraw',
                inputs: [
                    { components: [{ name: 'user', type: 'address' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'payment', type: 'tuple' }, { name: 'userData', type: 'optional(cell)' }, { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' }], name: 'data', type: 'tuple' },
                    { name: 'token', type: 'address' },
                    { name: 'recipient', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'setPermissions',
                inputs: [
                    { components: [{ name: 'user', type: 'address' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'payment', type: 'tuple' }, { name: 'userData', type: 'optional(cell)' }, { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' }], name: 'data', type: 'tuple' },
                    { name: 'user', type: 'address' },
                    { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' },
                ],
                outputs: [],
            },
            {
                name: 'setDefaultPermissions',
                inputs: [
                    { components: [{ name: 'user', type: 'address' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'payment', type: 'tuple' }, { name: 'userData', type: 'optional(cell)' }, { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' }], name: 'data', type: 'tuple' },
                    { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'tuple' },
                ],
                outputs: [],
            },
            {
                name: 'onWalletDeployed',
                inputs: [
                    { name: 'wallet', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'getToken',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                ],
                outputs: [
                    { name: 'token', type: 'address' },
                ],
            },
            {
                name: 'getWallet',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                ],
                outputs: [
                    { name: 'wallet', type: 'address' },
                ],
            },
            {
                name: 'getBalance',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                ],
                outputs: [
                    { name: 'balance', type: 'uint128' },
                ],
            },
            {
                name: 'onAcceptTokensTransfer',
                inputs: [
                    { name: 'value0', type: 'address' },
                    { name: 'amount', type: 'uint128' },
                    { name: 'sender', type: 'address' },
                    { name: 'value3', type: 'address' },
                    { name: 'value4', type: 'address' },
                    { name: 'payload', type: 'cell' },
                ],
                outputs: [],
            },
            {
                name: 'onSync',
                inputs: [
                    { name: 'balance', type: 'uint128' },
                ],
                outputs: [],
            },
            {
                name: 'constructor',
                inputs: [],
                outputs: [],
            },
        ],
        data: [],
        events: [
            {
                name: 'MessageAccepted',
                inputs: [
                    { name: 'messageID', type: 'uint64' },
                    { name: 'messageHash', type: 'uint256' },
                ],
                outputs: [],
            },
            {
                name: 'SetBan',
                inputs: [
                    { name: 'user', type: 'address' },
                    { name: 'isBan', type: 'bool' },
                ],
                outputs: [],
            },
            {
                name: 'VaultSync',
                inputs: [
                    { name: 'balance', type: 'uint128' },
                ],
                outputs: [],
            },
        ],
        fields: [
            { name: '_pubkey', type: 'uint256' },
            { name: '_timestamp', type: 'uint64' },
            { name: '_constructorFlag', type: 'bool' },
            { name: '_token', type: 'address' },
            { name: '_wallet', type: 'address' },
            { name: '_balance', type: 'uint128' },
            { name: '_root', type: 'address' },
            { name: '_platformCode', type: 'cell' },
            { components: [{ name: 'values', type: 'bool[]' }], name: '_defaultPermissions', type: 'tuple' },
            { name: '_serverID', type: 'uint64' },
            { name: '_roomID', type: 'uint64' },
            { name: '_messagesCount', type: 'uint64' },
            { components: [{ name: 'meta', type: 'bytes' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'messagePayment', type: 'tuple' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'highlightMessagePayment', type: 'tuple' }], name: '_info', type: 'tuple' },
        ],
    },
    Server: {
        'ABI version': 2,
        version: '2.3',
        header: ['time'],
        functions: [
            {
                name: 'changeInfo',
                inputs: [
                    { components: [{ name: 'user', type: 'address' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'payment', type: 'tuple' }, { name: 'userData', type: 'optional(cell)' }, { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' }], name: 'data', type: 'tuple' },
                    { components: [{ name: 'meta', type: 'bytes' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'createRoomPayment', type: 'tuple' }], name: 'info', type: 'tuple' },
                ],
                outputs: [],
            },
            {
                name: 'join',
                inputs: [
                    { name: 'value0', type: 'uint64' },
                    { name: 'user', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'createRoom',
                inputs: [
                    { components: [{ name: 'user', type: 'address' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'payment', type: 'tuple' }, { name: 'userData', type: 'optional(cell)' }, { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' }], name: 'data', type: 'tuple' },
                    { name: 'params', type: 'cell' },
                ],
                outputs: [],
            },
            {
                name: 'forceChangeRoomPermissions',
                inputs: [
                    { components: [{ name: 'user', type: 'address' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'payment', type: 'tuple' }, { name: 'userData', type: 'optional(cell)' }, { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' }], name: 'data', type: 'tuple' },
                    { name: 'roomID', type: 'uint64' },
                    { name: 'usersList', type: 'address[]' },
                    { components: [{ name: 'values', type: 'bool[]' }], name: 'permissionsList', type: 'optional(tuple)[]' },
                    { components: [{ name: 'values', type: 'bool[]' }], name: 'defaultPermissions', type: 'tuple' },
                ],
                outputs: [],
            },
            {
                name: 'withdraw',
                inputs: [
                    { components: [{ name: 'user', type: 'address' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'payment', type: 'tuple' }, { name: 'userData', type: 'optional(cell)' }, { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' }], name: 'data', type: 'tuple' },
                    { name: 'token', type: 'address' },
                    { name: 'recipient', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'setPermissions',
                inputs: [
                    { components: [{ name: 'user', type: 'address' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'payment', type: 'tuple' }, { name: 'userData', type: 'optional(cell)' }, { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' }], name: 'data', type: 'tuple' },
                    { name: 'user', type: 'address' },
                    { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' },
                ],
                outputs: [],
            },
            {
                name: 'setDefaultPermissions',
                inputs: [
                    { components: [{ name: 'user', type: 'address' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'payment', type: 'tuple' }, { name: 'userData', type: 'optional(cell)' }, { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'optional(tuple)' }], name: 'data', type: 'tuple' },
                    { components: [{ name: 'values', type: 'bool[]' }], name: 'permissions', type: 'tuple' },
                ],
                outputs: [],
            },
            {
                name: 'onWalletDeployed',
                inputs: [
                    { name: 'wallet', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'getToken',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                ],
                outputs: [
                    { name: 'token', type: 'address' },
                ],
            },
            {
                name: 'getWallet',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                ],
                outputs: [
                    { name: 'wallet', type: 'address' },
                ],
            },
            {
                name: 'getBalance',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                ],
                outputs: [
                    { name: 'balance', type: 'uint128' },
                ],
            },
            {
                name: 'onAcceptTokensTransfer',
                inputs: [
                    { name: 'value0', type: 'address' },
                    { name: 'amount', type: 'uint128' },
                    { name: 'sender', type: 'address' },
                    { name: 'value3', type: 'address' },
                    { name: 'value4', type: 'address' },
                    { name: 'payload', type: 'cell' },
                ],
                outputs: [],
            },
            {
                name: 'onSync',
                inputs: [
                    { name: 'balance', type: 'uint128' },
                ],
                outputs: [],
            },
            {
                name: 'constructor',
                inputs: [],
                outputs: [],
            },
        ],
        data: [],
        events: [
            {
                name: 'Joined',
                inputs: [
                    { name: 'user', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'RoomCreated',
                inputs: [
                    { name: 'roomID', type: 'uint64' },
                    { name: 'room', type: 'address' },
                    { name: 'creator', type: 'address' },
                ],
                outputs: [],
            },
            {
                name: 'VaultSync',
                inputs: [
                    { name: 'balance', type: 'uint128' },
                ],
                outputs: [],
            },
        ],
        fields: [
            { name: '_pubkey', type: 'uint256' },
            { name: '_timestamp', type: 'uint64' },
            { name: '_constructorFlag', type: 'bool' },
            { name: '_token', type: 'address' },
            { name: '_wallet', type: 'address' },
            { name: '_balance', type: 'uint128' },
            { name: '_root', type: 'address' },
            { name: '_platformCode', type: 'cell' },
            { components: [{ name: 'values', type: 'bool[]' }], name: '_defaultPermissions', type: 'tuple' },
            { name: '_serverID', type: 'uint64' },
            { name: '_roomCode', type: 'cell' },
            { name: '_roomsCount', type: 'uint64' },
            { name: '_usersCount', type: 'uint64' },
            { components: [{ name: 'meta', type: 'bytes' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'createRoomPayment', type: 'tuple' }], name: '_info', type: 'tuple' },
        ],
    },
    Root: {
        'ABI version': 2,
        version: '2.3',
        header: ['time'],
        functions: [
            {
                name: 'constructor',
                inputs: [
                    { name: 'serverCode', type: 'cell' },
                    { name: 'roomCode', type: 'cell' },
                    { name: 'profileCode', type: 'cell' },
                    { name: 'platformCode', type: 'cell' },
                    { name: 'sendMessageValue', type: 'uint128' },
                ],
                outputs: [],
            },
            {
                name: 'createServer',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                    { name: 'owner', type: 'address' },
                    { components: [{ name: 'meta', type: 'bytes' }, { components: [{ name: 'token', type: 'address' }, { name: 'amount', type: 'uint128' }], name: 'createRoomPayment', type: 'tuple' }], name: 'info', type: 'tuple' },
                ],
                outputs: [
                    { name: 'value0', type: 'address' },
                ],
            },
            {
                name: 'getServersCount',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                ],
                outputs: [
                    { name: 'count', type: 'uint64' },
                ],
            },
            {
                name: 'createProfile',
                inputs: [
                    { name: 'answerId', type: 'uint32' },
                    { name: 'meta', type: 'bytes' },
                    { name: 'minTagValue', type: 'uint128' },
                    { name: 'pubkeys', type: 'uint256[]' },
                ],
                outputs: [
                    { name: 'profile', type: 'address' },
                ],
            },
            {
                name: '_randomNonce',
                inputs: [],
                outputs: [
                    { name: '_randomNonce', type: 'uint256' },
                ],
            },
        ],
        data: [
            { key: 1, name: '_randomNonce', type: 'uint256' },
        ],
        events: [],
        fields: [
            { name: '_pubkey', type: 'uint256' },
            { name: '_timestamp', type: 'uint64' },
            { name: '_constructorFlag', type: 'bool' },
            { name: '_root', type: 'address' },
            { name: '_platformCode', type: 'cell' },
            { name: '_randomNonce', type: 'uint256' },
            { name: '_serverCode', type: 'cell' },
            { name: '_roomCode', type: 'cell' },
            { name: '_profileCode', type: 'cell' },
            { name: '_sendMessageValue', type: 'uint128' },
            { name: '_serversCount', type: 'uint64' },
        ],
    },
};
