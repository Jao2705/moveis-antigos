"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataException = void 0;
class DataException extends Error {
    getResponse;
    constructor(data) {
        super(`A data ${data.toISOString()} é inválida`);
    }
}
exports.DataException = DataException;
//# sourceMappingURL=data.exception.js.map