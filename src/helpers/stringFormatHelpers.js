import pluralize from "pluralize"


function toTitleCase(str) {
  return str.substr(0,1).toUpperCase() + str.substr(1)
}

function toPlural(str) {
  return pluralize(str)
}

export {
  toTitleCase,
  toPlural
}