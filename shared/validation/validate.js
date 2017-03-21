import validate from 'validate.js'

export default function (data, rules) {
  return validate(data, rules)
}
