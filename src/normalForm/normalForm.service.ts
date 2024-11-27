export type Digits = 0 | 1

export type ISet = Array<{
  value: Digits
  index: number
}>

export type ISelection = Array<{
  set: ISet
  indexes: Array<number>
  used: boolean
  isCore: boolean
}>

export default class NormalFormService {
  static defaultHeadersKarnaughMap = {
    rows: [[1], [1, 3], [3], []],
    columns: [[2], [2, 4], [4], []]
  }

  static decToBin = (dec: number, minLength: number) => {
    const bin = dec.toString(2).split("").map(Number)
    return new Array(minLength - bin.length)
      .fill(0)
      .concat(bin) as Array<Digits>
  }

  static exclude = (count: number, sets: Array<number>) => {
    const result = []

    for (let i = 0; i < 2 ** count; i++) {
      if (!sets.includes(i)) {
        result.push(i)
      }
    }

    return result
  }

  static compareImplicants = (imp1: ISet, imp2: ISet) => {
    if (imp1.length !== imp2.length) {
      return false
    }

    for (let i = 0; i < imp1.length; i++) {
      if (imp1[i].value !== imp2[i].value || imp1[i].index !== imp2[i].index) {
        return false
      }
    }

    return true
  }

  static combineImplicants = (imp1: ISet, imp2: ISet) => {
    if (imp1.length !== imp2.length) {
      return
    }

    const result: ISet = []
    let additionCount = 0

    for (let i = 0; i < imp1.length; i++) {
      if (imp1[i].index !== imp2[i].index) {
        return
      }

      if (imp1[i].value !== imp2[i].value) {
        additionCount++

        if (additionCount > 1) {
          return
        }

        continue
      }

      result.push({ ...imp1[i] })
    }

    return result
  }

  static pnf = (count: number, sets: Array<number>) => {
    const result: Array<ISet> = []

    for (let i = 0; i < sets.length; i++) {
      const set = NormalFormService.decToBin(sets[i], count).map(
        (digit, index) => ({
          value: digit,
          index: index + 1
        })
      )

      result.push(set)
    }

    return {
      result
    }
  }

  static mnf = (count: number, sets: Array<number>) => {
    const pnf = NormalFormService.pnf(count, sets)
    const selections: Array<ISelection> = [
      pnf.result.map((set, i) => ({
        set,
        indexes: [i],
        used: false,
        isCore: false
      }))
    ]

    for (let selection = 1; selection < count; selection++) {
      selections[selection] = []

      for (let i = 0; i < selections[selection - 1].length; i++) {
        for (let j = i + 1; j < selections[selection - 1].length; j++) {
          const imp1 = selections[selection - 1][i]
          const imp2 = selections[selection - 1][j]
          const combine = NormalFormService.combineImplicants(
            imp1.set,
            imp2.set
          )

          if (
            combine &&
            !selections[selection].find(imp =>
              NormalFormService.compareImplicants(imp.set, combine)
            )
          ) {
            const indexes = imp1.indexes
              .concat(imp2.indexes)
              .filter((el, i, array) => i === array.indexOf(el))
              .sort((a, b) => a - b)

            selections[selection].push({
              set: combine,
              indexes,
              used: false,
              isCore: false
            })

            selections[selection - 1].forEach(imp => {
              if (imp.indexes.filter(i => !indexes.includes(i)).length === 0) {
                imp.used = true
              }
            })
          }
        }
      }
    }

    let usedIndexes: Array<number> = new Array(sets.length).fill(0)
    const flatSelections = selections.flat()

    flatSelections
      .filter(imp => !imp.used)
      .forEach(imp => imp.indexes.forEach(i => usedIndexes[i]++))

    const sortedUsedIndexes: Array<[number, number]> = usedIndexes
      .map((count, i) => [i, count] as [number, number])
      .sort((a, b) => (b[1] !== a[1] ? b[1] - a[1] : b[0] - a[0]))

    usedIndexes = []

    for (let used = sortedUsedIndexes.length - 1; used >= 0; used--) {
      for (let index = flatSelections.length - 1; index >= 0; index--) {
        if (usedIndexes.length >= sets.length) {
          break
        }

        const imp = flatSelections[index]

        if (
          !imp.used &&
          !imp.isCore &&
          !usedIndexes.includes(sortedUsedIndexes[used][0]) &&
          imp.indexes.includes(sortedUsedIndexes[used][0])
        ) {
          imp.indexes.forEach(i =>
            !usedIndexes.includes(i) ? usedIndexes.push(i) : null
          )
          imp.isCore = true
        }
      }
    }

    return {
      result: flatSelections.filter(imp => imp.isCore).map(imp => imp.set),
      selections,
      pnf: pnf.result,
      sets
    }
  }

  static karnaughMap = (
    count: number,
    sets: Array<number>,
    headers: typeof NormalFormService.defaultHeadersKarnaughMap
  ) => {
    if (!headers) {
      headers = NormalFormService.defaultHeadersKarnaughMap
    }

    const map: Array<Array<Array<Digits>>> = []

    for (let row = 0; row < count; row++) {
      map[row] = []

      for (let colunm = 0; colunm < count; colunm++) {
        map[row][colunm] = new Array(count).fill(0)

        for (const i of headers.rows[row]) {
          map[row][colunm][i - 1] = 1
        }

        for (const i of headers.columns[colunm]) {
          map[row][colunm][i - 1] = 1
        }
      }
    }

    const result: Array<Array<Digits>> = []

    for (let row = 0; row < count; row++) {
      result[row] = []

      for (let colunm = 0; colunm < count; colunm++) {
        result[row][colunm] = 0

        if (sets.includes(parseInt(map[row][colunm].join(""), 2))) {
          result[row][colunm] = 1
        }
      }
    }

    return {
      result,
      headers
    }
  }
}
