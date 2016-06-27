define(["browser","datetime","libraryBrowser"],function(e,t,n){function a(e,t,n,a,r){var i=(a.MediaStreams||[]).filter(function(e){return"Audio"==e.Type}),o=i.map(function(e){var t=(e.Codec||"").toUpperCase();e.Profile&&(t+=" "+e.Profile),e.Language&&(t+=" · "+e.Language),e.Layout?t+=" · "+e.Layout:e.Channels&&(t+=" · "+e.Channels+" ch");var n={name:e.DisplayTitle||t,id:e.Index};return e.Index==r&&(n.selected=!0),n});require(["actionsheet"],function(e){e.show({items:o,positionTo:n,callback:function(e){t.setAudioStreamIndex(parseInt(e))}})})}function r(e,t,n,a,r){var i=(a.MediaStreams||[]).filter(function(e){return"Subtitle"==e.Type}),o=i.map(function(e){var t=e.Language||Globalize.translate("LabelUnknownLanguage");e.IsDefault&&e.IsForced?t+=" · "+Globalize.translate("LabelDefaultForcedStream"):e.IsDefault?t+=" · "+Globalize.translate("LabelDefaultStream"):e.IsForced&&(t+=" · "+Globalize.translate("LabelForcedStream")),e.Codec&&(t+=" · "+e.Codec.toUpperCase());var n={name:e.DisplayTitle||t,id:e.Index};return e.Index==r&&(n.selected=!0),n});o.unshift({id:-1,name:Globalize.translate("ButtonOff"),selected:null==r}),require(["actionsheet"],function(e){e.show({items:o,positionTo:n,callback:function(e){t.setSubtitleStreamIndex(parseInt(e))}})})}function i(e){e.classList.remove("hide")}function o(e){e.classList.add("hide")}function l(e,t){return e&&e.MediaStreams&&e.MediaStreams.filter(function(e){return e.Type==t}).length>0}function s(t,a){var r=a.NowPlayingItem,i=r?MediaController.getNowPlayingNameHtml(r).replace("<br/>"," - "):"";t.querySelector(".nowPlayingPageTitle").innerHTML=i,i.length>0?t.querySelector(".nowPlayingPageTitle").classList.remove("hide"):t.querySelector(".nowPlayingPageTitle").classList.add("hide");var o,l=null;r&&(r.PrimaryImageTag?o=ApiClient.getScaledImageUrl(r.PrimaryImageItemId,{type:"Primary",maxHeight:300,tag:r.PrimaryImageTag}):r.BackdropImageTag?o=ApiClient.getScaledImageUrl(r.BackdropItemId,{type:"Backdrop",maxHeight:300,tag:r.BackdropImageTag,index:0}):r.ThumbImageTag&&(o=ApiClient.getScaledImageUrl(r.ThumbImageItemId,{type:"Thumb",maxHeight:300,tag:r.ThumbImageTag}))),o!=y&&(r&&r.BackdropImageTag&&(l=ApiClient.getScaledImageUrl(r.BackdropItemId,{type:"Backdrop",maxHeight:300,tag:r.BackdropImageTag,index:0})),c(t,o),r?(e.mobile||require(["backdrop"],function(e){e.setBackdrop(l)}),ApiClient.getItem(Dashboard.getCurrentUserId(),r.Id).then(function(e){t.querySelector(".nowPlayingPageUserDataButtons").innerHTML=n.getUserDataIconsHtml(e,!1)})):t.querySelector(".nowPlayingPageUserDataButtons").innerHTML="")}function c(e,t){y=t,t?ImageLoader.lazyImage(e.querySelector(".nowPlayingPageImage"),t):e.querySelector(".nowPlayingPageImage").style.backgroundImage=""}function u(e,t){e.disabled=!t}function d(e,t){for(var n=e.querySelectorAll(".btnCommand"),a=0,r=n.length;r>a;a++)u(n[a],-1!=t.indexOf(n[a].getAttribute("data-command")))}function g(){}var y;return function(){function e(e){if(e&&E){var t=E;switch((t.PlayState||{}).RepeatMode){case"RepeatNone":e.setRepeatMode("RepeatAll");break;case"RepeatAll":e.setRepeatMode("RepeatOne");break;case"RepeatOne":e.setRepeatMode("RepeatNone")}}}function c(e,n){E=n;var a=n.NowPlayingItem,r=MediaController.getPlayerInfo(),c=r.supportedCommands,d=n.PlayState||{};u(e.querySelector(".btnToggleFullscreen"),a&&"Video"==a.MediaType&&-1!=c.indexOf("ToggleFullscreen")),u(e.querySelector(".btnAudioTracks"),l(a,"Audio")&&-1!=c.indexOf("SetAudioStreamIndex")),u(e.querySelector(".btnSubtitles"),l(a,"Subtitle")&&-1!=c.indexOf("SetSubtitleStreamIndex")),a&&a.Chapters&&a.Chapters.length&&d.CanSeek?u(e.querySelector(".btnChapters"),!0):(u(e.querySelector(".btnChapters"),!1),g(e)),-1!=c.indexOf("DisplayMessage")?e.querySelector(".sendMessageSection").classList.remove("hide"):e.querySelector(".sendMessageSection").classList.add("hide"),-1!=c.indexOf("SendString")?e.querySelector(".sendTextSection").classList.remove("hide"):e.querySelector(".sendTextSection").classList.add("hide"),u(e.querySelector(".btnStop"),null!=a),u(e.querySelector(".btnNextTrack"),null!=a),u(e.querySelector(".btnPreviousTrack"),null!=a);var y=e.querySelector(".btnPause"),m=e.querySelector(".btnPlay");u(y,null!=a),u(m,null!=a),d.IsPaused?(o(y),i(m)):(i(y),o(m));var p=e.querySelector(".nowPlayingPositionSlider");if(!p.dragging){if(a&&a.RunTimeTicks){var f=d.PositionTicks/a.RunTimeTicks;f*=100,p.value=f}else p.value=0;p.disabled=!d.CanSeek}e.querySelector(".positionTime").innerHTML=null==d.PositionTicks?"--:--":t.getDisplayRunningTime(d.PositionTicks),e.querySelector(".runtime").innerHTML=a&&null!=a.RunTimeTicks?t.getDisplayRunningTime(a.RunTimeTicks):"--:--",a&&"Video"==a.MediaType?e.classList.remove("hideVideoButtons"):e.classList.add("hideVideoButtons"),r.isLocalPlayer&&AppInfo.hasPhysicalVolumeButtons?e.classList.add("hideVolumeButtons"):e.classList.remove("hideVolumeButtons"),a&&"Audio"==a.MediaType?e.querySelector(".buttonsRow2").classList.add("hide"):e.querySelector(".buttonsRow2").classList.remove("hide");var S=e.querySelector(".repeatToggleButton");"RepeatAll"==d.RepeatMode?(S.innerHTML="<i class='md-icon'>repeat</i>",S.classList.add("nowPlayingPageRepeatActive")):"RepeatOne"==d.RepeatMode?(S.innerHTML="<i class='md-icon'>repeat_one</i>",S.classList.add("nowPlayingPageRepeatActive")):(S.innerHTML="<i class='md-icon'>repeat</i>",S.classList.remove("nowPlayingPageRepeatActive")),s(e,n)}function m(e){var t="";t+=n.getListViewHtml({items:MediaController.playlist(),smallIcon:!0}),D=!1;var a=[];a.push("paper-icon-item"),a.push("paper-item-body"),require(a,function(){var n=e.querySelector(".playlist");n.innerHTML=t;var a=MediaController.currentPlaylistIndex();if(-1!=a){var r=n.querySelectorAll(".listItem")[a];if(r){var i=r.querySelector(".listItemImage");i.classList.remove("lazy"),i.classList.add("playlistIndexIndicatorImage")}}ImageLoader.lazyChildren(n)})}function p(e,t){if("positionchange"==e.type){var n=(new Date).getTime();if(700>n-N)return;N=n}c(A,t)}function f(e,t){var n=this;n.beginPlayerUpdates(),p.call(n,e,t),m(A)}function S(e){var t=this;t.endPlayerUpdates(),p.call(t,e,{}),m(A)}function v(){R&&(Events.off(R,"playbackstart",f),Events.off(R,"playbackstop",S),Events.off(R,"volumechange",p),Events.off(R,"playstatechange",p),Events.off(R,"positionchange",p),R.endPlayerUpdates(),R=null)}function P(e,t){v(),R=t,t.getPlayerState().then(function(e){e.NowPlayingItem&&t.beginPlayerUpdates(),p.call(t,{type:"init"},e)}),Events.on(t,"playbackstart",f),Events.on(t,"playbackstop",S),Events.on(t,"volumechange",p),Events.on(t,"playstatechange",p),Events.on(t,"positionchange",p);var n=MediaController.getPlayerInfo(),a=n.supportedCommands;d(e,a)}function b(e){var t=MediaController.getPlayerInfo(),n=e.querySelector(".nowPlayingCastIcon");t.isLocalPlayer?(n.querySelector("i").innerHTML="cast",n.classList.remove("btnActiveCast"),e.querySelector(".nowPlayingSelectedPlayer").innerHTML=""):(n.querySelector("i").innerHTML="cast-connected",n.classList.add("btnActiveCast"),e.querySelector(".nowPlayingSelectedPlayer").innerHTML=t.deviceName||t.name)}function T(e,t){for(;!e.classList||!e.classList.contains(t);)if(e=e.parentNode,!e)return null;return e}function I(e){var t=T(e.target,"lnkPlayFromIndex");if(null!=t){var a=parseInt(t.getAttribute("data-index"));return MediaController.currentPlaylistIndex(a),m(context),e.preventDefault(),e.stopPropagation(),!1}var r=T(e.target,"lnkRemoveFromPlaylist");if(null!=r){var a=parseInt(r.getAttribute("data-index"));return MediaController.removeFromPlaylist(a),m(context),e.preventDefault(),e.stopPropagation(),!1}var i=T(e.target,"mediaItem");if(null!=i){var o=n.getListItemInfo(i);return MediaController.currentPlaylistIndex(o.index),e.preventDefault(),e.stopPropagation(),!1}}function h(){R&&(this.classList.contains("repeatToggleButton")?e(R):MediaController.sendCommand({Name:this.getAttribute("data-command")},R))}function L(e){for(var n=e.querySelectorAll(".btnCommand"),i=0,o=n.length;o>i;i++)n[i].addEventListener("click",h);e.querySelector(".btnToggleFullscreen").addEventListener("click",function(e){R&&MediaController.sendCommand({Name:e.target.getAttribute("data-command")},R)}),e.querySelector(".btnAudioTracks").addEventListener("click",function(t){if(R&&E&&E.PlayState){var n=E.PlayState.AudioStreamIndex;a(e,R,t.target,E.NowPlayingItem,n)}}),e.querySelector(".btnSubtitles").addEventListener("click",function(t){if(R&&E&&E.PlayState){var n=E.PlayState.SubtitleStreamIndex;r(e,R,t.target,E.NowPlayingItem,n)}}),e.querySelector(".btnChapters").addEventListener("click",function(){}),e.querySelector(".btnStop").addEventListener("click",function(){R&&R.stop()}),e.querySelector(".btnPlay").addEventListener("click",function(){R&&R.unpause()}),e.querySelector(".btnPause").addEventListener("click",function(){R&&R.pause()}),e.querySelector(".btnNextTrack").addEventListener("click",function(){R&&R.nextTrack()}),e.querySelector(".btnPreviousTrack").addEventListener("click",function(){R&&R.previousTrack()}),e.querySelector(".nowPlayingPositionSlider").addEventListener("change",function(){var e=this.value;if(R&&E){var t=parseFloat(e),n=t/100*E.NowPlayingItem.RunTimeTicks;R.seek(Math.floor(n))}}),e.querySelector(".nowPlayingPositionSlider",e).getBubbleText=function(e){var n=E;if(!n||!n.NowPlayingItem||!n.NowPlayingItem.RunTimeTicks)return"--:--";var a=n.NowPlayingItem.RunTimeTicks;return a/=100,a*=e,t.getDisplayRunningTime(a)},e.addEventListener("click",I)}function q(){var e=A;b(e),P(e,MediaController.getCurrentPlayer())}function C(e){var t=e.target;return MediaController.sendCommand({Name:"DisplayMessage",Arguments:{Header:t.querySelector("#txtMessageTitle").value,Text:t.querySelector("#txtMessageText",t).value}},R),t.querySelector("input").value="",require(["toast"],function(e){e("Message sent.")}),e.preventDefault(),e.stopPropagation(),!1}function k(e){var t=e.target;return MediaController.sendCommand({Name:"SendString",Arguments:{String:t.querySelector("#txtTypeText",t).value}},R),t.querySelector("input").value="",require(["toast"],function(e){e("Text sent.")}),e.preventDefault(),e.stopPropagation(),!1}function M(e,t){require(["css!css/nowplaying.css"]),L(t),t.querySelector(".sendMessageForm").addEventListener("submit",C),t.querySelector(".typeTextForm").addEventListener("submit",k),t.querySelector(".nowPlayingCastIcon").addEventListener("click",function(){MediaController.showPlayerSelection()}),t.querySelector(".btnExitRemoteControl").addEventListener("click",function(){history.back()});var a=t.querySelector(".libraryViewNav");AppInfo.enableNowPlayingPageBottomTabs?t.querySelector(".libraryViewNav").classList.add("bottom"):t.querySelector(".libraryViewNav").classList.remove("bottom"),n.configurePaperLibraryTabs(e,a,e.querySelectorAll(".pageTabContent")),a.addEventListener("tabchange",function(e){2==e.detail.selectedTabIndex&&D&&m(t)}),Events.on(MediaController,"playerchange",q),n.createCardMenus(t.querySelector(".itemsContainer"))}function x(){v(),Events.off(MediaController,"playerchange",q),E=null}function w(e){y=null,P(e,MediaController.getCurrentPlayer()),b(e)}var A,R,E,N=0,B=this,D=!0;B.init=function(e,t){A=t,AppInfo.enableNowPlayingPageBottomTabs||(t.querySelector(".btnExitRemoteControl").style.position="relative",t.querySelector(".topRightContainer").style.position="relative"),M(e,A)},B.onShow=function(){w(A,window.location.hash)},B.destroy=function(){x()}}});