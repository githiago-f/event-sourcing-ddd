export class UniqueInstanceException extends Error {
  constructor(key: string) {
    super('There is already a instance for ' + key);
  }
}
