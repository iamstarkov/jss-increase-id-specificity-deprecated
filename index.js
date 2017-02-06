const createHash = require('murmurhash-js/murmurhash3_gc');

const increaseIdSpecificity = ({ repeat }={ repeat: 3 }) => ({
  onProcessSheet: (sheet) => {
    const component = sheet && sheet.options.meta;

    if (!sheet.id) {
      sheet.id = component + '-' + createHash(sheet.toString());
    }

    sheet.rules.index.forEach(rule => {
      console.log({ rule });
      console.log(typeof rule.originalStyle.rootNode)

      if (typeof rule.originalStyle.rootNode !== 'boolean') {
        return;
      }

      rule.selector = [
        '#',
        sheet.id,
        (rule.originalStyle.rootNode ? '' : ' '),
        rule.selector
      ].join('');

      rule.originalStyle.rootNode = null;
      rule.style['root-node'] = null;
    })
  }
});

module.exports = increaseIdSpecificity;
