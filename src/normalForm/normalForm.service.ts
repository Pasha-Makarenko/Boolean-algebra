import { Digits, IHeaders, INormalForm, ISelection, ISet } from "./normalForm.interfaces"

export default class NormalFormService {
  static defaultHeadersKarnaughMap: IHeaders = {
    rows: [[1], [1, 3], [3], []],
    columns: [[2], [2, 4], [4], []]
  }

  /*
  * Convert decimal to binary
  * @param {number} dec - Decimal number
  * @param {number} minLength - Minimum length of binary number
  * @returns {Array<Digits>} - Binary number
  * */
  static decToBin = (dec: number, minLength: number) => {
    const bin = dec.toString(2).split("").map(Number)
    return new Array(minLength - bin.length)
      .fill(0)
      .concat(bin) as Array<Digits>
  }

  /*
  * Exclude sets from the list
  * @param {number} count - Count of digits in binary number
  * @param {Array<number>} sets - List of sets
  * @returns {Array<number>} - List of sets without excluded
   */
  static exclude = (count: number, sets: Array<number>) => {
    const result = []

    for (let i = 0; i < 2 ** count; i++) {
      if (!sets.includes(i)) {
        result.push(i)
      }
    }

    return result
  }

  /*
  * Compare two implicants
  * @param {ISet} imp1 - First implicant
  * @param {ISet} imp2 - Second implicant
  * @returns {boolean} - Result of comparison
   */
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

  /*
  * Combine two implicants
  * @param {ISet} imp1 - First implicant
  * @param {ISet} imp2 - Second implicant
  * @returns {ISet | undefined} - Combined implicant
   */
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

  /*
  * Get perfect normal form
  * @param {number} count - Count of arguments
  * @param {Array<number>} sets - List of sets
  * @returns {Array<ISet>} - Perfect normal form
   */
  static pnf = (count: number, sets: Array<number>) => {
    const result: INormalForm = []

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

  /*
  * Get minimal normal form
  * @param {number} count - Count of arguments
  * @param {Array<number>} sets - List of sets
  * @returns {{ result: INormalForm, pnf: INormalForm, selection: Array<Iselection>, sets: Array<number> }} - Minimal normal form
   */
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

    const usedIndexes: Array<number> = new Array(sets.length).fill(0)
    const flatSelections = selections.flat()

    for (let i = flatSelections.length - 1; i >= 0; i--) {
      const imp = flatSelections[i]

      if (imp.used) {
        continue
      }

      if (imp.indexes.find(index => usedIndexes[index] === 0) !== undefined) {
        imp.isCore = true

        imp.indexes.forEach(index => usedIndexes[index]++)

        if (!usedIndexes.includes(0)) {
          break
        }
      }
    }

    for (let i = 0; i < flatSelections.length; i++) {
      const imp = flatSelections[i]

      if (imp.used) {
        continue
      }

      if (imp.indexes.find(index => usedIndexes[index] === 1) === undefined) {
        imp.isCore = false

        imp.indexes.forEach(index => usedIndexes[index]--)
      }
    }

    return {
      result: flatSelections.filter(imp => imp.isCore).map(imp => imp.set) as INormalForm,
      selections,
      pnf: pnf.result,
      sets
    }
  }

  /*
  * Get Karnaugh map
  * @param {number} count - Count of arguments
  * @param {Array<number>} sets - List of sets
  * @param {IHeaders} headers - Headers of Karnaugh map
  * @returns {{result: Array<Array<Digits>>, headers: IHeaders} - Karnaugh map
   */
  static karnaughMap = (
    count: number,
    sets: Array<number>,
    headers: IHeaders = NormalFormService.defaultHeadersKarnaughMap
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
