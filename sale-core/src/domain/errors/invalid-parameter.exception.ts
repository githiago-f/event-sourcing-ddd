export class InvalidParameterException extends Error {
  public readonly fields: Record<string, string>;
  constructor(fieldName: string) {
    super(`Cannot create or update sale: ${fieldName} is required`);
    this.fields = { [fieldName]: 'is required' };
  }
}
