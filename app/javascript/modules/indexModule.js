define(function(require){
    'use strict';
    var $ = require('jquery');
    
    return {
        getBodySize : function(){
            return $('body').size();
        }
    };

});
