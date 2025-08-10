export const PASSWORD_REGEX =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

export const NAME_REGEX = /(^[\p{L}\d'.\s-]*$)/u

export const SLUG_REGEX = /^[a-z\d]+(?:([.\-_])[a-z\d]+)*$/
