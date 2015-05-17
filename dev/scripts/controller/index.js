define(function(require){
    'use strict';
    var indexModule = require('../modules/indexModule'),
        b = require('../modules/indexModuleb'),
        size = indexModule.getBodySize(),
        $navBar = $('#navbar');
    $navBar.css({border:'1px solid red', height: 100});
    //b.alert('c');
    console.log(size);
});
