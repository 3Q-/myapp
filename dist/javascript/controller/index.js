define("modules/indexModuleb",["require","jquery"],function(e){"use strict";e("jquery");return{getBodySize:function(){alert("b")},alert:function(e){alert(e)}}}),define("modules/indexModule",["require","jquery","./indexModuleb"],function(e){"use strict";var d=e("jquery"),u=e("./indexModuleb");return u.getBodySize(),u.alert("good"),{getBodySize:function(){return d("body").size()}}}),define("controller/index",["require","../modules/indexModule","../modules/indexModuleb"],function(e){"use strict";var d=e("../modules/indexModule"),u=e("../modules/indexModuleb"),r=(d.getBodySize(),$("#navbar"));r.css({border:"1px solid red",height:100}),u.alert("c")});




