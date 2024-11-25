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
export declare class LatexNormalForm {
  static dot: string
  static or: string
  static times: string
  static defaultFunc: string
  static defaultArg: string
  static defaultTableNfOptions: {
    isSets: boolean
    arg: string
    char: string
    showZeroSelection: boolean
    showUsedImplicants: boolean
    core: {
      color: string
      opacity: number
    }
  }
  static math: (str: string) => string
  static index: (str: string, i: number) => string
  static overline: (str: string) => string
  static signature: (count: number, fn?: string, arg?: string) => string
  static implicant: (type: TypeNF, set: ISet, arg?: string) => string
  static nf: (
    type: TypeNF,
    count: number,
    sets: Array<ISet>,
    fn?: string,
    arg?: string
  ) => string
  static selections: (
    type: TypeNF,
    selections: Array<ISelection>,
    arg?: string
  ) => string
  static tableNf: (
    type: TypeNF,
    mnf: ReturnType<typeof NormalForm.mnf>,
    options?: Partial<typeof LatexNormalForm.defaultTableNfOptions>
  ) => string
}
export declare class NormalForm {
  static decToBin: (dec: number, minLength: number) => Array<0 | 1>
  static exclude: (count: number, sets: Array<number>) => number[]
  static compareImplicants: (imp1: ISet, imp2: ISet) => boolean
  static mergeImplicants: (imp1: ISet, imp2: ISet) => ISet | undefined
  static pnf: (
    count: number,
    sets: Array<number>
  ) => {
    value: 0 | 1
    index: number
  }[][]
  static mnf: (
    count: number,
    sets: Array<number>
  ) => {
    result: ISet[]
    selections: ISelection[]
    pnf: {
      value: 0 | 1
      index: number
    }[][]
    sets: number[]
  }
}
