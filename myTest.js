let b = {
    start: 0,
    end: 100,
    async next () {
      if (this.start < this.end) {
        return {value: this.satrt + 100, done: false};
      }
      return {value: this.start, done: true};
    },
    [Symbol.asyncIterator] () {
      return this;
    }
  };
  
  (async function () {
    for await (let j of b) {
      console.log(j);
    }
  })()