define(function(require){
    'use strict';
    var $ = require('jquery'),
        b = require('./indexModuleb');

    b.getBodySize();
    b.alert('good');
    return {
        getBodySize : function(){
            return $('body').size();
        }
    };

});
