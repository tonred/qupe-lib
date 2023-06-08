"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformType = exports.ImplementationType = void 0;
var ImplementationType;
(function (ImplementationType) {
    ImplementationType[ImplementationType["CHAT"] = 0] = "CHAT";
    ImplementationType[ImplementationType["FORUM"] = 1] = "FORUM";
    ImplementationType[ImplementationType["PAGES"] = 2] = "PAGES";
})(ImplementationType = exports.ImplementationType || (exports.ImplementationType = {}));
var PlatformType;
(function (PlatformType) {
    PlatformType[PlatformType["PROFILE"] = 0] = "PROFILE";
    PlatformType[PlatformType["SERVER"] = 1] = "SERVER";
    PlatformType[PlatformType["ROOM"] = 2] = "ROOM";
    PlatformType[PlatformType["MESSAGE"] = 3] = "MESSAGE";
})(PlatformType = exports.PlatformType || (exports.PlatformType = {}));
