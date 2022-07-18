const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const retry = async (func, attempts) => {
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      await sleep(attempt * attempt * 1000);

      const result = await func();
      return result;
    } catch {}
  }

  throw `faild ${attempts} times`;
};

module.exports = { retry };
