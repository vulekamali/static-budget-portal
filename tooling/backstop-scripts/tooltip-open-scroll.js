module.exports = function tooltipOpen(casper) {
  this.scrollTo(0, 1000);
  casper.click('.Tooltip-phrase.js-openTrigger');
};
