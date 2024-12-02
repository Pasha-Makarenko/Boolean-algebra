import { Colors, Lengths, Thickness } from "../latex/latex.interfaces"

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
export interface IHeaders {
  rows: Array<Array<number>>
  columns: Array<Array<number>>
}
export type INormalForm = Array<ISet>

export type TypeNF = "dis" | "con"
export type DefaultArg = (index: number) => string
export interface DefaultNormalFormOptions {
  arg: DefaultArg
  fn: string
}
export interface DefaultSelectionsOptions {
  arg: DefaultArg
}
export interface DefaultQuineTableOptions {
  isSets: boolean
  arg: DefaultArg
  char: string
  showZeroSelection: boolean
  showUsedImplicants: boolean
  core: {
    color: Colors
    opacity: number
  }
}
export interface DefaultKarnaughMapOptions {
  arg: DefaultArg
  line: {
    offset: number
    padding: number
  }
  area: {
    colors: Array<Colors>
    padding: number
    borderRadius: `${number}${Lengths}`
    thickness: Thickness
  }
}