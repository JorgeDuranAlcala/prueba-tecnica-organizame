export interface IValidator {
  // eslint-disable-next-line no-unused-vars
  validate: (data: object) => Promise<boolean>;
}
