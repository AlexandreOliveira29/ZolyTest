class ArrayIntegerError extends Error {
  constructor(key, label) {
    super(`O array de ${label} possui um valor não inteiro na posição: ${key}`);
    this.name = "Validação de Array Inteiros";
  }
}

module.exports = {
  ArrayIntegerError,
};
