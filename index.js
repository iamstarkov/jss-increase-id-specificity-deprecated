const createHash = require('murmurhash-js/murmurhash3_gc');

const increaseIdSpecificity = ({ repeat }={ repeat: 3 }) => ({
  onProcessSheet: (sheet) => {
    const component = sheet && sheet.options.meta;
    if (!sheet.id) {
      sheet.id = component + '-' + createHash(component);
    }
    console.log(sheet);

    console.log(sheet.rules.index);
    sheet.rules.index.forEach(rule => {
      rule.selector = '#' + sheet.id + rule.selector;
    })
  }
});

module.exports = increaseIdSpecificity;
