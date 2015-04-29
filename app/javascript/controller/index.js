define(function(require){
    'use strict';
    alert('good');
    var indexModule = require('../modules/indexModule'),
        size = indexModule.getBodySize(),
        $navBar = $('#navbar');
    $navBar.css({border:'1px solid red', height: 100});
    console.log(size);
});
