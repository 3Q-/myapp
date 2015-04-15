/* ========================================================================
 * Bootstrap: collapse.js v3.3.2
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function(e){"use strict";function n(t){var n,r=t.attr("data-target")||(n=t.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,"");return e(r)}function r(n){return this.each(function(){var r=e(this),i=r.data("bs.collapse"),s=e.extend({},t.DEFAULTS,r.data(),typeof n=="object"&&n);!i&&s.toggle&&n=="show"&&(s.toggle=!1),i||r.data("bs.collapse",i=new t(this,s)),typeof n=="string"&&i[n]()})}var t=function(n,r){this.$element=e(n),this.options=e.extend({},t.DEFAULTS,r),this.$trigger=e(this.options.trigger).filter('[href="#'+n.id+'"], [data-target="#'+n.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};t.VERSION="3.3.2",t.TRANSITION_DURATION=350,t.DEFAULTS={toggle:!0,trigger:'[data-toggle="collapse"]'},t.prototype.dimension=function(){var e=this.$element.hasClass("width");return e?"width":"height"},t.prototype.show=function(){if(this.transitioning||this.$element.hasClass("in"))return;var n,i=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(i&&i.length){n=i.data("bs.collapse");if(n&&n.transitioning)return}var s=e.Event("show.bs.collapse");this.$element.trigger(s);if(s.isDefaultPrevented())return;i&&i.length&&(r.call(i,"hide"),n||i.data("bs.collapse",null));var o=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[o](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var u=function(){this.$element.removeClass("collapsing").addClass("collapse in")[o](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!e.support.transition)return u.call(this);var a=e.camelCase(["scroll",o].join("-"));this.$element.one("bsTransitionEnd",e.proxy(u,this)).emulateTransitionEnd(t.TRANSITION_DURATION)[o](this.$element[0][a])},t.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass("in"))return;var n=e.Event("hide.bs.collapse");this.$element.trigger(n);if(n.isDefaultPrevented())return;var r=this.dimension();this.$element[r](this.$element[r]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var i=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};if(!e.support.transition)return i.call(this);this.$element[r](0).one("bsTransitionEnd",e.proxy(i,this)).emulateTransitionEnd(t.TRANSITION_DURATION)},t.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},t.prototype.getParent=function(){return e(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(e.proxy(function(t,r){var i=e(r);this.addAriaAndCollapsedClass(n(i),i)},this)).end()},t.prototype.addAriaAndCollapsedClass=function(e,t){var n=e.hasClass("in");e.attr("aria-expanded",n),t.toggleClass("collapsed",!n).attr("aria-expanded",n)};var i=e.fn.collapse;e.fn.collapse=r,e.fn.collapse.Constructor=t,e.fn.collapse.noConflict=function(){return e.fn.collapse=i,this},e(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(t){var i=e(this);i.attr("data-target")||t.preventDefault();var s=n(i),o=s.data("bs.collapse"),u=o?"toggle":e.extend({},i.data(),{trigger:this});r.call(s,u)})}(jQuery);