const createHash = require('murmurhash-js/murmurhash3_gc');

const increaseIdSpecificity = ({ repeat }={ repeat: 3 }) => ({
  onProcessSheet: (sheet) => {
    const component = sheet && sheet.options.meta;
    if (!sheet.id) {
      sheet.id = component + '-' + createHash(component);
    }
    console.log(sheet.id)

    Object.keys(sheet.classes).forEach(k => {
      const v = sheet.classes[k];
      // sheet.classes[k] = sheet.id.repeat(repeat) + v;
    })

    console.log(sheet);
  }
})

module.exports = increaseIdSpecificity;
