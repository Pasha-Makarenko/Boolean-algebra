import { LatexNormalForm, NormalForm } from "./normalForm"

const array = [1, 3, 5, 7, 8, 9, 10, 12, 13, 15]
const cnf = NormalForm.mnf(4, array)
const dnf = NormalForm.mnf(4, NormalForm.exclude(4, array))

console.log(LatexNormalForm.nf("dis", 4, dnf.pnf))
console.log(LatexNormalForm.selections("dis", dnf.selections))
console.log(LatexNormalForm.tableNf("dis", dnf, { showUsedImplicants: true }))
console.log(LatexNormalForm.nf("dis", 4, dnf.result))
console.log(LatexNormalForm.nf("con", 4, cnf.pnf))
console.log(LatexNormalForm.selections("con", cnf.selections))
console.log(LatexNormalForm.tableNf("con", cnf, { showUsedImplicants: true }))
console.log(LatexNormalForm.nf("con", 4, cnf.result))
