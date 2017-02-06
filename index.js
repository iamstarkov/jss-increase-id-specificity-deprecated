const createHash = require('murmurhash-js/murmurhash3_gc');

const increaseIdSpecificity = ({ repeat }={ repeat: 3 }) => ({
  onProcessSheet: (sheet) => {
    const component = sheet && sheet.options.meta;
    if (!sheet.id) {
      sheet.id = component + '-' + createHash(sheet.toString());
    }

    sheet.rules.index.forEach(rule => {
      rule.selector = '#' + sheet.id + rule.selector;
    })
  }
});

module.exports = increaseIdSpecificity;
