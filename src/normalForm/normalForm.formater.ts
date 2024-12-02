import LatexFormater from "../latex/latex.formater"
import {
  DefaultArg,
  DefaultKarnaughMapOptions,
  DefaultNormalFormOptions,
  DefaultQuineTableOptions,
  DefaultSelectionsOptions,
  ISelection,
  ISet,
  TypeNF
} from "./normalForm.interfaces"
import NormalFormService from "./normalForm.service"
import { CornerDirection, SemiRectDirection } from "../latex/latex.interfaces"

export default class NormalFormFormater {
  static defaultFunc = "f"
  static defaultArg: DefaultArg = index => LatexFormater.math.index("x", index)
  static defaultNormalFormOptions: DefaultNormalFormOptions = {
    arg: NormalFormFormater.defaultArg,
    fn: NormalFormFormater.defaultFunc
  }
  static defaultSelectionsOptions: DefaultSelectionsOptions = {
    arg: NormalFormFormater.defaultArg
  }
  static defaultQuineTableOptions: DefaultQuineTableOptions = {
    isSets: true,
    arg: NormalFormFormater.defaultArg,
    char: LatexFormater.math.times,
    showZeroSelection: false,
    showUsedImplicants: false,
    core: {
      color: LatexFormater.colors.data.gray,
      opacity: 0.8
    }
  }
  static defaultKarnaughMapOptions: DefaultKarnaughMapOptions = {
    arg: NormalFormFormater.defaultArg,
    line: {
      offset: 0.2,
      padding: 0.2
    },
    area: {
      colors: [
        LatexFormater.colors.data.red,
        LatexFormater.colors.data.blue,
        LatexFormater.colors.data.magenta,
        LatexFormater.colors.data.orange,
        LatexFormater.colors.data.cyan,
        LatexFormater.colors.data.yellow,
        LatexFormater.colors.data.green
      ],
      padding: 0.2,
      borderRadius: "5pt",
      thickness: LatexFormater.tikz.thickness.thick
    }
  }

  /*
  * Format the signature of a normal form function
  * @param {number} count - Count of arguments
  * @param {string} fn - Function name
  * @param {DefaultArg} arg - Argument formatter
  * @returns {string} - Signature of a normal form function
  * */
  static signature = (
    count: number,
    fn = NormalFormFormater.defaultFunc,
    arg = NormalFormFormater.defaultArg
  ) => {
    let result = fn + "("

    for (let i = 0; i < count; i++) {
      result += arg(i + 1)

      if (i !== count - 1) {
        result += ", "
      }
    }

    result += ") = "

    return result
  }

  /*
  * Format an implicant
  * @param {TypeNF} type - Type of normal form
  * @param {ISet} set - Implicant
  * @param {DefaultArg} arg - Argument formatter
  * @returns {string} - Formatted implicant
  * */
  static implicant = (
    type: TypeNF,
    set: ISet,
    arg = NormalFormFormater.defaultArg
  ) => {
    let result = ""

    for (let i = 0; i < set.length; i++) {
      result += set[i].value
        ? type === "dis"
          ? arg(set[i].index)
          : LatexFormater.math.overline(
              arg(set[i].index)
            )
        : type === "dis"
          ? LatexFormater.math.overline(
              arg(set[i].index)
            )
          : arg(set[i].index)

      if (i !== set.length - 1) {
        result +=
          type === "dis"
            ? LatexFormater.math.dot + " "
            : LatexFormater.math.or + " "
      }
    }

    return result
  }

  /*
  * Format a normal form
  * @param {TypeNF} type - Type of normal form
  * @param {number} count - Count of arguments
  * @param {Array<ISet>} sets - List of implicants
  * @param {Partial<DefaultNormalFormOptions>} options - Options
  * @returns {string} - Formatted normal form
  * */
  static nf = (
    type: TypeNF,
    count: number,
    sets: Array<ISet>,
    options = NormalFormFormater.defaultNormalFormOptions
  ) => {
    let result = NormalFormFormater.signature(
      count,
      options?.fn || NormalFormFormater.defaultNormalFormOptions.fn,
      options?.arg || NormalFormFormater.defaultNormalFormOptions.arg
    )

    for (let i = 0; i < sets.length; i++) {
      result +=
        type === "dis" || sets[i].length === 1
          ? NormalFormFormater.implicant(type, sets[i], options?.arg || NormalFormFormater.defaultNormalFormOptions.arg)
          : `(${NormalFormFormater.implicant(type, sets[i], options?.arg || NormalFormFormater.defaultNormalFormOptions.arg)})`

      if (i !== sets.length - 1) {
        result += type === "dis" ? LatexFormater.math.or + "\n" : "\n"
      }
    }

    return result
  }

