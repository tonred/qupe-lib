export declare const CHAT_MESSAGE_VERSION = 1;
export declare const MessageValues: {
    Profile: {
        BanUser: number;
        UpdateDefaultPermissions: number;
        UpdateMeta: number;
        UpdateRoomInfo: number;
        UpdateServerInfo: number;
        UpdateUserPermissions: number;
    };
    Root: {
        DeployProfile: number;
        DeployServer: number;
    };
    Server: {
        CreateRoom: number;
        Join: number;
    };
};
export declare const EMPTY_PAYMENT: {
    amount: number;
    token: import("everscale-inpage-provider").Address;
};
