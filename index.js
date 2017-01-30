const createHash = require('murmurhash-js/murmurhash3_gc');

const increaseIdSpecificity = ({ repeat }={ repeat: 3 }) => (rule, sheet) => {
  const component = sheet && sheet.options.meta;

  if (!sheet.id) {
    sheet.id = component + '-' + createHash(component);
  }

  rule.selector = `#${sheet.id}`.repeat(repeat) + rule.selector;
}

module.exports = increaseIdSpecificity;
