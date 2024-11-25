import { LatexNormalForm, NormalForm } from "./normalForm"

const array = [1, 3, 5, 7, 8, 9, 10, 12, 13, 15]
const cnf = NormalForm.mnf(4, array)
const dnf = NormalForm.mnf(4, NormalForm.exclude(4, array))

// ДДНФ і ДКНФ
console.log(LatexNormalForm.math(LatexNormalForm.nf("dis", 4, dnf.pnf)))
console.log(LatexNormalForm.math(LatexNormalForm.nf("con", 4, cnf.pnf)))

// МДНФ і МКНФ
console.log(LatexNormalForm.math(LatexNormalForm.nf("dis", 4, dnf.result)))
console.log(LatexNormalForm.math(LatexNormalForm.nf("con", 4, cnf.result)))

// Етапи склнювання
console.log(
  LatexNormalForm.math(LatexNormalForm.selections("dis", dnf.selections))
)
console.log(
  LatexNormalForm.math(LatexNormalForm.selections("con", cnf.selections))
)

// Таблиці методом Квайна
console.log(LatexNormalForm.math(LatexNormalForm.tableNf("dis", dnf)))
console.log(LatexNormalForm.math(LatexNormalForm.tableNf("con", cnf)))
