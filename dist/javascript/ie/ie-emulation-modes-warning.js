/*!
 * Copyright 2014 Twitter, Inc.
 *
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see http://creativecommons.org/licenses/by/3.0/.
 */

(function(){"use strict";function e(){var e=/MSIE ([0-9.]+)/.exec(window.navigator.userAgent);if(e===null)return null;var t=parseInt(e[1],10),n=Math.floor(t);return n}function t(){var e=(new Function("/*@cc_on return @_jscript_version; @*/"))();return e===undefined?11:e<9?8:e}var n=window.navigator.userAgent;if(n.indexOf("Opera")>-1||n.indexOf("Presto")>-1)return;var r=e();if(r===null)return;var i=t();r!==i&&window.alert("WARNING: You appear to be using IE"+i+" in IE"+r+" emulation mode.\nIE emulation modes can behave significantly differently from ACTUAL older versions of IE.\nPLEASE DON'T FILE BOOTSTRAP BUGS based on testing in IE emulation modes!")})();