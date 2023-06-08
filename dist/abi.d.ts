export declare const PlatformTvc = "te6ccgECEQEAAgkAAgE0AwEBAcACAEPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgBCSK7VMg4wMgwP/jAiDA/uMC8gsNBQQKA5btRNDXScMB+GaJ+Gkh2zzTAAGOFIMI1xgg+CjIzs7J+QBY+EL5EPKo3tM/AfhDIbnytCD4I4ED6KiCCBt3QKC58rT4Y9MfAds88jwLCAYDUu1E0NdJwwH4ZiLQ0wP6QDD4aak4ANwhxwDjAiHXDR/yvCHjAwHbPPI8DAwGARQgghBKLk/WuuMCBwKIMPhCbuMA+Ebyc9TU0fhJ+EvHBfLj6CH7BAHQIIs4rbNYxwWT103Q3tdM0O0e7VP4Svgq+E1VAoIQZuJPbO1D2Ns88gAIEASk7UTQ10nCAY/HcO1E0PQFcSGAQPQOjoGJ33IigED0Do6Bid9zI4BA9A5vkZPXCwfedCSAQPQPjoGI3/ht+Gz4a/hqgED0DvK91wv/+GJw+GPjDQsLCgkAQu1E0NP/0z/TADH6QNTR0PpA0wfU0fht+Gz4a/hq+GP4YgAAAEOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAr4RvLgTAIQ9KQg9L3ywE4PDgAUc29sIDAuNjYuMAEaoGbiT2xfBNs8+A/yABAAPvhN+Ez4S/hK+EP4QsjL/8s/z4POVSDIzssHzM3J7VQ=";
export declare const PlatformAbi: {
    readonly 'ABI version': 2;
    readonly version: "2.3";
    readonly header: readonly ["time"];
    readonly functions: readonly [{
        readonly name: "constructor";
        readonly id: "0x4A2E4FD6";
        readonly inputs: readonly [{
            readonly name: "code";
            readonly type: "cell";
        }, {
            readonly name: "params";
            readonly type: "cell";
        }];
        readonly outputs: readonly [];
    }];
    readonly data: readonly [{
        readonly key: 1;
        readonly name: "_root";
        readonly type: "address";
    }, {
        readonly key: 2;
        readonly name: "_deployer";
        readonly type: "address";
    }, {
        readonly key: 3;
        readonly name: "_platformType";
        readonly type: "uint8";
    }, {
        readonly key: 4;
        readonly name: "_initialData";
        readonly type: "cell";
    }];
    readonly events: readonly [];
    readonly fields: readonly [{
        readonly name: "_pubkey";
        readonly type: "uint256";
    }, {
        readonly name: "_timestamp";
        readonly type: "uint64";
    }, {
        readonly name: "_constructorFlag";
        readonly type: "bool";
    }, {
        readonly name: "_root";
        readonly type: "address";
    }, {
        readonly name: "_deployer";
        readonly type: "address";
    }, {
        readonly name: "_platformType";
        readonly type: "uint8";
    }, {
        readonly name: "_initialData";
        readonly type: "cell";
    }];
};
export declare const ChatAbi: {
    Callbacks: {
        readonly 'ABI version': 2;
        readonly version: "2.3";
        readonly header: readonly [];
        readonly functions: readonly [{
            readonly name: "ServerCreated";
            readonly inputs: readonly [{
                readonly name: "address";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }];
        readonly data: readonly [];
        readonly events: readonly [];
        readonly fields: readonly [];
    };
    Profile: {
        readonly 'ABI version': 2;
        readonly version: "2.3";
        readonly header: readonly ["pubkey", "time", "expire"];
        readonly functions: readonly [{
            readonly name: "createRoom";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly name: "owner";
                readonly type: "address";
            }, {
                readonly name: "anyCanSendMessage";
                readonly type: "bool";
            }, {
                readonly components: readonly [{
                    readonly name: "meta";
                    readonly type: "bytes";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "messagePayment";
                    readonly type: "tuple";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "highlightMessagePayment";
                    readonly type: "tuple";
                }];
                readonly name: "info";
                readonly type: "tuple";
            }, {
                readonly components: readonly [{
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly name: "amount";
                    readonly type: "uint128";
                }];
                readonly name: "payment";
                readonly type: "tuple";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "sendMessage";
            readonly inputs: readonly [{
                readonly name: "version";
                readonly type: "uint8";
            }, {
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly name: "roomID";
                readonly type: "uint64";
            }, {
                readonly name: "message";
                readonly type: "bytes";
            }, {
                readonly components: readonly [{
                    readonly name: "user";
                    readonly type: "address";
                }, {
                    readonly name: "value";
                    readonly type: "uint128";
                }];
                readonly name: "tags";
                readonly type: "tuple[]";
            }, {
                readonly name: "replyToMessageHash";
                readonly type: "optional(uint256)";
            }, {
                readonly name: "forwardMessageHash";
                readonly type: "optional(uint256)";
            }, {
                readonly name: "highlight";
                readonly type: "bool";
            }, {
                readonly components: readonly [{
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly name: "amount";
                    readonly type: "uint128";
                }];
                readonly name: "payment";
                readonly type: "tuple";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "changeServerInfo";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly components: readonly [{
                    readonly name: "meta";
                    readonly type: "bytes";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "createRoomPayment";
                    readonly type: "tuple";
                }];
                readonly name: "info";
                readonly type: "tuple";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "changeRoomInfo";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly name: "roomID";
                readonly type: "uint64";
            }, {
                readonly components: readonly [{
                    readonly name: "meta";
                    readonly type: "bytes";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "messagePayment";
                    readonly type: "tuple";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "highlightMessagePayment";
                    readonly type: "tuple";
                }];
                readonly name: "info";
                readonly type: "tuple";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "getServers";
            readonly inputs: readonly [{
                readonly name: "answerId";
                readonly type: "uint32";
            }];
            readonly outputs: readonly [{
                readonly name: "serverIDs";
                readonly type: "uint64[]";
            }];
        }, {
            readonly name: "getPermissions";
            readonly inputs: readonly [{
                readonly name: "answerId";
                readonly type: "uint32";
            }, {
                readonly name: "entity";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly components: readonly [{
                    readonly name: "values";
                    readonly type: "bool[]";
                }];
                readonly name: "permissions";
                readonly type: "tuple";
            }];
        }, {
            readonly name: "updateMeta";
            readonly inputs: readonly [{
                readonly name: "meta";
                readonly type: "bytes";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "join";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "withdrawFrom";
            readonly inputs: readonly [{
                readonly name: "entity";
                readonly type: "address";
            }, {
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly name: "recipient";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "setPermissions";
            readonly inputs: readonly [{
                readonly name: "entity";
                readonly type: "address";
            }, {
                readonly name: "user";
                readonly type: "address";
            }, {
                readonly components: readonly [{
                    readonly name: "values";
                    readonly type: "bool[]";
                }];
                readonly name: "permissions";
                readonly type: "optional(tuple)";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "setDefaultPermissions";
            readonly inputs: readonly [{
                readonly name: "entity";
                readonly type: "address";
            }, {
                readonly components: readonly [{
                    readonly name: "values";
                    readonly type: "bool[]";
                }];
                readonly name: "permissions";
                readonly type: "tuple";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "forceChangeRoomPermissions";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly name: "roomID";
                readonly type: "uint64";
            }, {
                readonly name: "usersList";
                readonly type: "address[]";
            }, {
                readonly components: readonly [{
                    readonly name: "values";
                    readonly type: "bool[]";
                }];
                readonly name: "permissionsList";
                readonly type: "optional(tuple)[]";
            }, {
                readonly components: readonly [{
                    readonly name: "values";
                    readonly type: "bool[]";
                }];
                readonly name: "defaultPermissions";
                readonly type: "tuple";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "setBan";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly name: "roomID";
                readonly type: "uint64";
            }, {
                readonly name: "user";
                readonly type: "address";
            }, {
                readonly name: "isBan";
                readonly type: "bool";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "createWallet";
            readonly inputs: readonly [{
                readonly name: "token";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "syncWallet";
            readonly inputs: readonly [{
                readonly name: "token";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "deposit";
            readonly inputs: readonly [];
            readonly outputs: readonly [];
        }, {
            readonly name: "withdraw";
            readonly inputs: readonly [{
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly name: "amount";
                readonly type: "uint128";
            }, {
                readonly name: "recipient";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "setMinTagValue";
            readonly inputs: readonly [{
                readonly name: "minTagValue";
                readonly type: "uint128";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "setPubkeys";
            readonly inputs: readonly [{
                readonly name: "pubkeys";
                readonly type: "uint256[]";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "onServerCreated";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly components: readonly [{
                    readonly name: "values";
                    readonly type: "bool[]";
                }];
                readonly name: "permissions";
                readonly type: "optional(tuple)";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "onRoomCreated";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly name: "roomID";
                readonly type: "uint64";
            }, {
                readonly components: readonly [{
                    readonly name: "values";
                    readonly type: "bool[]";
                }];
                readonly name: "permissions";
                readonly type: "optional(tuple)";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "onJoined";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "setServerPermissions";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly components: readonly [{
                    readonly name: "values";
                    readonly type: "bool[]";
                }];
                readonly name: "permissions";
                readonly type: "optional(tuple)";
            }, {
                readonly name: "callbackTo";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "setRoomPermissions";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly name: "roomID";
                readonly type: "uint64";
            }, {
                readonly components: readonly [{
                    readonly name: "values";
                    readonly type: "bool[]";
                }];
                readonly name: "permissions";
                readonly type: "optional(tuple)";
            }, {
                readonly name: "callbackTo";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "onSetBan";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly name: "roomID";
                readonly type: "uint64";
            }, {
                readonly name: "isBan";
                readonly type: "bool";
            }, {
                readonly name: "callbackTo";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "onTagged";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly name: "roomID";
                readonly type: "uint64";
            }, {
                readonly name: "messageID";
                readonly type: "uint64";
            }, {
                readonly name: "user";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "onMessageAccepted";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly name: "roomID";
                readonly type: "uint64";
            }, {
                readonly name: "messageID";
                readonly type: "uint64";
            }, {
                readonly name: "messageHash";
                readonly type: "uint256";
            }, {
                readonly name: "deployed";
                readonly type: "bool";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "onWalletDeployed";
            readonly inputs: readonly [{
                readonly name: "wallet";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "getTokens";
            readonly inputs: readonly [{
                readonly name: "answerId";
                readonly type: "uint32";
            }];
            readonly outputs: readonly [{
                readonly name: "tokens";
                readonly type: "address[]";
            }];
        }, {
            readonly name: "getWallet";
            readonly inputs: readonly [{
                readonly name: "answerId";
                readonly type: "uint32";
            }, {
                readonly name: "token";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "wallet";
                readonly type: "address";
            }];
        }, {
            readonly name: "getBalance";
            readonly inputs: readonly [{
                readonly name: "answerId";
                readonly type: "uint32";
            }, {
                readonly name: "token";
                readonly type: "address";
            }];
            readonly outputs: readonly [{
                readonly name: "balance";
                readonly type: "uint128";
            }];
        }, {
            readonly name: "onAcceptTokensTransfer";
            readonly inputs: readonly [{
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly name: "amount";
                readonly type: "uint128";
            }, {
                readonly name: "sender";
                readonly type: "address";
            }, {
                readonly name: "value3";
                readonly type: "address";
            }, {
                readonly name: "value4";
                readonly type: "address";
            }, {
                readonly name: "payload";
                readonly type: "cell";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "onSync";
            readonly inputs: readonly [{
                readonly name: "balance";
                readonly type: "uint128";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "constructor";
            readonly inputs: readonly [];
            readonly outputs: readonly [];
        }];
        readonly data: readonly [];
        readonly events: readonly [{
            readonly name: "Join";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "CreateRoom";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "SendMessage";
            readonly inputs: readonly [{
                readonly name: "messageHash";
                readonly type: "uint256";
            }, {
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly name: "roomID";
                readonly type: "uint64";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "ServerCreated";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "RoomCreated";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly name: "roomID";
                readonly type: "uint64";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "Joined";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "CreateWallet";
            readonly inputs: readonly [{
                readonly name: "token";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "SyncWallet";
            readonly inputs: readonly [{
                readonly name: "token";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "Deposited";
            readonly inputs: readonly [{
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly name: "amount";
                readonly type: "uint128";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "Withdrawn";
            readonly inputs: readonly [{
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly name: "amount";
                readonly type: "uint128";
            }, {
                readonly name: "recipient";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "SetBan";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly name: "roomID";
                readonly type: "uint64";
            }, {
                readonly name: "isBan";
                readonly type: "bool";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "PermissionChanged";
            readonly inputs: readonly [{
                readonly name: "entity";
                readonly type: "address";
            }, {
                readonly name: "removed";
                readonly type: "bool";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "Tagged";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly name: "roomID";
                readonly type: "uint64";
            }, {
                readonly name: "messageID";
                readonly type: "uint64";
            }, {
                readonly name: "user";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "MessageAccepted";
            readonly inputs: readonly [{
                readonly name: "messageHash";
                readonly type: "uint256";
            }, {
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly name: "roomID";
                readonly type: "uint64";
            }, {
                readonly name: "messageID";
                readonly type: "uint64";
            }, {
                readonly name: "deployed";
                readonly type: "bool";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "ChangeServerInfo";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "ChangeRoomInfo";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly name: "roomID";
                readonly type: "uint64";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "MultiVaultNewWallet";
            readonly inputs: readonly [{
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly name: "wallet";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "MultiVaultSync";
            readonly inputs: readonly [{
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly name: "balance";
                readonly type: "uint128";
            }];
            readonly outputs: readonly [];
        }];
        readonly fields: readonly [{
            readonly name: "_pubkey";
            readonly type: "uint256";
        }, {
            readonly name: "_constructorFlag";
            readonly type: "bool";
        }, {
            readonly name: "_pendingWallets";
            readonly type: "map(address,bool)";
        }, {
            readonly name: "_wallets";
            readonly type: "map(address,address)";
        }, {
            readonly name: "_balances";
            readonly type: "map(address,uint128)";
        }, {
            readonly name: "_pendingSyncs";
            readonly type: "map(address,address)";
        }, {
            readonly name: "_root";
            readonly type: "address";
        }, {
            readonly name: "_platformCode";
            readonly type: "cell";
        }, {
            readonly name: "_owner";
            readonly type: "address";
        }, {
            readonly name: "_meta";
            readonly type: "bytes";
        }, {
            readonly name: "_sendMessageValue";
            readonly type: "uint128";
        }, {
            readonly name: "_minTagValue";
            readonly type: "uint128";
        }, {
            readonly name: "_pubkeys";
            readonly type: "map(uint256,bool)";
        }, {
            readonly name: "_servers";
            readonly type: "map(uint64,bool)";
        }, {
            readonly name: "_userDatas";
            readonly type: "map(address,cell)";
        }, {
            readonly components: readonly [{
                readonly name: "values";
                readonly type: "bool[]";
            }];
            readonly name: "_permissions";
            readonly type: "map(address,tuple)";
        }, {
            readonly name: "_currentMessageHash";
            readonly type: "uint256";
        }, {
            readonly name: "_timestamp";
            readonly type: "uint64";
        }];
    };
    Room: {
        readonly 'ABI version': 2;
        readonly version: "2.3";
        readonly header: readonly ["time"];
        readonly functions: readonly [{
            readonly name: "changeInfo";
            readonly inputs: readonly [{
                readonly components: readonly [{
                    readonly name: "user";
                    readonly type: "address";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "payment";
                    readonly type: "tuple";
                }, {
                    readonly name: "userData";
                    readonly type: "optional(cell)";
                }, {
                    readonly components: readonly [{
                        readonly name: "values";
                        readonly type: "bool[]";
                    }];
                    readonly name: "permissions";
                    readonly type: "optional(tuple)";
                }];
                readonly name: "data";
                readonly type: "tuple";
            }, {
                readonly components: readonly [{
                    readonly name: "meta";
                    readonly type: "bytes";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "messagePayment";
                    readonly type: "tuple";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "highlightMessagePayment";
                    readonly type: "tuple";
                }];
                readonly name: "info";
                readonly type: "tuple";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "acceptMessage";
            readonly inputs: readonly [{
                readonly components: readonly [{
                    readonly name: "user";
                    readonly type: "address";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "payment";
                    readonly type: "tuple";
                }, {
                    readonly name: "userData";
                    readonly type: "optional(cell)";
                }, {
                    readonly components: readonly [{
                        readonly name: "values";
                        readonly type: "bool[]";
                    }];
                    readonly name: "permissions";
                    readonly type: "optional(tuple)";
                }];
                readonly name: "data";
                readonly type: "tuple";
            }, {
                readonly name: "messageHash";
                readonly type: "uint256";
            }, {
                readonly components: readonly [{
                    readonly name: "user";
                    readonly type: "address";
                }, {
                    readonly name: "value";
                    readonly type: "uint128";
                }];
                readonly name: "tags";
                readonly type: "tuple[]";
            }, {
                readonly name: "properties";
                readonly type: "cell";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "forceChangePermissions";
            readonly inputs: readonly [{
                readonly name: "serverID";
                readonly type: "uint64";
            }, {
                readonly name: "usersList";
                readonly type: "address[]";
            }, {
                readonly components: readonly [{
                    readonly name: "values";
                    readonly type: "bool[]";
                }];
                readonly name: "permissionsList";
                readonly type: "optional(tuple)[]";
            }, {
                readonly components: readonly [{
                    readonly name: "values";
                    readonly type: "bool[]";
                }];
                readonly name: "defaultPermissions";
                readonly type: "tuple";
            }, {
                readonly name: "callbackTo";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "setBan";
            readonly inputs: readonly [{
                readonly components: readonly [{
                    readonly name: "user";
                    readonly type: "address";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "payment";
                    readonly type: "tuple";
                }, {
                    readonly name: "userData";
                    readonly type: "optional(cell)";
                }, {
                    readonly components: readonly [{
                        readonly name: "values";
                        readonly type: "bool[]";
                    }];
                    readonly name: "permissions";
                    readonly type: "optional(tuple)";
                }];
                readonly name: "data";
                readonly type: "tuple";
            }, {
                readonly name: "user";
                readonly type: "address";
            }, {
                readonly name: "isBan";
                readonly type: "bool";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "withdraw";
            readonly inputs: readonly [{
                readonly components: readonly [{
                    readonly name: "user";
                    readonly type: "address";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "payment";
                    readonly type: "tuple";
                }, {
                    readonly name: "userData";
                    readonly type: "optional(cell)";
                }, {
                    readonly components: readonly [{
                        readonly name: "values";
                        readonly type: "bool[]";
                    }];
                    readonly name: "permissions";
                    readonly type: "optional(tuple)";
                }];
                readonly name: "data";
                readonly type: "tuple";
            }, {
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly name: "recipient";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "setPermissions";
            readonly inputs: readonly [{
                readonly components: readonly [{
                    readonly name: "user";
                    readonly type: "address";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "payment";
                    readonly type: "tuple";
                }, {
                    readonly name: "userData";
                    readonly type: "optional(cell)";
                }, {
                    readonly components: readonly [{
                        readonly name: "values";
                        readonly type: "bool[]";
                    }];
                    readonly name: "permissions";
                    readonly type: "optional(tuple)";
                }];
                readonly name: "data";
                readonly type: "tuple";
            }, {
                readonly name: "user";
                readonly type: "address";
            }, {
                readonly components: readonly [{
                    readonly name: "values";
                    readonly type: "bool[]";
                }];
                readonly name: "permissions";
                readonly type: "optional(tuple)";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "setDefaultPermissions";
            readonly inputs: readonly [{
                readonly components: readonly [{
                    readonly name: "user";
                    readonly type: "address";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "payment";
                    readonly type: "tuple";
                }, {
                    readonly name: "userData";
                    readonly type: "optional(cell)";
                }, {
                    readonly components: readonly [{
                        readonly name: "values";
                        readonly type: "bool[]";
                    }];
                    readonly name: "permissions";
                    readonly type: "optional(tuple)";
                }];
                readonly name: "data";
                readonly type: "tuple";
            }, {
                readonly components: readonly [{
                    readonly name: "values";
                    readonly type: "bool[]";
                }];
                readonly name: "permissions";
                readonly type: "tuple";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "onWalletDeployed";
            readonly inputs: readonly [{
                readonly name: "wallet";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "getToken";
            readonly inputs: readonly [{
                readonly name: "answerId";
                readonly type: "uint32";
            }];
            readonly outputs: readonly [{
                readonly name: "token";
                readonly type: "address";
            }];
        }, {
            readonly name: "getWallet";
            readonly inputs: readonly [{
                readonly name: "answerId";
                readonly type: "uint32";
            }];
            readonly outputs: readonly [{
                readonly name: "wallet";
                readonly type: "address";
            }];
        }, {
            readonly name: "getBalance";
            readonly inputs: readonly [{
                readonly name: "answerId";
                readonly type: "uint32";
            }];
            readonly outputs: readonly [{
                readonly name: "balance";
                readonly type: "uint128";
            }];
        }, {
            readonly name: "onAcceptTokensTransfer";
            readonly inputs: readonly [{
                readonly name: "value0";
                readonly type: "address";
            }, {
                readonly name: "amount";
                readonly type: "uint128";
            }, {
                readonly name: "sender";
                readonly type: "address";
            }, {
                readonly name: "value3";
                readonly type: "address";
            }, {
                readonly name: "value4";
                readonly type: "address";
            }, {
                readonly name: "payload";
                readonly type: "cell";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "onSync";
            readonly inputs: readonly [{
                readonly name: "balance";
                readonly type: "uint128";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "constructor";
            readonly inputs: readonly [];
            readonly outputs: readonly [];
        }];
        readonly data: readonly [];
        readonly events: readonly [{
            readonly name: "MessageAccepted";
            readonly inputs: readonly [{
                readonly name: "messageID";
                readonly type: "uint64";
            }, {
                readonly name: "messageHash";
                readonly type: "uint256";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "SetBan";
            readonly inputs: readonly [{
                readonly name: "user";
                readonly type: "address";
            }, {
                readonly name: "isBan";
                readonly type: "bool";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "VaultSync";
            readonly inputs: readonly [{
                readonly name: "balance";
                readonly type: "uint128";
            }];
            readonly outputs: readonly [];
        }];
        readonly fields: readonly [{
            readonly name: "_pubkey";
            readonly type: "uint256";
        }, {
            readonly name: "_timestamp";
            readonly type: "uint64";
        }, {
            readonly name: "_constructorFlag";
            readonly type: "bool";
        }, {
            readonly name: "_token";
            readonly type: "address";
        }, {
            readonly name: "_wallet";
            readonly type: "address";
        }, {
            readonly name: "_balance";
            readonly type: "uint128";
        }, {
            readonly name: "_root";
            readonly type: "address";
        }, {
            readonly name: "_platformCode";
            readonly type: "cell";
        }, {
            readonly components: readonly [{
                readonly name: "values";
                readonly type: "bool[]";
            }];
            readonly name: "_defaultPermissions";
            readonly type: "tuple";
        }, {
            readonly name: "_serverID";
            readonly type: "uint64";
        }, {
            readonly name: "_roomID";
            readonly type: "uint64";
        }, {
            readonly name: "_messagesCount";
            readonly type: "uint64";
        }, {
            readonly components: readonly [{
                readonly name: "meta";
                readonly type: "bytes";
            }, {
                readonly components: readonly [{
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly name: "amount";
                    readonly type: "uint128";
                }];
                readonly name: "messagePayment";
                readonly type: "tuple";
            }, {
                readonly components: readonly [{
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly name: "amount";
                    readonly type: "uint128";
                }];
                readonly name: "highlightMessagePayment";
                readonly type: "tuple";
            }];
            readonly name: "_info";
            readonly type: "tuple";
        }];
    };
    Server: {
        readonly 'ABI version': 2;
        readonly version: "2.3";
        readonly header: readonly ["time"];
        readonly functions: readonly [{
            readonly name: "changeInfo";
            readonly inputs: readonly [{
                readonly components: readonly [{
                    readonly name: "user";
                    readonly type: "address";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "payment";
                    readonly type: "tuple";
                }, {
                    readonly name: "userData";
                    readonly type: "optional(cell)";
                }, {
                    readonly components: readonly [{
                        readonly name: "values";
                        readonly type: "bool[]";
                    }];
                    readonly name: "permissions";
                    readonly type: "optional(tuple)";
                }];
                readonly name: "data";
                readonly type: "tuple";
            }, {
                readonly components: readonly [{
                    readonly name: "meta";
                    readonly type: "bytes";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "createRoomPayment";
                    readonly type: "tuple";
                }];
                readonly name: "info";
                readonly type: "tuple";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "join";
            readonly inputs: readonly [{
                readonly name: "value0";
                readonly type: "uint64";
            }, {
                readonly name: "user";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "createRoom";
            readonly inputs: readonly [{
                readonly components: readonly [{
                    readonly name: "user";
                    readonly type: "address";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "payment";
                    readonly type: "tuple";
                }, {
                    readonly name: "userData";
                    readonly type: "optional(cell)";
                }, {
                    readonly components: readonly [{
                        readonly name: "values";
                        readonly type: "bool[]";
                    }];
                    readonly name: "permissions";
                    readonly type: "optional(tuple)";
                }];
                readonly name: "data";
                readonly type: "tuple";
            }, {
                readonly name: "params";
                readonly type: "cell";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "forceChangeRoomPermissions";
            readonly inputs: readonly [{
                readonly components: readonly [{
                    readonly name: "user";
                    readonly type: "address";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "payment";
                    readonly type: "tuple";
                }, {
                    readonly name: "userData";
                    readonly type: "optional(cell)";
                }, {
                    readonly components: readonly [{
                        readonly name: "values";
                        readonly type: "bool[]";
                    }];
                    readonly name: "permissions";
                    readonly type: "optional(tuple)";
                }];
                readonly name: "data";
                readonly type: "tuple";
            }, {
                readonly name: "roomID";
                readonly type: "uint64";
            }, {
                readonly name: "usersList";
                readonly type: "address[]";
            }, {
                readonly components: readonly [{
                    readonly name: "values";
                    readonly type: "bool[]";
                }];
                readonly name: "permissionsList";
                readonly type: "optional(tuple)[]";
            }, {
                readonly components: readonly [{
                    readonly name: "values";
                    readonly type: "bool[]";
                }];
                readonly name: "defaultPermissions";
                readonly type: "tuple";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "withdraw";
            readonly inputs: readonly [{
                readonly components: readonly [{
                    readonly name: "user";
                    readonly type: "address";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "payment";
                    readonly type: "tuple";
                }, {
                    readonly name: "userData";
                    readonly type: "optional(cell)";
                }, {
                    readonly components: readonly [{
                        readonly name: "values";
                        readonly type: "bool[]";
                    }];
                    readonly name: "permissions";
                    readonly type: "optional(tuple)";
                }];
                readonly name: "data";
                readonly type: "tuple";
            }, {
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly name: "recipient";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "setPermissions";
            readonly inputs: readonly [{
                readonly components: readonly [{
                    readonly name: "user";
                    readonly type: "address";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "payment";
                    readonly type: "tuple";
                }, {
                    readonly name: "userData";
                    readonly type: "optional(cell)";
                }, {
                    readonly components: readonly [{
                        readonly name: "values";
                        readonly type: "bool[]";
                    }];
                    readonly name: "permissions";
                    readonly type: "optional(tuple)";
                }];
                readonly name: "data";
                readonly type: "tuple";
            }, {
                readonly name: "user";
                readonly type: "address";
            }, {
                readonly components: readonly [{
                    readonly name: "values";
                    readonly type: "bool[]";
                }];
                readonly name: "permissions";
                readonly type: "optional(tuple)";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "setDefaultPermissions";
            readonly inputs: readonly [{
                readonly components: readonly [{
                    readonly name: "user";
                    readonly type: "address";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "payment";
                    readonly type: "tuple";
                }, {
                    readonly name: "userData";
                    readonly type: "optional(cell)";
                }, {
                    readonly components: readonly [{
                        readonly name: "values";
                        readonly type: "bool[]";
                    }];
                    readonly name: "permissions";
                    readonly type: "optional(tuple)";
                }];
                readonly name: "data";
                readonly type: "tuple";
            }, {
                readonly components: readonly [{
                    readonly name: "values";
                    readonly type: "bool[]";
                }];
                readonly name: "permissions";
                readonly type: "tuple";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "onWalletDeployed";
            readonly inputs: readonly [{
                readonly name: "wallet";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "getToken";
            readonly inputs: readonly [{
                readonly name: "answerId";
                readonly type: "uint32";
            }];
            readonly outputs: readonly [{
                readonly name: "token";
                readonly type: "address";
            }];
        }, {
            readonly name: "getWallet";
            readonly inputs: readonly [{
                readonly name: "answerId";
                readonly type: "uint32";
            }];
            readonly outputs: readonly [{
                readonly name: "wallet";
                readonly type: "address";
            }];
        }, {
            readonly name: "getBalance";
            readonly inputs: readonly [{
                readonly name: "answerId";
                readonly type: "uint32";
            }];
            readonly outputs: readonly [{
                readonly name: "balance";
                readonly type: "uint128";
            }];
        }, {
            readonly name: "onAcceptTokensTransfer";
            readonly inputs: readonly [{
                readonly name: "value0";
                readonly type: "address";
            }, {
                readonly name: "amount";
                readonly type: "uint128";
            }, {
                readonly name: "sender";
                readonly type: "address";
            }, {
                readonly name: "value3";
                readonly type: "address";
            }, {
                readonly name: "value4";
                readonly type: "address";
            }, {
                readonly name: "payload";
                readonly type: "cell";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "onSync";
            readonly inputs: readonly [{
                readonly name: "balance";
                readonly type: "uint128";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "constructor";
            readonly inputs: readonly [];
            readonly outputs: readonly [];
        }];
        readonly data: readonly [];
        readonly events: readonly [{
            readonly name: "Joined";
            readonly inputs: readonly [{
                readonly name: "user";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "RoomCreated";
            readonly inputs: readonly [{
                readonly name: "roomID";
                readonly type: "uint64";
            }, {
                readonly name: "room";
                readonly type: "address";
            }, {
                readonly name: "creator";
                readonly type: "address";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "VaultSync";
            readonly inputs: readonly [{
                readonly name: "balance";
                readonly type: "uint128";
            }];
            readonly outputs: readonly [];
        }];
        readonly fields: readonly [{
            readonly name: "_pubkey";
            readonly type: "uint256";
        }, {
            readonly name: "_timestamp";
            readonly type: "uint64";
        }, {
            readonly name: "_constructorFlag";
            readonly type: "bool";
        }, {
            readonly name: "_token";
            readonly type: "address";
        }, {
            readonly name: "_wallet";
            readonly type: "address";
        }, {
            readonly name: "_balance";
            readonly type: "uint128";
        }, {
            readonly name: "_root";
            readonly type: "address";
        }, {
            readonly name: "_platformCode";
            readonly type: "cell";
        }, {
            readonly components: readonly [{
                readonly name: "values";
                readonly type: "bool[]";
            }];
            readonly name: "_defaultPermissions";
            readonly type: "tuple";
        }, {
            readonly name: "_serverID";
            readonly type: "uint64";
        }, {
            readonly name: "_roomCode";
            readonly type: "cell";
        }, {
            readonly name: "_roomsCount";
            readonly type: "uint64";
        }, {
            readonly name: "_usersCount";
            readonly type: "uint64";
        }, {
            readonly components: readonly [{
                readonly name: "meta";
                readonly type: "bytes";
            }, {
                readonly components: readonly [{
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly name: "amount";
                    readonly type: "uint128";
                }];
                readonly name: "createRoomPayment";
                readonly type: "tuple";
            }];
            readonly name: "_info";
            readonly type: "tuple";
        }];
    };
    Root: {
        readonly 'ABI version': 2;
        readonly version: "2.3";
        readonly header: readonly ["time"];
        readonly functions: readonly [{
            readonly name: "constructor";
            readonly inputs: readonly [{
                readonly name: "serverCode";
                readonly type: "cell";
            }, {
                readonly name: "roomCode";
                readonly type: "cell";
            }, {
                readonly name: "profileCode";
                readonly type: "cell";
            }, {
                readonly name: "platformCode";
                readonly type: "cell";
            }, {
                readonly name: "sendMessageValue";
                readonly type: "uint128";
            }];
            readonly outputs: readonly [];
        }, {
            readonly name: "createServer";
            readonly inputs: readonly [{
                readonly name: "answerId";
                readonly type: "uint32";
            }, {
                readonly name: "owner";
                readonly type: "address";
            }, {
                readonly components: readonly [{
                    readonly name: "meta";
                    readonly type: "bytes";
                }, {
                    readonly components: readonly [{
                        readonly name: "token";
                        readonly type: "address";
                    }, {
                        readonly name: "amount";
                        readonly type: "uint128";
                    }];
                    readonly name: "createRoomPayment";
                    readonly type: "tuple";
                }];
                readonly name: "info";
                readonly type: "tuple";
            }];
            readonly outputs: readonly [{
                readonly name: "value0";
                readonly type: "address";
            }];
        }, {
            readonly name: "getServersCount";
            readonly inputs: readonly [{
                readonly name: "answerId";
                readonly type: "uint32";
            }];
            readonly outputs: readonly [{
                readonly name: "count";
                readonly type: "uint64";
            }];
        }, {
            readonly name: "createProfile";
            readonly inputs: readonly [{
                readonly name: "answerId";
                readonly type: "uint32";
            }, {
                readonly name: "meta";
                readonly type: "bytes";
            }, {
                readonly name: "minTagValue";
                readonly type: "uint128";
            }, {
                readonly name: "pubkeys";
                readonly type: "uint256[]";
            }];
            readonly outputs: readonly [{
                readonly name: "profile";
                readonly type: "address";
            }];
        }, {
            readonly name: "_randomNonce";
            readonly inputs: readonly [];
            readonly outputs: readonly [{
                readonly name: "_randomNonce";
                readonly type: "uint256";
            }];
        }];
        readonly data: readonly [{
            readonly key: 1;
            readonly name: "_randomNonce";
            readonly type: "uint256";
        }];
        readonly events: readonly [];
        readonly fields: readonly [{
            readonly name: "_pubkey";
            readonly type: "uint256";
        }, {
            readonly name: "_timestamp";
            readonly type: "uint64";
        }, {
            readonly name: "_constructorFlag";
            readonly type: "bool";
        }, {
            readonly name: "_root";
            readonly type: "address";
        }, {
            readonly name: "_platformCode";
            readonly type: "cell";
        }, {
            readonly name: "_randomNonce";
            readonly type: "uint256";
        }, {
            readonly name: "_serverCode";
            readonly type: "cell";
        }, {
            readonly name: "_roomCode";
            readonly type: "cell";
        }, {
            readonly name: "_profileCode";
            readonly type: "cell";
        }, {
            readonly name: "_sendMessageValue";
            readonly type: "uint128";
        }, {
            readonly name: "_serversCount";
            readonly type: "uint64";
        }];
    };
};
