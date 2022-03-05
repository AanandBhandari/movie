import { validationResult, ValidationError, Result } from "express-validator";
import { failure } from "../../utils/helper";

const _validationResult = (req) => {
  const errors: Result<ValidationError> = validationResult(req);
  const messages: ValidationError[] = [];
  if (!errors.isEmpty()) {
    for (const i of errors.array()) {
      messages.push(i);
    }
  }
  if (messages.length > 0) {
    console.log("****VALIDATION ERRORS****");
    console.log(messages);
  }

  return messages.map((error) => error.msg)[0] || "";
};

export const validator = (req, res, next) => {
  const message = _validationResult(req);
  if (message) {
    return res.status(400).json(failure(message));
  }
  next();
};
