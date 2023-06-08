"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissions = exports.PermissionsType = void 0;
var PermissionsType;
(function (PermissionsType) {
    PermissionsType[PermissionsType["ADMIN"] = 0] = "ADMIN";
    PermissionsType[PermissionsType["CONFIG"] = 1] = "CONFIG";
    PermissionsType[PermissionsType["BAN_UNBAN"] = 2] = "BAN_UNBAN";
    PermissionsType[PermissionsType["CREATE_ROOM"] = 3] = "CREATE_ROOM";
    PermissionsType[PermissionsType["SEND_MESSAGE"] = 4] = "SEND_MESSAGE";
})(PermissionsType = exports.PermissionsType || (exports.PermissionsType = {}));
class UserPermissions {
    constructor(values = [false, false, false, false, false]) {
        this.values = values;
    }
    get isAdmin() {
        return this.values[PermissionsType.ADMIN];
    }
    get canChangeConfig() {
        return this.values[PermissionsType.CONFIG];
    }
    get canBan() {
        return this.values[PermissionsType.BAN_UNBAN];
    }
    get canCreateRoom() {
        return this.values[PermissionsType.CREATE_ROOM];
    }
    get canSendMessage() {
        return this.values[PermissionsType.SEND_MESSAGE];
    }
}
exports.UserPermissions = UserPermissions;
