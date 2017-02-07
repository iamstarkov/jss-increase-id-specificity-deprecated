const createHash = require('murmurhash-js/murmurhash3_gc');

const increaseIdSpecificity = ({ repeat }={ repeat: 3 }) => ({
  onProcessSheet(sheet) {
    const component = sheet && sheet.options.meta;

    if (!sheet.id) {
      sheet.id = component + '-' + createHash(sheet.toString());
    }

    const rootNode = rule => rule.originalStyle.rootNode;
    const hasRootNode = rule => typeof rootNode(rule) === 'boolean';

    const prefix = ('#' + sheet.id).repeat(repeat);
    const glue = rule => rootNode(rule) ? '' : ' '

    const cleanup = rule => {
      rule.originalStyle.rootNode = null;
      rule.style['root-node'] = null;
    }

    sheet.rules.index
      .filter(hasRootNode)
      .forEach(rule => {
        rule.selector = prefix + glue(rule) + rule.selector;
        cleanup(rule);
      });
  }
});

module.exports = increaseIdSpecificity;
