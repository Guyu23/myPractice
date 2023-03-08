class Some {
  constructor () {
    this.max = 2
    this.min = 0
  }

  // 非常关键的 async 以及 resolve
  async * [Symbol.asyncIterator] () {
    while (this.min < this.max) {
      yield new Promise((resolve) => setTimeout(() => resolve(this.min++), 2000))
    }
  }
};

const a = new Some();

(async function () {
  for await (const item of a) {
    console.log(item)
  }
})()
