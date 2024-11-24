export type TypeNF = "dis" | "con"

export type ISet = Array<{
  value: number
  index: number
}>

export type ISelection = Array<{
  set: ISet
  indexes: Array<number>
  used: boolean
  isCore: boolean
}>

export class LatexNormalForm {
  static dot = "\\cdotp"
  static or = "\\vee"
  static times = "\\times"
  static defaultFunc = "f"
  static defaultArg = "x"
  static defaultTableNfOptions = {
    isSets: true,
    arg: LatexNormalForm.defaultArg,
    char: LatexNormalForm.times,
    showZeroSelection: false,
    showUsedImplicants: false,
    core: {
      color: "gray",
      opacity: 0.8
    }
  }

  static math = (str: string) => `\\begin{math}\n${str}\n\\end{math}`

  static index = (str: string, i: number) => `${str}\_{${i}}`

  static overline = (str: string) => `\\overline{${str}}`

  static signature = (
    count: number,
    fn = LatexNormalForm.defaultFunc,
    arg = LatexNormalForm.defaultArg
  ) =>
    `${fn}(${new Array(count)
      .fill(null)
      .map((_, i) => LatexNormalForm.index(arg, i + 1))}) = `

  static implicant = (
    type: TypeNF,
    set: ISet,
    arg = LatexNormalForm.defaultArg
  ) =>
    set
      .map(({ value, index }) =>
        value
          ? type === "dis"
            ? LatexNormalForm.index(arg, index)
            : LatexNormalForm.overline(LatexNormalForm.index(arg, index))
          : type === "dis"
            ? LatexNormalForm.overline(LatexNormalForm.index(arg, index))
            : LatexNormalForm.index(arg, index)
      )
      .join((type === "dis" ? LatexNormalForm.dot : LatexNormalForm.or) + " ")

  static nf = (
    type: TypeNF,
    count: number,
    sets: Array<ISet>,
    fn = LatexNormalForm.defaultFunc,
    arg = LatexNormalForm.defaultArg
  ) =>
    LatexNormalForm.signature(count, fn, arg) +
    sets
      .map(set =>
        type === "dis"
          ? LatexNormalForm.implicant(type, set, arg)
          : `(${LatexNormalForm.implicant(type, set, arg)})`
      )
      .join(type === "dis" ? LatexNormalForm.or + " " : "")

  static selections = (
    type: TypeNF,
    selections: Array<ISelection>,
    arg = LatexNormalForm.defaultArg
  ) =>
    `
    ${selections
      .filter((_, i) => i !== 0)
      .flat()
      .map(
        imp => `
      (${imp.indexes.map(i => i + 1).join(", ")}): ${LatexNormalForm.implicant(type, imp.set, arg)} \\\\`
      )
      .join("")
      .trim()}
    `.trim()

  static tableNf = (
    type: TypeNF,
    mnf: ReturnType<typeof NormalForm.mnf>,
    options?: Partial<typeof LatexNormalForm.defaultTableNfOptions>
  ) =>
    `
    \\begin{tabular}{|${new Array(mnf.sets.length + 1).fill("c").join("|")}|}
    \\hline
    & ${
      options?.hasOwnProperty("isSets")
        ? options.isSets
        : LatexNormalForm.defaultTableNfOptions.isSets
          ? mnf.sets.map(set => `$${set}$`).join(" & ")
          : mnf.pnf
              .map(
                set =>
                  `$${LatexNormalForm.implicant(type, set, options?.arg || LatexNormalForm.defaultArg)}$`
              )
              .join(" & ")
    } \\\\
    \\hline
    ${mnf.selections
      .map((selection, i) =>
        (
          options?.hasOwnProperty("showZeroSelection")
            ? options.showZeroSelection
            : LatexNormalForm.defaultTableNfOptions.showZeroSelection
        )
          ? selection
          : i === 0
            ? selection.filter(imp => !imp.used)
            : selection
      )
      .flat()
      .filter(imp =>
        (
          options?.hasOwnProperty("showUsedImplicants")
            ? options?.showUsedImplicants
            : LatexNormalForm.defaultTableNfOptions.showUsedImplicants
        )
          ? true
          : !imp.used
      )
      .map(
        imp => `
      ${imp.isCore ? `\\rowcolor[${options?.core?.color || LatexNormalForm.defaultTableNfOptions.core.color}]{${options?.core?.opacity || LatexNormalForm.defaultTableNfOptions.core.opacity}} ` : ""}
      $${LatexNormalForm.implicant(type, imp.set, options?.arg || LatexNormalForm.defaultArg)}$ 
      &${new Array(mnf.pnf.length)
        .fill("")
        .map((_, i) =>
          imp.indexes.includes(i)
            ? ` ${options?.char || LatexNormalForm.times} `
            : " "
        )
        .join("&")}\\\\
      `
      )
      .join(" \\hline ")
      .trim()}
    \\hline
    \\end{tabular}
    `.trim()
}

export class NormalForm {
  static decToBin = (dec: number, minLength: number) =>
    new Array(minLength - (dec ? Math.floor(Math.log2(dec)) : 0) - 1)
      .fill(0)
      .concat(dec.toString(2).split("").map(Number)) as Array<0 | 1>

  static exclude = (count: number, sets: Array<number>) =>
    new Array(2 ** count)
      .fill(null)
      .map((_, i) => i)
      .filter(set => !sets.includes(set))

  static compareImplicants = (imp1: ISet, imp2: ISet) =>
    imp1.length === imp2.length
      ? !imp1.some(
          (digit, index) =>
            digit.value !== imp2[index].value ||
            digit.index !== imp2[index].index
        )
      : false

  static mergeImplicants = (imp1: ISet, imp2: ISet) => {
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

  static pnf = (count: number, sets: Array<number>) =>
    sets.map(set =>
      NormalForm.decToBin(set, count).map((digit, index) => ({
        value: digit,
        index: index + 1
      }))
    )

  static mnf = (count: number, sets: Array<number>) => {
    const pnf = NormalForm.pnf(count, sets)
    const selections: Array<ISelection> = [
      pnf.map((set, i) => ({
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
          const merge = NormalForm.mergeImplicants(imp1.set, imp2.set)

          if (
            merge &&
            !selections[selection].find(imp =>
              NormalForm.compareImplicants(imp.set, merge)
            )
          ) {
            const indexes = imp1.indexes
              .concat(imp2.indexes)
              .filter((el, i, array) => i === array.indexOf(el))
              .sort((a, b) => a - b)

            selections[selection].push({
              set: merge,
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
      .sort((a, b) => b[1] - a[1])

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
      pnf,
      sets
    }
  }
}
