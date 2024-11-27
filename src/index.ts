import NormalFormService from "./normalForm/normalForm.service"
import NormalFormFormater from "./normalForm/normalForm.formater"
import LatexFormater from "./latex/latex.formater"

const array = [1, 3, 5, 7, 8, 9, 10, 12, 13, 15]
const map = NormalFormService.karnaughMap(
  4,
  NormalFormService.exclude(4, array),
  NormalFormService.defaultHeadersKarnaughMap
)
const cnf = NormalFormService.mnf(4, array)
const dnf = NormalFormService.mnf(4, NormalFormService.exclude(4, array))

console.log(LatexFormater.math.area(NormalFormFormater.nf("dis", 4, dnf.pnf)))
console.log(LatexFormater.math.area(NormalFormFormater.nf("con", 4, cnf.pnf)))

console.log(
  LatexFormater.math.area(NormalFormFormater.selections("dis", dnf.selections))
)
console.log(
  LatexFormater.math.area(NormalFormFormater.selections("con", cnf.selections))
)

console.log(NormalFormFormater.quineTable("dis", dnf))
console.log(NormalFormFormater.quineTable("con", cnf))

console.log(NormalFormFormater.karnaughMap(map, dnf))
console.log(NormalFormFormater.karnaughMap(map, cnf))
