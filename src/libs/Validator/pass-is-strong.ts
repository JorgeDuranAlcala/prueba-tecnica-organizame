import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

const passRegExp = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
const constraints = [
  "The string must contain at least 1 lowercase alphabetical character",
  "The string must contain at least 1 uppercase alphabetical character",
  "The string must contain at least 1 numeric character",
  "The string must contain at least one special character",
  "The string must be eight characters or longer",
];

@ValidatorConstraint({ name: "password-validator", async: false })
export class IsPasswordStrong implements ValidatorConstraintInterface {
  validate(text: string) {
    return passRegExp.test(text); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return `The password is not strong enough, it must be lacking one of this conditions ${constraints.join(
      "\n"
    )}`;
  }
}
