import Joi from "joi";

const validation = incoming => {
  const schema = Joi.object({
    amount: Joi.number().integer().required().empty()
      .messages({
        "any.required": "An Amount is required.",
        "integer.empty": "Amount cannot be an empty field.",
        "integer.base": "Please provide a valid amount."
      }),
  }).messages({
    "object.unknown": "You have used an invalid key."
  }).options({ abortEarly: false });
  return schema.validate(incoming);
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
