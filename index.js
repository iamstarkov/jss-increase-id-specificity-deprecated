/**
 * use :not(#\20), :not(.\20) and :not(\20) instead of generating unlikely
 * appearing ids…
 * — https://twitter.com/subzey/status/829050478721896448
 * Rationale: \20 is a css escape for U+0020 Space, and neither classname,
 * nor id, nor tagname can contain a space
 * — https://twitter.com/subzey/status/829051085885153280
 */

module.exports = function increaseIdSpecificity({ repeat }={ repeat: 3 }) {
  return {
    onProcessSheet(sheet) {
      sheet.rules.index.forEach(rule => {
        rule.selectorText = ':not(#\\20)'.repeat(repeat) + rule.selectorText;
      })
    }
  }
}
