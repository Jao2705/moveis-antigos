"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtelieNotFoundException = void 0;
class AtelieNotFoundException extends Error {
    constructor(id) {
        super(`Atelie com id ${id} nao encontrado`);
    }
}
exports.AtelieNotFoundException = AtelieNotFoundException;
//# sourceMappingURL=atelie.not.found.exception.js.map