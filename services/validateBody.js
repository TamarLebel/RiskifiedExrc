const { validBody } = require("../consts/consts");

const validateBody = (body) => {
  const fields = Object.keys(validBody);
  const isNotValid = fields.some(
    (field) => !body.hasOwnProperty(field) || !validBody[field](body[field])
  );

  return !isNotValid;
};

module.exports = { validateBody };
