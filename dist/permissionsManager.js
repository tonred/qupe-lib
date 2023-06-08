"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsManager = void 0;
class Manager {
    static canSendMessage(input) {
        const userRecords = Manager.getCustomRecord(input);
        if (userRecords) {
            return userRecords.canSendMessage;
        }
        return input.entity.defaultPermissions.canSendMessage;
    }
    static canCreateRoom(input) {
        const userRecords = Manager.getCustomRecord(input);
        if (userRecords) {
            return userRecords.canCreateRoom;
        }
        return input.entity.defaultPermissions.canCreateRoom;
    }
    static canChangeConfig(input) {
        const userRecords = Manager.getCustomRecord(input);
        if (userRecords) {
            return userRecords.canChangeConfig;
        }
        return input.entity.defaultPermissions.canChangeConfig;
    }
    static isAdmin(input) {
        const userRecords = Manager.getCustomRecord(input);
        if (userRecords) {
            return userRecords.isAdmin;
        }
        return input.entity.defaultPermissions.isAdmin;
    }
    static canBan(input) {
        const userRecords = Manager.getCustomRecord(input);
        if (userRecords) {
            return userRecords.isAdmin;
        }
        return input.entity.defaultPermissions.canBan;
    }
    static getCustomRecord(input) {
        return input.profile.permissions.get(input.entity.address.toString());
    }
}
exports.PermissionsManager = Manager;
