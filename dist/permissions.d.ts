export declare enum PermissionsType {
    ADMIN = 0,
    CONFIG = 1,
    BAN_UNBAN = 2,
    CREATE_ROOM = 3,
    SEND_MESSAGE = 4
}
export declare class UserPermissions {
    protected _values: boolean[];
    constructor(_values?: boolean[]);
    get values(): boolean[];
    set isAdmin(value: boolean);
    get isAdmin(): boolean;
    set canChangeConfig(value: boolean);
    get canChangeConfig(): boolean;
    set canBan(value: boolean);
    get canBan(): boolean;
    set canCreateRoom(value: boolean);
    get canCreateRoom(): boolean;
    set canSendMessage(value: boolean);
    get canSendMessage(): boolean;
}
