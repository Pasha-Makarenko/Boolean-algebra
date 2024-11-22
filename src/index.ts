import { LatexNormalForm, NormalForm } from "./normalForm"

const array = [1, 3, 5, 7, 8, 9, 10, 12, 13, 15]
const cnf = NormalForm.mnf(4, array)
const dnf = NormalForm.mnf(4, NormalForm.exclude(4, array))

console.log(LatexNormalForm.tableNf("dis", dnf))
console.log(LatexNormalForm.tableNf("con", cnf))
