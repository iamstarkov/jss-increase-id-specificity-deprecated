'use strict';

/**
 * use :not(#\20), :not(.\20) and :not(\20) instead of generating unlikely
 * appearing ids…
 * — https://twitter.com/subzey/status/829050478721896448
 * Rationale: \20 is a css escape for U+0020 Space, and neither classname,
 * nor id, nor tagname can contain a space
 * — https://twitter.com/subzey/status/829051085885153280
 */

var selector = ':not(#\\20)';

module.exports = function increaseIdSpecificity() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { repeat: 3 },
      repeat = _ref.repeat;

  var prefix = Array(repeat + 1).join(selector);
  var onProcessSheet = function onProcessSheet(sheet) {
    sheet.rules.index.forEach(function (rule) {
      if (rule.type === 'conditional') {
        return onProcessSheet(rule);
      }

      rule.selectorText = prefix + rule.selectorText;
    });
  };

  return { onProcessSheet: onProcessSheet };
};
