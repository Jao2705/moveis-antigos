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
    constructor(id, tipoMovel, dataInicioTrab, restaurado, horasHomem, atelieId) {
        this.id = id;
        this.tipoMovel = tipoMovel;
        this.dataInicioTrab = dataInicioTrab;
        this.restaurado = restaurado;
        this.horasHomem = horasHomem;
        this.atelieId = atelieId;
    }
}
exports.Movel = Movel;
//# sourceMappingURL=movel.js.map