  /*
  * Fprmat a list of selections
  * @param {TypeNF} type - Type of normal form
  * @param {Array<ISelection>} selections - List of selections
  * @param {Partial<DefaultSelectionsOptions>} options - Options
  * @returns {string} - Formatted selections
  * */
  static selections = (
    type: TypeNF,
    selections: Array<ISelection>,
    options: Partial<DefaultSelectionsOptions> = NormalFormFormater.defaultSelectionsOptions
  ) => {
    let result = ""

    for (let selection = 1; selection < selections.length; selection++) {
      for (
        let implicant = 0;
        implicant < selections[selection].length;
        implicant++
      ) {
        const imp = selections[selection][implicant]
        result += `(${imp.indexes.map(i => i + 1).join(", ")}): ${NormalFormFormater.implicant(type, imp.set, options?.arg || NormalFormFormater.defaultSelectionsOptions.arg)} ${LatexFormater.basic.braakLine}`

        if (
          implicant !== selections[selection].length - 1 &&
          selection !== selections.length - 1
        ) {
          result += "\n"
        }
      }
    }

    return result
  }

  /*
  * Format a Quine table
  * @param {TypeNF} type - Type of normal form
  * @param {{ result: INormalForm, pnf: INormalForm, selection: Array<Iselection>, sets: Array<number> }} mnf - Minimal normal form
  * @param {Partial<DefaultQuineTableOptions>} options - Options
  * @returns {string} - Formatted Quine table
  * */
  static quineTable = (
    type: TypeNF,
    mnf: ReturnType<typeof NormalFormService.mnf>,
    options: Partial<DefaultQuineTableOptions> = NormalFormFormater.defaultQuineTableOptions
  ) => {
    let sets = LatexFormater.tabular.separator + " "

    if (
      options?.hasOwnProperty("isSets")
        ? options.isSets
        : NormalFormFormater.defaultQuineTableOptions.isSets
    ) {
      for (let i = 0; i < mnf.sets.length; i++) {
        sets += LatexFormater.math.brackets(mnf.sets[i])

        if (i !== mnf.sets.length - 1) {
          sets += " " + LatexFormater.tabular.separator + " "
        }
      }
    } else {
      for (let i = 0; i < mnf.pnf.length; i++) {
        sets += LatexFormater.math.brackets(
          NormalFormFormater.implicant(
            type,
            mnf.pnf[i],
            options?.arg || NormalFormFormater.defaultQuineTableOptions.arg
          )
        )

        if (i !== mnf.pnf.length - 1) {
          sets += " " + LatexFormater.tabular.separator + " "
        }
      }
    }

    sets += " " + LatexFormater.basic.braakLine

    let selections = ""

    for (let selection = 0; selection < mnf.selections.length; selection++) {
      for (
        let implicant = 0;
        implicant < mnf.selections[selection].length;
        implicant++
      ) {
        const imp = mnf.selections[selection][implicant]

        if (
          selection === 0 &&
          !(options?.hasOwnProperty("showZeroSelection")
            ? options.showZeroSelection
            : NormalFormFormater.defaultQuineTableOptions.showZeroSelection) &&
          imp.used
        ) {
          continue
        }

        if (
          !(options?.hasOwnProperty("showUsedImplicants")
            ? options.showUsedImplicants
            : NormalFormFormater.defaultQuineTableOptions.showUsedImplicants) &&
          imp.used
        ) {
          continue
        }

        if (imp.isCore) {
          selections +=
            LatexFormater.tabular.rowColor(
              options?.core?.color ||
                NormalFormFormater.defaultQuineTableOptions.core.color,
              options?.core?.opacity ||
                NormalFormFormater.defaultQuineTableOptions.core.opacity
            ) + "\n"
        }

        selections +=
          LatexFormater.math.brackets(
            NormalFormFormater.implicant(
              type,
              imp.set,
              options?.arg || NormalFormFormater.defaultQuineTableOptions.arg
            )
          ) + LatexFormater.tabular.separator

        for (let i = 0; i < mnf.pnf.length; i++) {
          selections += imp.indexes.includes(i)
            ? " " +
              LatexFormater.math.brackets(
                options?.char ||
                  NormalFormFormater.defaultQuineTableOptions.char
              )
            : " "

          if (i !== mnf.pnf.length - 1) {
            selections += LatexFormater.tabular.separator
          } else {
            selections += LatexFormater.basic.braakLine + "\n"
            selections += LatexFormater.tabular.horizontalLine + "\n"
          }
        }
      }
    }

    return LatexFormater.tabular.table(
      new Array(mnf.sets.length + 1)
        .fill(LatexFormater.tabular.layout.column)
        .join(LatexFormater.tabular.layout.separator),
      `
      ${LatexFormater.tabular.horizontalLine}
      ${sets}
      ${LatexFormater.tabular.horizontalLine}
      ${selections}
      `.trim()
    )
  }

