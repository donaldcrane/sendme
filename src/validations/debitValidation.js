import Joi from "joi";

const validation = outgoing => {
  const schema = Joi.object({
    amount: Joi.number().integer().required().empty()
      .messages({
        "any.required": "An Amount is required.",
        "integer.empty": "Amount cannot be an empty field.",
        "integer.base": "Please provide a valid amount."
      }),
    accountNo: Joi.number().integer().required().empty()
      .messages({
        "any.required": "Account number is required.",
        "integer.empty": "Account number cannot be an empty field.",
        "integer.base": "Please provide a valid Account number"
      }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  }).options({ abortEarly: false });
  return schema.validate(outgoing);
};
const validateId = ids => {
  const schema = Joi.object({
    id: Joi.string().required()
      .empty().guid({ version: "uuidv4" })
      .messages({
        "any.required": "ID not provided. Please provide an ID.",
        "string.empty": "ID cannot be an empty field.",
        "string.base": "ID must be a string.",
        "string.guid": "ID must be a UUID"
      }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  }).options({ abortEarly: false });
  return schema.validate(ids);
};

export { validation, validateId };
