define("modules/indexModule",["require","jquery"],function(e){"use strict";var t=e("jquery");return{getBodySize:function(){return t("body").size()}}}),define("controller/index",["require","../modules/indexModule"],function(e){"use strict";alert("good");var t=e("../modules/indexModule"),n=t.getBodySize(),r=$("#navbar");r.css({border:"1px solid red",height:100})});