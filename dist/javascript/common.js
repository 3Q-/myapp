function appendZero(e){return 10>e?"0"+e:e}function getLocalHMS(){var e=((new Date).getTime(),new Date);return appendZero(e.getHours())+":"+appendZero(e.getMinutes())+":"+appendZero(e.getSeconds())}function getStringLength(e){return e.replace(/[^\u0000-\u00ff]/g,"tt").length}function GetVisibilityKey(){var e;return"undefined"!=typeof document.hidden?e="visibilityState":"undefined"!=typeof document.mozHidden?e="mozVisibilityState":"undefined"!=typeof document.msHidden?e="msVisibilityState":"undefined"!=typeof document.webkitHidden&&(e="webkitVisibilityState"),e}