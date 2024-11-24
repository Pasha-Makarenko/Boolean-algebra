# Булева алгебра

---

## Використання

* Клонуємо репозиторій в локальну теку
```bash
git clone https://github.com/Pasha-Makarenko/Boolean-algebra.git
```
* Завантажуємо [Node.js](https://nodejs.org/en)
* В головному файлі `index.ts` в теці `src` використовуємо методи з імпортованих класів
* В консолі пишемо команди:
```bash
npm install
npm run build
npm run start
```

Перед використанням програми створіть файл `.tex` з таким макетом:
```tex
\documentclass{article}
\usepackage[left=2.5cm,right=1.5cm,top=2cm,bottom=2cm,bindingoffset=0cm]{geometry} % поля
\usepackage{type1ec}
\usepackage[T1,X2,T2A]{fontenc} 
\usepackage[utf8]{inputenc}
\usepackage[english,ukrainian]{babel} 
\usepackage{colortbl} % фарбування рядків таблиці
\pagestyle{empty} % скасування нумерації сторінок

\begin{document}
% контент документу
\end{document}
```

Якщо у вас є математичний вираз, то його слід записати ось так:

```tex
\begin{math}
% вираз
\end{math}
```

---

## Диз'юнктивна та кон'юнктивна нормальні форми

Для перетворення булевих функцій в нормальні форми в головному файлі `index.ts` імпортуємо два класи із файлу `normalForm.ts`

`index.ts`:
```ts
import { LatexNormalForm, NormalForm } from "./normalForm"
```

`NormalForm` - клас, який містить алгоритми обчислення \
`LatexNormalForm` - клас, який перетворює об'єкти та масиви в код `Latex`, який можна використати в файлі `.tex`, а потім конвертувати в `pdf` документ.

### ДДНФ та ДКНФ

Клас `NormalForm` мыстить метод `pnf` (Perfect Normal Form), який повертає масив імплікант. 
Аргументами приймає два параметри: кількість змінних функцій і масив наборів. 
Бо цей метод фактично повертає набори у двійковій системі числення, то не важливо буде це ДНФ чи КНФ.

Уявимо ситуацію, задана функція `f(x1, x2, x3, x4) = 0` на наборах `1, 3, 5, 7, 8, 9, 10, 12, 13, 15`.
Тоді для знаходження ДКНФ ми в коді напишемо:

```ts
const array = [1, 3, 5, 7, 8, 9, 10, 12, 13, 15]
const cnf = NormalForm.pnf(4, array)
```

Але якщо ми хочемо знайти ДДНФ, то в метод `pnf` ми повинні передати ті набори, яких немає в `array`. 
Звісно їх можна вводити вручну, але для зручності у класі `NormalForm` є метод `exclude`, який інвертує масив наборів.
Цей метод приймає два параметри: кількість змінних та масив наборів, який ми інвертуємо.
Тоді при заданій умові задачі вище ДДНФ знайдеться так:

```ts
const array = [1, 3, 5, 7, 8, 9, 10, 12, 13, 15]
const dnf = NormalForm.pnf(4, NormalForm.exclude(4, array))
```

Ці два методи хоч і повертають шукані нормальні форми, але у вигляді масивів. Щоб отримати код `Latex` використаємо клас `LatexNormalForm`.
Використаємо метод `nf` який створить нормальну форму. Цей метод приймає три обов'язкових параметри: тип нормальної форми: `"con"` - для КНФ `"dis"`- для ДНФ, кількість змінних та власне саму нормальну форму. 
Також у нього є необов'язкові параметри, це назва функції та назва змінної. \
Використання цього методу і результат виведемо в консоль:

```ts
const array = [1, 3, 5, 7, 8, 9, 10, 12, 13, 15]
const cnf = NormalForm.pnf(4, array)
const dnf = NormalForm.pnf(4, NormalForm.exclude(4, array))

console.log(LatexNormalForm.nf("dis", 4, dnf))
console.log(LatexNormalForm.nf("con", 4, cnf))
```

Тепер в консолі виведеться результат, який можна скопіювати й використати.
Але при використанні цього результату в файлі `.tex` слід використати відповідну команду, яка була описана у пункті "Використання".
Для цього у класі `LatexNormalForm` є метод `math`, який приймає параметром строку і повертає строку обернуту в `\begin{math} ... \end{math}`.
Використання цього методу:

```ts
const array = [1, 3, 5, 7, 8, 9, 10, 12, 13, 15]
const cnf = NormalForm.pnf(4, array)
const dnf = NormalForm.pnf(4, NormalForm.exclude(4, array))

console.log(LatexNormalForm.math(LatexNormalForm.nf("dis", 4, dnf)))
console.log(LatexNormalForm.math(LatexNormalForm.nf("con", 4, cnf)))
```

### МКНФ та МДНФ

Алгоритм пошуку МНФ це метод Квайна. Так, як і з `pnf` класом `NormalForm` містить метод `mnf` і по аналогії ми можемо вивести мінімальні нормальні форми:

```ts
const array = [1, 3, 5, 7, 8, 9, 10, 12, 13, 15]
const cnf = NormalForm.mnf(4, array)
const dnf = NormalForm.mnf(4, NormalForm.exclude(4, array))

console.log(LatexNormalForm.nf("dis", 4, dnf.result))
console.log(LatexNormalForm.nf("con", 4, cnf.result))
```

На відмінність від `pnf`, метод `mnf` повертає об'єкт:

```ts
{
  result, // власне сама мінімальна нормальна форма. Як раз це поле було використано у коді вище
  selections, // етапи склеювання
  pnf, // досконала нормальна форма, яка була як допоміжна
  sets // використані набори, що нас не цікавлять
}
```

Якщо ми хочемо вивести етапи склеювання, то використаємо метод `selections` із класу `LatexNormalForm`.
Цей метод приймає два обов'язкових параметри: тип нормальної форми: `"con"` - для КНФ `"dis"`- для ДНФ, та етапи склеювання.
Також у нього є необов'язковий параметр, це назва змінної. 

```ts
const array = [1, 3, 5, 7, 8, 9, 10, 12, 13, 15]
const cnf = NormalForm.mnf(4, array)
const dnf = NormalForm.mnf(4, NormalForm.exclude(4, array))

console.log(LatexNormalForm.selections("dis", dnf.selections))
console.log(LatexNormalForm.selections("con", cnf.selections))
```

Бо це метод Квайна, то нам також необхідна таблиця. Для цього клас `LatexNormalForm` містить метод `tableNf`.
Цей метод приймає два обов'язкових параметри: тип нормальної форми: `"con"` - для КНФ `"dis"`- для ДНФ та мінімальну форму (зверніть увагу, не тільки поле `result`, а весь об'єкт).
Також цей метод приймає один необов'язковий параметр: це об'єкт налаштувань:

