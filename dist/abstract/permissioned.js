"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissioned = void 0;
const permissions_1 = require("../permissions");
class Permissioned {
    constructor() {
        this.defaultPermissions = new permissions_1.UserPermissions();
    }
}
exports.Permissioned = Permissioned;
