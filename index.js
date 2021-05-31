const { DeveloperEffort } = require("./src/developerEffort");

function init() {
  const front = [7, 1, 4, 4];
  const back = [5, 3, 4, 3];
  const f = 2;

  try {
    const effortInstance = new DeveloperEffort(front, back, f);
    effortInstance.effort();
    console.log("Soma do esforço do time é:", effortInstance.effortSum());
    console.log(effortInstance.getDevActuation().join("\r\n"));
  } catch (error) {
    console.error(error);
  }
}

init();
