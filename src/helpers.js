const { ArrayIntegerError } = require("./ArrayIntegerError");
const { FrontendValueIntegerError } = require("./FrontendValueIntegerError");

function validateArrayItensInteger(array = [], arrayLabel = "") {
  array.forEach((item, key) => {
    if (!Number.isInteger(item) || item < 0) {
      throw new ArrayIntegerError(key, arrayLabel);
    }
  });

  return array;
}

function validateFrontendNumber(valor) {
  if (!Number.isInteger(valor) || valor < 0) {
    throw new FrontendValueIntegerError();
  }

  return valor;
}

module.exports = {
  validateArrayItensInteger,
  validateFrontendNumber,
};
