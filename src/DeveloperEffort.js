const { ArraySizesError } = require("./ArraySizesError");
const {
  validateArrayItensInteger,
  validateFrontendNumber,
} = require("./helpers");

class DeveloperEffort {
  frontDevArray = [];
  backDevArray = [];
  frontNumber = 0;

  effortArray = [];
  effortFrontArray = [];
  effortBackArray = [];
  effortEqualsArray = [];

  constructor(frontDevArray, backDevArray, frontNumber) {
    this.frontDevArray = validateArrayItensInteger(frontDevArray, "Frontend");
    this.backDevArray = validateArrayItensInteger(backDevArray, "Backend");
    this.frontNumber = validateFrontendNumber(frontNumber);

    this._validateArrayEqualsSize();
  }

  _validateArrayEqualsSize() {
    if (this.frontDevArray.length !== this.backDevArray.length) {
      throw new ArraySizesError();
    }
  }

  effort() {
    const backNumber = this.frontDevArray.length - this.frontNumber;
    this.frontDevArray.forEach((item, key) => {
      const backItem = this.backDevArray[key];

      if (item > backItem && this.effortFrontArray.length < this.frontNumber) {
        this.effortFrontArray.push({ key, value: item, area: "front" });
      } else if (item === backItem) {
        this.effortEqualsArray.push({ key, value: item });
      } else {
        if (this.effortBackArray.length < backNumber) {
          this.effortBackArray.push({ key, value: backItem, area: "back" });
        } else {
          this.effortFrontArray.push({ key, value: item, area: "front" });
        }
      }
    });

    if (this.effortFrontArray.length < this.frontNumber) {
      this.effortFrontArray.push(
        ...this.effortEqualsArray.map((item) => ({ ...item, area: "front" }))
      );
    }
    if (this.effortBackArray.length < backNumber) {
      this.effortBackArray.push(
        ...this.effortEqualsArray.map((item) => ({ ...item, area: "back" }))
      );
    }

    this.effortEqualsArray = [];
    const newEffortArray = [];

    this.effortFrontArray.forEach(
      (item) => (newEffortArray[item.key] = item.value)
    );
    this.effortBackArray.forEach(
      (item) => (newEffortArray[item.key] = item.value)
    );

    this.effortArray.push(...newEffortArray);

    return this.effortArray;
  }

  effortSum() {
    let sum = 0;
    this.effortArray.forEach((item) => {
      sum = item + sum;
    });

    return sum;
  }

  getDevActuation() {
    const effortAreas = [
      ...this.effortFrontArray,
      ...this.effortBackArray,
    ].sort((a, b) => {
      if (a.key < b.key) return -1;
      if (a.key > b.key) return 1;
      return 0;
    });

    return effortAreas.map((item) => {
      return `Dev-${item.key} skill: ${item.value} atua: ${item.area}`;
    });
  }
}

module.exports = {
  DeveloperEffort,
};
