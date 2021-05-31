class ArraySizesError extends Error {
  constructor() {
    super(`Os arrays não possuem o mesmo tamanho`);
    this.name = "Validação arrays de mesmo tamanho";
  }
}

module.exports = {
  ArraySizesError,
};
