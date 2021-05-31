const { DeveloperEffort } = require("./src/developerEffort");

function _initialize(front, back, f) {
  try {
    const effortInstance = new DeveloperEffort(front, back, f);
    effortInstance.effort();
    console.log("------------------------------------------------------");
    console.log("Soma do esforço do time é:", effortInstance.effortSum());
    console.log(effortInstance.getDevActuation().join("\r\n"));
    console.log("------------------------------------------------------");
  } catch (error) {
    console.error(error);
  }
}

function example1() {
  const front = [4, 2, 1];
  const back = [2, 5, 3];
  const f = 2;
  _initialize(front, back, f);
}

function example2() {
  const front = [7, 1, 4, 4];
  const back = [5, 3, 4, 3];
  const f = 2;
  _initialize(front, back, f);
}

function example3() {
  const front = [5, 5, 5];
  const back = [5, 5, 5];
  const f = 1;
  _initialize(front, back, f);
}

example1();
example2();
example3();
