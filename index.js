const createHash = require('murmurhash-js/murmurhash3_gc');

const increaseIdSpecificity = ({ repeat }={ repeat: 3 }) => ({
  onProcessSheet(sheet) {
    const component = sheet && sheet.options.meta;

    if (!sheet.id) {
      sheet.id = component + '-' + createHash(sheet.toString());
    }

    const rootNode = rule => rule.originalStyle.rootNode;
    const hasRootNode = rule => typeof rule.originalStyle.rootNode === 'boolean';
    const parent = rule => !!rule.options.nestingLevel && rule.options.parent
      ? rule.options.parent
      : null;
    const parents = (rule, acc=[]) => parent(rule)
      ? parents(
          parent(rule),
          acc.concat( parent(rule) )
        )
      : acc;

    // const parentRule =

    const prefix = ('#' + sheet.id).repeat(repeat);
    const glue = rule => hasRootNode(rule)
      ? rootNode(rule) ? '' : ' '
      : null;

    const cleanup = rule => {
      rule.originalStyle.rootNode = null;
      rule.style['root-node'] = null;
    }

    sheet.rules.index.forEach(rule => {
      console.log({
        rule,
        hasRootNode: hasRootNode(rule),
        parents: parents(rule),
        // parentsRootNode: parents(rule).map(rootNode),
        glue: glue(rule)
      });
      if (typeof rule.originalStyle.rootNode !== 'boolean') {
        return;
      }

      rule.selector = prefix + glue(rule) + rule.selector;
    })
  }
});

module.exports = increaseIdSpecificity;
