"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissions = exports.PermissionsType = void 0;
/* eslint-disable max-classes-per-file */
var PermissionsType;
(function (PermissionsType) {
    PermissionsType[PermissionsType["ADMIN"] = 0] = "ADMIN";
    PermissionsType[PermissionsType["CONFIG"] = 1] = "CONFIG";
    PermissionsType[PermissionsType["BAN_UNBAN"] = 2] = "BAN_UNBAN";
    PermissionsType[PermissionsType["CREATE_ROOM"] = 3] = "CREATE_ROOM";
    PermissionsType[PermissionsType["SEND_MESSAGE"] = 4] = "SEND_MESSAGE";
})(PermissionsType = exports.PermissionsType || (exports.PermissionsType = {}));
class UserPermissions {
    constructor(_values = [false, false, false, false, false]) {
        this._values = _values;
    }
    get values() {
        return this._values;
    }
    set isAdmin(value) {
        this._values[PermissionsType.ADMIN] = value;
    }
    get isAdmin() {
        return this._values[PermissionsType.ADMIN];
    }
    set canChangeConfig(value) {
        this._values[PermissionsType.CONFIG] = value;
    }
    get canChangeConfig() {
        return this._values[PermissionsType.CONFIG];
    }
    set canBan(value) {
        this._values[PermissionsType.BAN_UNBAN] = value;
    }
    get canBan() {
        return this._values[PermissionsType.BAN_UNBAN];
    }
    set canCreateRoom(value) {
        this._values[PermissionsType.CREATE_ROOM] = value;
    }
    get canCreateRoom() {
        return this._values[PermissionsType.CREATE_ROOM];
    }
    set canSendMessage(value) {
        this._values[PermissionsType.SEND_MESSAGE] = value;
    }
    get canSendMessage() {
        return this._values[PermissionsType.SEND_MESSAGE];
    }
}
exports.UserPermissions = UserPermissions;
