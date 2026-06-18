"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movel = void 0;
class Movel {
    id;
    tipoMovel;
    dataInicioTrab;
    restaurado;
    horasHomem;
    atelieId;
    ownerUserId;
    constructor(id, tipoMovel, dataInicioTrab, restaurado, horasHomem, atelieId, ownerUserId) {
        this.id = id;
        this.tipoMovel = tipoMovel;
        this.dataInicioTrab = dataInicioTrab;
        this.restaurado = restaurado;
        this.horasHomem = horasHomem;
        this.atelieId = atelieId;
        this.ownerUserId = ownerUserId;
    }
}
exports.Movel = Movel;
//# sourceMappingURL=movel.js.map