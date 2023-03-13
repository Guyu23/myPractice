// 1. Symbol.asyncIterator

class Test1 {
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

const a = new Test1()

// ;(async function () {
//   for await (const item of a) {
//     console.log('No.1: ' + item)
//   }
// })()

// 2. Symbol.hasInstance

class Test2 {
    static [Symbol.hasInstance]() {
        return false
    }
}

let b = new Test2()

// console.log(Test2[Symbol.hasInstance](b), b instanceof Test2)

// 3. Symbol.isConcatSpreadable 可以把类数组对象在和数组合并时拍平

const test3 = [1]

const c = {
    length: 1,
    0: {
        length: 1,
        0: 'hello',
        [Symbol.isConcatSpreadable]: true
    },
    1: 'world',
    [Symbol.isConcatSpreadable]: true
}

const d = test3.concat(c)

// console.log(d)

// 4. Symbol.iterator

class Test4 {
    constructor() {
        this.max = 4
        this.min = 0
    }

    next() {
        while (this.min < this.max) {
            return {value: this.min++, done: false}
        }

        return {value: this.min, done: true}
    }

    [Symbol.iterator]() {
        return this
    }
}

// 另一种写法

class Test5 {
    constructor() {
        this.max = 5
        this.min = 0
    }

    wrapper(min, max) {
        return {
            next() {
            while (min < max) {
                return { value: min++, done: false }
            }
            return { value: min, done: true }
        }
        }
    }

    [Symbol.iterator]() {
        return this.wrapper(this.min, this.max)
    }
}

// 另一种写法

class Test6 {
    [Symbol.iterator]() {
        return {
            min: 0,
            max: 5,
            next() {
                while (this.min < this.max) {
                    return { value: this.min++, done: false }
                }

                return { value: this.min, done: true }
            }
        }
    }
}

// 另一种写法

const f = {
    from: 0,
    to: 5,
    [Symbol.iterator]() {
        return {
            from: this.from, 
            to: this.to,
            next() {
                while (this.from < this.to) {
                    return { value: this.from++, done: false }
                }

                return { value: this.to, done: true }
            }
        }
    }
}

// 另一种写法

class Test7 {
    constructor() {
        this.max = 5
        this.min = 0
    }

    *[Symbol.iterator]() {
        while (this.min < this.max) {
            yield this.min++
        }
    }
}

// const e = new Test7()

// for (const item of f) {
//     console.log(item);
// }

// 5. Symbol.split

class Test8 {
    static [Symbol.split](target) {
        return target.split('to')
    }
}

// console.log('welcome to NewYork'.split(Test8))

// 6. Symbol.toPrimitive 转换为原始值

class Test9 {
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case 'string':
                return 'hello'
            case 'number':
                return 4
            case 'default': 
                return 'defult'
            default: 
                return 'some'
        }
    }
}

const g = new Test9()

// console.log(+g, 3 < g, String(g), g.toString());

// 7. Symbol.toStringTag

class Test10 {
    constructor() {
        this[Symbol.toStringTag] = 'ha?'
        this.from = '5'
    }
}

const h = new Test10()

// console.log(h.toString())

for (const key in h) {
    console.log(key)
}