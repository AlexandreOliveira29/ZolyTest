const { ArraySizesError } = require("./ArraySizesError");
const {
  validateArrayItensInteger,
  validateFrontendNumber,
} = require("./helpers");

class DeveloperEffort {
  frontDevArray = [];
  backDevArray = [];
  frontNumber = 0;
  backNumber = 0;

  effortArray = [];
  effortFrontArray = [];
  effortBackArray = [];
  effortEqualsArray = [];

  constructor(frontDevArray, backDevArray, frontNumber) {
    this.frontDevArray = validateArrayItensInteger(frontDevArray, "Frontend");
    this.backDevArray = validateArrayItensInteger(backDevArray, "Backend");
    this.frontNumber = validateFrontendNumber(frontNumber);
    this.backNumber = this.frontDevArray.length - this.frontNumber;

    this._validateArrayEqualsSize();
  }

  _validateArrayEqualsSize() {
    if (this.frontDevArray.length !== this.backDevArray.length) {
      throw new ArraySizesError();
    }
  }

  _distributesFrontEquals() {
    if (
      this.effortEqualsArray.length > 0 &&
      this.effortFrontArray.length < this.frontNumber
    ) {
      const newEffortFrontArray = [];

      for (let index = 0; index < this.frontNumber; index++) {
        const item = this.effortEqualsArray[index];
        if (item) {
          newEffortFrontArray.push({ ...item, area: "Frontend" });
        }
      }
      this.effortEqualsArray.splice(0, this.frontNumber);
      this.effortFrontArray.push(...newEffortFrontArray);
    }
  }
  _distributesBackEquals() {
    if (
      this.effortEqualsArray.length > 0 &&
      this.effortBackArray.length < this.backNumber
    ) {
      const newEffortBackArray = [];

      for (let index = 0; index < this.backNumber; index++) {
        const item = this.effortEqualsArray[index];
        if (item) {
          newEffortBackArray.push({ ...item, area: "Backend" });
        }
      }
      this.effortEqualsArray.splice(0, this.backNumber);
      this.effortBackArray.push(...newEffortBackArray);
    }
  }

  _sanitizeEfforts() {
    const newEffortArray = [];

    this.effortFrontArray.forEach(
      (item) => (newEffortArray[item.key] = item.value)
    );
    this.effortBackArray.forEach(
      (item) => (newEffortArray[item.key] = item.value)
    );

    this.effortArray.push(...newEffortArray);
  }

  effort() {
    this.frontDevArray.forEach((item, key) => {
      const backItem = this.backDevArray[key];

      if (item > backItem && this.effortFrontArray.length < this.frontNumber) {
        this.effortFrontArray.push({ key, value: item, area: "Frontend" });
      } else if (item === backItem) {
        this.effortEqualsArray.push({ key, value: item });
      } else {
        if (this.effortBackArray.length < this.backNumber) {
          this.effortBackArray.push({ key, value: backItem, area: "Backend" });
        } else {
          this.effortFrontArray.push({ key, value: item, area: "Frontend" });
        }
      }
    });

    this._distributesFrontEquals();
    this._distributesBackEquals();
    this._sanitizeEfforts();

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
