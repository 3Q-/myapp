"use strict";function changeNickname(e){socket.emit("change_nickname",e)}function say(e){socket.emit("say",e)}var chat_server="http://"+location.hostname+":8888",socket=io.connect(chat_server);socket.on("need_nickname",function(){$.cookie("chat_nickname")?changeNickname($.cookie("chat_nickname")):$("#login-modal").modal("show")}),socket.on("server_message",function(e){addServerMessage(getLocalHMS(),e)}),socket.on("change_nickname_error",function(e){$("#login-modal").modal("show"),$("#nickname-error").text(e),$("#nickname-error").show(),$("#nickname-edit").focus()}),socket.on("change_nickname_done",function(e,o){$.cookie("chat_nickname",o),$("#login-modal").modal("hide"),$("#my-nickname").html("昵称："+o),null!==e&&""!==e&&addServerMessage(getLocalHMS(),"["+e+"] 改名为 ["+o+"]"),updateListCount()}),socket.on("say_done",function(e,o){addMessage(e,getLocalHMS(),o)}),socket.on("user_list",function(e){useUserList(e)}),socket.on("user_change_nickname",function(e,o){removeListUser(e),addUserToList(o),addServerMessage(getLocalHMS(),"["+e+"] 改名为 ["+o+"]")}),socket.on("user_join",function(e){addUserToList(e),updateListCount(),addServerMessage(getLocalHMS(),"["+e+"] 进入了聊天室。")}),socket.on("user_quit",function(e){removeListUser(e),updateListCount(),addServerMessage(getLocalHMS(),"["+e+"] 离开了聊天室。")}),socket.on("user_say",function(e,o){addMessage(e,getLocalHMS(),o),"hidden"==document[GetVisibilityKey()]&&Notify.show({icon:"/img/qx_chat.png",title:"千寻聊天室",message:e+"："+o,autoclose:3,onclick:function(){window.focus(),void 0!==typeof this.colse?this.close():void 0!==typeof this.cancel&&this.cancel()}})});