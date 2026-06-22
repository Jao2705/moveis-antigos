export class DataException extends Error {
  getResponse: any;
  constructor(data: Date) {
    super(`A data de fundação não pode ser futura.`);
  }
}
