import NormalFormService from "./normalForm/normalForm.service"
import NormalFormFormater from "./normalForm/normalForm.formater"
import LatexFormater from "./latex/latex.formater"
import { DefaultArg } from "./normalForm/normalForm.interfaces"

const args = [ "x", "y", "z" ]
const arg: DefaultArg = index => args[index - 1]
const array1 = [0, 1, 2, 3, 4, 5]

const dnf = NormalFormService.mnf(3, array1)
const cnf = NormalFormService.mnf(3, NormalFormService.exclude(3, array1))
const map1 = NormalFormService.karnaughMap(3, array1)

console.log(`
  ${LatexFormater.basic.noIndent}
  ${LatexFormater.math.area(NormalFormFormater.nf("dis", 3, dnf.pnf, { arg }))} ${LatexFormater.basic.braakLine}
  ${LatexFormater.basic.noIndent}
  ${LatexFormater.math.area(NormalFormFormater.selections("dis", dnf.selections, { arg }))} ${LatexFormater.basic.braakLine}
  ${LatexFormater.basic.noIndent}
  ${NormalFormFormater.quineTable("dis", dnf, { arg, isSets: false })} ${LatexFormater.basic.braakLine}
  ${LatexFormater.basic.noIndent}
  ${LatexFormater.math.area(NormalFormFormater.nf("dis", 3, dnf.result, { arg }))}
`)

console.log(`
  ${LatexFormater.basic.noIndent}
  ${LatexFormater.math.area(NormalFormFormater.nf("con", 3, cnf.pnf, { arg }))} ${LatexFormater.basic.braakLine}
  ${LatexFormater.basic.noIndent}
  ${LatexFormater.math.area(NormalFormFormater.selections("con", cnf.selections, { arg }))} ${LatexFormater.basic.braakLine}
  ${LatexFormater.basic.noIndent}
  ${NormalFormFormater.quineTable("con", cnf, { arg, isSets: false })} ${LatexFormater.basic.braakLine}
  ${LatexFormater.basic.noIndent}
  ${LatexFormater.math.area(NormalFormFormater.nf("con", 3, cnf.result, { arg }))}
`)

console.log(`
  ${LatexFormater.basic.noIndent}
  ${LatexFormater.math.area(NormalFormFormater.nf("dis", 3, dnf.pnf, { arg }))} ${LatexFormater.basic.braakLine}
  ${LatexFormater.basic.noIndent}
  ${NormalFormFormater.karnaughMap(map1, dnf, { arg })} ${LatexFormater.basic.braakLine}
  ${LatexFormater.basic.noIndent}
  ${LatexFormater.math.area(NormalFormFormater.nf("dis", 3, dnf.result, { arg }))}
`)
