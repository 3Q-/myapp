function chatBodyToBottom(){var e=$(".chat-body"),t=e.prop("scrollHeight");e.prop("scrollTop",t)}function addMessage(e,t,n){var r=$(".msg-list-body");n=QxEmotion.Parse(n),r.append('<div class="clearfix msg-wrap"><div class="msg-head"><span class="msg-name label label-primary pull-left"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;'+e+"</span>"+'<span class="msg-time label label-default pull-left">'+'<span class="glyphicon glyphicon-time"></span>&nbsp;&nbsp;'+t+"</span>"+'</div><div class="msg-content">'+n+"</div></div>"),chatBodyToBottom()}function addServerMessage(e,t){var n=$(".msg-list-body");t=QxEmotion.Parse(t),n.append('<div class="clearfix msg-wrap"><div class="msg-head"><span class="msg-name label label-danger pull-left"><span class="glyphicon glyphicon-info-sign"></span>&nbsp;&nbsp;系统消息</span><span class="msg-time label label-default pull-left"><span class="glyphicon glyphicon-time"></span>&nbsp;&nbsp;'+e+"</span>"+'</div><div class="msg-content">'+t+"</div></div>"),chatBodyToBottom()}function removeListUser(e){$(".list-table tr").each(function(){e==$(this).find("td").text()&&$(this).remove()})}function addUserToList(e){$(".list-table").append("<tr><td>"+e+"</td></tr>")}function useUserList(e){$(".list-table").html("");var t;for(t=0;t<e.length;t++)addUserToList(e[t]);updateListCount()}function updateListCount(){var e=$(".list-table").find("tr").length+1;$("#list-count").text("当前在线："+e+"人")}function onClickSendMessage(){if(!$.cookie("chat_nickname")){$("#login-modal").modal("show");return}var e=$("#input-edit"),t=e.val();if(""===t)return;say(t),e.val("")}function onClickApplyNickname(){var e=$("#nickname-edit"),t=$("#nickname-error"),n=e.val();if(""===n){t.text("请填写昵称。"),t.show(),e.focus();return}var r=getStringLength(n);if(r<4||r>16){t.text("请填写正确的昵称，应为4到16个字符。"),t.show();return}n==$.cookie("chat_nickname")&&(t.text("你本来就叫这个。"),t.show()),changeNickname(n),Notify.request()}function onClickChangeNickname(){$("#login-modal").modal("show")}var g_hide=!1;$("div[role='dialog']").on("show.bs.modal",function(){$(this).css({display:"block","margin-top":function(){return $(this).height()/3}})}),$("#login-modal").on("show.bs.modal",function(e){$("#nickname-edit").val(""),$("#nickname-error").hide()}),$("#login-modal").on("shown.bs.modal",function(e){$("#nickname-edit").focus()}),$("#input-edit").keydown(function(e){13===e.keyCode&&onClickSendMessage()}),$("#nickname-edit").keydown(function(e){13===e.keyCode&&onClickApplyNickname()}),QxEmotion($("#emotion-btn"),$("#input-edit"));