```ts
{
  isSets: boolean, // за замовченням true. Якщо це поле true, 
    // то в верхньому рчдку імпліканти будуть записані у вигляді номерів 
    // (це потрібно для зменшення розміру таблиці)
  arg: string, // назва аргументу
  char: string, // символ "хрестика"
  showZeroSelection: boolean, // за замовченням false, відображає усі імпліканти з дозконалої нормальної форми
  showUsedImplicants: boolean, // за замовченням false, відображає усі використані імпліканти, 
    // тобто ті, що були використані при склеюванні
  core: { // налаштування рядків імплікант, які йдуть у ядро (тобто у результуючий запис МНФ)
    color: string, // за замовченням "gray", // колір заливки комірок
    opacity: number // за замовченням 0.8, // прозорість заливки від 0 до 1, 
    // де 0 - абсолютно прозора, 1 - абсолютно непрозора
  }
}
```

Власне отримання таблиці:

```ts
const array = [1, 3, 5, 7, 8, 9, 10, 12, 13, 15]
const cnf = NormalForm.mnf(4, array)
const dnf = NormalForm.mnf(4, NormalForm.exclude(4, array))

console.log(LatexNormalForm.tableNf("dis", dnf))
console.log(LatexNormalForm.tableNf("con", cnf))
```
