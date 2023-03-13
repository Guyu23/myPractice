// Symbol.asyncIterator

class test1 {
  constructor () {
    this.max = 5
    this.min = 0
  }

  async * [Symbol.asyncIterator] () {
    while (this.min < this.max) {
      yield new Promise((resolve) => setTimeout(() => resolve(this.min++), 1000))
    }
  }
}

const a = new test1()

;(async function () {
  for await (const item of a) {
    console.log(item)
  }
})()

// Symbol.hasInstance