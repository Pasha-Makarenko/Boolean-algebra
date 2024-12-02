import { Colors, CornerDirection, Lengths, SemiRectDirection, Thickness } from "./latex.interfaces"

export default class LatexFormater {
  static basic = {
    endLine: "\\",
    braakLine: "\\\\",
    noIndent: "\\noindent",
    document: (content: string) =>
      `
      \\begin{document}
      ${content}
      \\end{document}
      `,
    vspace: (size: number, format: Lengths = "cm") => `\\vspace{${size}${format}}`
  }

  static math = {
    dot: "\\cdotp",
    or: "\\vee",
    times: "\\times",
    area: (content: string | number) =>
      `\\begin{math}
      ${content}
      \\end{math}
      `.trim(),
    brackets: (content: string | number) => `$${content}$`,
    index: (content: string | number, i: number) => `${content}\_{${i}}`,
    overline: (content: string | number) => `\\overline{${content}}`
  }

  static colors = {
    import: "\\usepackage{colortbl}",
    data: {
      "white": "white",
      "gray": "gray",
      "black": "black",
      "red": "red",
      "green": "green",
      "blue": "blue",
      "cyan": "cyan",
      "magenta": "magenta",
      "yellow": "yellow",
      "orange": "orange"
    } as {
      [key in Colors]: key
    }
  }

  static tabular = {
    horizontalLine: "\\hline",
    separator: "&",
    layout: {
      column: "c",
      separator: "|"
    },
    table: (layout: string, content: string) =>
      `
      \\begin{tabular}{|${layout}|}
      ${content}
      \\end{tabular}
      `.trim(),
    rowColor: (color: string, opacity: number) =>
      `\\rowcolor[${color}]{${opacity}}`
  }

  static tikz = {
    import: "\\usepackage{tikz}",
    thickness: {
      "ultra thin": "ultra thin",
      "very thin": "very thin",
      "thin": "thin",
      "semithick": "semithick",
      "thick": "thick",
      "very thick": "very thick",
      "ultra thick": "ultra thick"
    } as {
      [key in Thickness]: key
    },
    picture: (content: string) =>
      `
      \\begin{tikzpicture}
      ${content}
      \\end{tikzpicture}
      `.trim(),
    node: (x: number, y: number, content: string | number) =>
      `\\node at (${x}, ${y}) {${content}};`,
    drawGrid: (width: number, height: number) =>
      `\\draw (0, 0) grid (${width}, ${height});`,
    drawLine: (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      options?: Array<string>
    ) =>
      `\\draw${options?.length ? `[${options.join(", ")}]` : ""} (${x1}, ${y1}) -- (${x2}, ${y2});`,
    drawRect: (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      options?: Array<string>
    ) =>
      `\\draw${options?.length ? `[${options.join(", ")}]` : ""} (${x1}, ${y1}) rectangle (${x2}, ${y2});`,
    drawSemiRect: (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      direction: SemiRectDirection,
      options?: Array<string>
    ) => {
      const coords: Array<[number, number]> = []

      switch (direction) {
        case "top":
          coords[0] = [x1, y2]
          coords[1] = [x1, y1]
          coords[2] = [x2, y1]
          coords[3] = [x2, y2]
          break
        case "bottom":
          coords[0] = [x1, y1]
          coords[1] = [x1, y2]
          coords[2] = [x2, y2]
          coords[3] = [x2, y1]
          break
        case "left":
          coords[0] = [x1, y1]
          coords[1] = [x2, y1]
          coords[2] = [x2, y2]
          coords[3] = [x1, y2]
          break
        case "right":
          coords[0] = [x2, y1]
          coords[1] = [x1, y1]
          coords[2] = [x1, y2]
          coords[3] = [x2, y2]
          break
      }

      return `\\draw${options?.length ? `[${options.join(", ")}]` : ""} ${coords.map(coord => `(${coord[0]}, ${coord[1]})`).join(" -- ")};`
    },
    drawCorner: (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      direction: CornerDirection,
      options?: Array<string>
    ) => {
      const coords: Array<[number, number]> = []

      switch (direction) {
        case "topLeft":
          coords[0] = [x1, y1]
          coords[1] = [x2, y1]
          coords[2] = [x2, y2]
          break
        case "topRight":
          coords[0] = [x1, y2]
          coords[1] = [x1, y1]
          coords[2] = [x2, y1]
          break
        case "bottomLeft":
          coords[0] = [x1, y2]
          coords[1] = [x2, y2]
          coords[2] = [x2, y1]
          break
        case "bottomRight":
          coords[0] = [x1, y1]
          coords[1] = [x1, y2]
          coords[2] = [x2, y2]
          break
      }

      return `\\draw${options?.length ? `[${options.join(", ")}]` : ""} ${coords.map(coord => `(${coord[0]}, ${coord[1]})`).join(" -- ")};`
    }
  }
}
