class FrontendValueIntegerError extends Error {
  constructor() {
    super(`O número de frontend não é inteiro`);
    this.name = "Validação valor inteiro";
  }
}

module.exports = {
  FrontendValueIntegerError,
};