  /*
  * Format a Karnaugh map
  * @param {{ result: Array<Array<Digits>>, headers: IHeaders }} map - Karnaugh map
  * @param {{ result: INormalForm, pnf: INormalForm, selection: Array<Iselection>, sets: Array<number> }} mnf - Minimal normal form
  * @param {Partial<DefaultKarnaughMapOptions>} options - Options
  * @returns {string} - Formatted Karnaugh map
  * */
  static karnaughMap = (
    map: ReturnType<typeof NormalFormService.karnaughMap>,
    mnf: ReturnType<typeof NormalFormService.mnf>,
    options: Partial<DefaultKarnaughMapOptions> = NormalFormFormater.defaultKarnaughMapOptions
  ) => {
    let digits = ""

    for (let row = 0; row < map.result.length; row++) {
      for (let column = 0; column < map.result[row].length; column++) {
        digits +=
          LatexFormater.tikz.node(
            column + 0.5,
            map.result.length - row - 0.5,
            map.result[row][column]
          ) + "\n"
      }
    }

    const rowIndexes: Array<{ index: number; columns: Array<number> }> = []

    for (let i = 0; i < map.headers.rows.length; i++) {
      for (let j = 0; j < map.headers.rows[i].length; j++) {
        const index = map.headers.rows[i][j]

        if (!rowIndexes.map(item => item.index).includes(index)) {
          rowIndexes.push({
            index,
            columns: [i]
          })
        } else {
          rowIndexes.find(el => el.index === index)?.columns.push(i)
        }
      }
    }

    let rowHeaders = ""

    for (let i = 0; i < rowIndexes.length; i++) {
      const argCoords = {
        x: i % 2 === 1 ? map.result.length + 0.5 : -0.5,
        y:
          map.result.length -
          (rowIndexes[i].columns[0] +
            (rowIndexes[i].columns[rowIndexes[i].columns.length - 1] -
              rowIndexes[i].columns[0] +
              1) /
              2)
      }

      rowHeaders +=
        LatexFormater.tikz.node(
          argCoords.x,
          argCoords.y,
          LatexFormater.math.brackets(
            options?.arg
              ? options.arg(rowIndexes[i].index)
              : NormalFormFormater.defaultKarnaughMapOptions.arg(rowIndexes[i].index)
          )
        ) + "\n"

      const linesX =
        i % 2 === 1
          ? map.result.length +
            (options?.line?.offset ||
              NormalFormFormater.defaultKarnaughMapOptions.line.offset)
          : -(
              options?.line?.offset ||
              NormalFormFormater.defaultKarnaughMapOptions.line.offset
            )

      const columns = rowIndexes[i].columns

      for (let j = 0; j < columns.length - 1; j++) {
        if (j !== columns.length - 1 && columns[j] + 1 === columns[j + 1]) {
          rowHeaders +=
            LatexFormater.tikz.drawLine(
              linesX,
              map.result.length -
                (columns[j] +
                  (options?.line?.padding ||
                    NormalFormFormater.defaultKarnaughMapOptions.line.padding)),
              linesX,
              map.result.length -
                (columns[j + 1] -
                  (options?.line?.padding ||
                    NormalFormFormater.defaultKarnaughMapOptions.line.padding) +
                  1)
            ) + "\n"
        }
      }
    }

    const columnIndexes: Array<{ index: number; rows: Array<number> }> = []

    for (let i = 0; i < map.headers.columns.length; i++) {
      for (let j = 0; j < map.headers.columns[i].length; j++) {
        const index = map.headers.columns[i][j]

        if (!columnIndexes.map(item => item.index).includes(index)) {
          columnIndexes.push({
            index,
            rows: [i]
          })
        } else {
          columnIndexes.find(el => el.index === index)?.rows.push(i)
        }
      }
    }

    let columnHeaders = ""

    for (let i = 0; i < columnIndexes.length; i++) {
      const argCoords = {
        x:
          columnIndexes[i].rows[0] +
          (columnIndexes[i].rows[columnIndexes[i].rows.length - 1] -
            columnIndexes[i].rows[0] +
            1) /
            2,
        y: i % 2 === 1 ? -0.5 : map.result.length + 0.5
      }

      columnHeaders +=
        LatexFormater.tikz.node(
          argCoords.x,
          argCoords.y,
          LatexFormater.math.brackets(
            options?.arg
              ? options.arg(columnIndexes[i].index)
              : NormalFormFormater.defaultKarnaughMapOptions.arg(columnIndexes[i].index)
          )
        ) + "\n"

      const linesY = i % 2 === 1 ? -0.2 : map.result.length + 0.2

      const rows = columnIndexes[i].rows

      for (let j = 0; j < rows.length - 1; j++) {
        if (j !== rows.length - 1 && rows[j] + 1 === rows[j + 1]) {
          columnHeaders +=
            LatexFormater.tikz.drawLine(
              rows[j] + 0.2,
              linesY,
              rows[j + 1] - 0.2 + 1,
              linesY
            ) + "\n"
        }
      }
    }

    let areas = ""

    for (let i = 0; i < mnf.result.length; i++) {
      const set = mnf.result[i]

      const potentialRows: Array<{ index: number; rows: Array<number> }> = []
      const potentialColumns: Array<{ index: number; columns: Array<number> }> =
        []

      for (let j = 0; j < set.length; j++) {
        const { index, value } = set[j]
        const row = rowIndexes.find(el => el.index === index)
        const column = columnIndexes.find(el => el.index === index)

        if (row) {
          potentialRows.push({
            index,
            rows: value
              ? row.columns
              : NormalFormService.exclude(rowIndexes.length, row.columns)
          })
        }

        if (column) {
          potentialColumns.push({
            index,
            columns: value
              ? column.rows
              : NormalFormService.exclude(columnIndexes.length, column.rows)
          })
        }
      }

      let rows = new Array(map.result.length).fill(0).map((_, i) => i)

      for (let row = 0; row < potentialRows.length; row++) {
        rows = rows.filter(el => potentialRows[row].rows.includes(el))
      }

      let columns = new Array(map.result.length).fill(0).map((_, i) => i)

      for (let column = 0; column < potentialColumns.length; column++) {
        columns = columns.filter(el =>
          potentialColumns[column].columns.includes(el)
        )
      }

      const areaRows: Array<Array<number>> = [[]]

      for (let row = 0; row < rows.length; row++) {
        areaRows[areaRows.length - 1].push(rows[row])

        if (row !== rows.length - 1 && rows[row + 1] - rows[row] !== 1) {
          areaRows.push([])
        }
      }

      const areaColumns: Array<Array<number>> = [[]]

      for (let column = 0; column < columns.length; column++) {
        areaColumns[areaColumns.length - 1].push(columns[column])

        if (
          column !== columns.length - 1 &&
          columns[column + 1] - columns[column] !== 1
        ) {
          areaColumns.push([])
        }
      }

      for (let vert = 0; vert < areaRows.length; vert++) {
        for (let hor = 0; hor < areaColumns.length; hor++) {
          const areaOptions = [
            `rounded corners=${options?.area?.borderRadius || NormalFormFormater.defaultKarnaughMapOptions.area.borderRadius}`,
            options?.area?.thickness ||
              NormalFormFormater.defaultKarnaughMapOptions.area.thickness,
            options?.area?.colors[i % options?.area?.colors.length] ||
              NormalFormFormater.defaultKarnaughMapOptions.area.colors[
                i %
                  NormalFormFormater.defaultKarnaughMapOptions.area.colors
                    .length
              ]
          ]

          const isVertWhole =
            (areaRows[vert][0] === 0 && vert === areaRows.length - 1) ||
            (areaRows[vert][areaRows[vert].length - 1] ===
              map.result.length - 1 &&
              vert === 0) ||
            (areaRows[vert][0] !== 0 &&
              areaRows[vert][areaRows[vert].length - 1] !==
                map.result.length - 1)
          const isHorWhole =
            (areaColumns[hor][0] === 0 && hor === areaColumns.length - 1) ||
            (areaColumns[hor][areaColumns[hor].length - 1] ===
              map.result.length - 1 &&
              hor === 0) ||
            (areaColumns[hor][0] !== 0 &&
              areaColumns[hor][areaColumns[hor].length - 1] !==
                map.result.length - 1)

          const areaCoords = {
            x1:
              areaColumns[hor][0] +
              (options?.area?.padding ||
                NormalFormFormater.defaultKarnaughMapOptions.area.padding),
            y1:
              map.result.length -
              (areaRows[vert][0] +
                (options?.area?.padding ||
                  NormalFormFormater.defaultKarnaughMapOptions.area.padding)),
            x2:
              areaColumns[hor][areaColumns[hor].length - 1] +
              1 -
              (options?.area?.padding ||
                NormalFormFormater.defaultKarnaughMapOptions.area.padding),
            y2:
              map.result.length -
              (areaRows[vert][areaRows[vert].length - 1] +
                1 -
                (options?.area?.padding ||
                  NormalFormFormater.defaultKarnaughMapOptions.area.padding))
          }

          if (isVertWhole && isHorWhole) {
            areas += LatexFormater.tikz.drawRect(
              areaCoords.x1,
              areaCoords.y1,
              areaCoords.x2,
              areaCoords.y2,
              areaOptions
            )
          } else if (isVertWhole && !isHorWhole) {
            let diraction: SemiRectDirection = "left"

            if (hor === 0) {
              areaCoords.x1 = 0
            } else if (hor === areaColumns.length - 1) {
              areaCoords.x2 = map.result.length
              diraction = "right"
            }

            areas += LatexFormater.tikz.drawSemiRect(
              areaCoords.x1,
              areaCoords.y1,
              areaCoords.x2,
              areaCoords.y2,
              diraction,
              areaOptions
            )
          } else if (!isVertWhole && isHorWhole) {
            let diraction: SemiRectDirection = "bottom"

            if (vert === 0) {
              areaCoords.y1 = map.result.length
            } else if (vert === areaRows.length - 1) {
              areaCoords.y2 = 0
              diraction = "top"
            }

            areas += LatexFormater.tikz.drawSemiRect(
              areaCoords.x1,
              areaCoords.y1,
              areaCoords.x2,
              areaCoords.y2,
              diraction,
              areaOptions
            )
          } else {
            let diraction: CornerDirection = "topLeft"

            if (vert === 0) {
              areaCoords.y2 = map.result.length
              areaCoords.y1 = map.result.length -
                (areaRows[vert][0] + 1 -
                  (options?.area?.padding ||
                    NormalFormFormater.defaultKarnaughMapOptions.area.padding))

              if (hor === 0) {
                areaCoords.x1 = 0
              } else if (hor === areaColumns.length - 1) {
                areaCoords.x2 = map.result.length
                diraction = "topRight"
              }
            } else if (vert === areaRows.length - 1) {
              areaCoords.y1 = 0
              areaCoords.y2 = map.result.length -
                (areaRows[vert][areaRows[vert].length - 1] +
                  (options?.area?.padding ||
                    NormalFormFormater.defaultKarnaughMapOptions.area.padding))

              if (hor === 0) {
                diraction = "bottomLeft"
                areaCoords.x1 = 0
              } else if (hor === areaColumns.length - 1) {
                diraction = "bottomRight"
                areaCoords.x2 = map.result.length
              }
            }

            areas += LatexFormater.tikz.drawCorner(
              areaCoords.x1,
              areaCoords.y1,
              areaCoords.x2,
              areaCoords.y2,
              diraction,
              areaOptions
            )
          }

          areas += "\n"
        }
      }
    }

    return LatexFormater.tikz.picture(`
      ${LatexFormater.tikz.drawGrid(map.result.length, map.result.length)}
      ${digits}
      ${rowHeaders}
      ${columnHeaders}
      ${areas}
    `)
  }
}
