export class MovelTipoMovelInvalidoException extends Error {
  constructor(message = 'O tipo do móvel deve conter um nome comum válido.') {
    super(message);
    this.name = 'MovelTipoMovelInvalidoException';
  }
}
