export declare enum PermissionsType {
    ADMIN = 0,
    CONFIG = 1,
    BAN_UNBAN = 2,
    CREATE_ROOM = 3,
    SEND_MESSAGE = 4
}
export declare class UserPermissions {
    protected values: boolean[];
    constructor(values?: boolean[]);
    get isAdmin(): boolean;
    get canChangeConfig(): boolean;
    get canBan(): boolean;
    get canCreateRoom(): boolean;
    get canSendMessage(): boolean;
}
