(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{649:function(e,t,a){},651:function(e,t,a){},652:function(e,t,a){"use strict";var n=a(0),i=a.n(n),r=a(124),s=a.n(r),o=a(87),c=a(37),l=a(93),u=a(125),d=a.n(u),m=a(126),p=a.n(m),h=a(72),_=(a(651),a(649),a(3)),v=a(62),f=a(9),q=a(99),g=function(e){var t=p()(_.c),a=null,n=["reuse-que__footer--details"],r=["reuse-que__footer--details__options"],s=null,u=null,m=String(e.que.title).length>149?String(e.que.title).substr(0,150)+"...":e.que.title,g=e.que.snapshot.length+e.que.image.length,E=i.a.createElement("p",{className:"reuse-que__content--title"},i.a.createElement("a",{href:"/view/question/"+e.que._id},m)),C=i.a.createElement("li",{className:"reuse-que__footer--details__options--status",onClick:e.changeCnt},i.a.createElement(f.a,{icon:["far","eye-slash"],className:"icon icon__reuse-que--options__dft"}),"Draft"),y=i.a.createElement(f.a,{icon:["far","heart"],className:"icon icon__reuse-que--footer__heart"}),w=i.a.createElement("img",{src:e.que.userImage,alt:""});"draft"===e.que.mode&&(C=i.a.createElement("li",{className:"reuse-que__footer--details__options--status",onClick:e.changeCntPublish},i.a.createElement(f.a,{icon:["far","eye"],className:"icon icon__reuse-que--options__dft"}),"Publish")),e.que.username&&!e.que.userImage&&(w=i.a.createElement(h.a,{name:e.que.username,size:"36",round:!0}));var b,I=Object(l.a)(e.changedFav);try{for(I.s();!(b=I.n()).done;){var N=b.value;e.que._id===N.id&&(s=N.favAdd,u=N.liked)}}catch(x){I.e(x)}finally{I.f()}var P=null,S=[].concat(Object(c.a)(e.que.snapshot),Object(c.a)(e.que.image)),O=null,F=["reuse-que__media--wrapper"];if(S.length>0){var A,M=!1,k=Object(l.a)(e.mediaItms);try{for(k.s();!(A=k.n()).done;){var H=A.value;H.id===e.que._id&&(M=!0,e.animateItm.id===e.que._id&&("next"!==e.animateItm.direction||e.removePrevAnim||F.push("reuse-que__media--wrapper__anim"),"prev"!==e.animateItm.direction||e.removePrevAnim||F.push("reuse-que__media--wrapper__anim-rev")),e.removePrevMedia&&e.removePrevMedia.id===e.que._id&&j(e.removePrevMedia),D(H.position))}}catch(x){k.e(x)}finally{k.f()}M||(e.removePrevMedia&&e.removePrevMedia.id===e.que._id&&j(e.removePrevMedia),D(0))}function j(e){"next"===e.type?F.push("reuse-que__media--wrapper__anim-exit"):F.push("reuse-que__media--wrapper__anim-exit-rev")}function D(t){var a=S[t],n=a.videoCnt?Object(o.a)({url:"".concat(window.location.protocol+"//"+window.location.host,"/media/image/").concat(a.id)},a,{mediaType:"snapshot"}):Object(o.a)({url:"".concat(window.location.protocol+"//"+window.location.host,"/media/image/").concat(a.id)},a,{mediaType:"image"});n&&"snapshot"===n.mediaType&&(O=e.video&&e.video.id!==n.id?i.a.createElement("div",{className:e.playerIcnId&&e.playerIcnId===e.que._id?"reuse-que__media--wrapper__icn reuse-que__media--wrapper__icn-move":"reuse-que__media--wrapper__icn",onClick:e.playVideo.bind(this,n)},i.a.createElement(f.a,{icon:["fas","play-circle"],className:"icon icon__reuse-que--media__play"})):null),P=i.a.createElement("div",{className:"reuse-que__media"},i.a.createElement("div",{className:e.video&&e.video.id===n.id?"reuse-que__media--main-wrapper reuse-que__media--main-wrapper__load":"reuse-que__media--main-wrapper"},i.a.createElement("div",{onDragStart:function(){return!1},"touch-action":"pan-y",className:e.disableAnim?"reuse-que__media--wrapper":F.join(" "),onAnimationEnd:e.removeAnim},O,e.video&&e.video.id===n.id&&e.video.url?i.a.createElement("video",{src:e.video.url,controls:!0,autoPlay:!0},i.a.createElement("p",null,"our browser doesn't support embedded videos")):e.video&&e.video.id===n.id?null:i.a.createElement("img",{draggable:"false",onDragStart:function(){return!1},src:n.url,alt:"question"}),e.videoErr&&e.videoErr.id===n.id?i.a.createElement("div",{className:"reuse-que__video-err"},i.a.createElement("div",{className:"reuse-que__video-err--icn",onClick:e.playVideo.bind(this,n.id,e.que.video)},i.a.createElement(f.a,{icon:["fas","redo"],className:"icon icon__reuse-que--video-err__icn"})),i.a.createElement("h3",null," ",e.videoErr.err.message," ")):null)),S&&S.length>1?i.a.createElement(v.a,null,i.a.createElement("div",{className:"reuse-que__media--cnt reuse-que__media--cnt__nxt",onClick:e.nextMedia},i.a.createElement(f.a,{icon:["fas","angle-right"],className:"icon icon__reuse-que--media__nxt"})),i.a.createElement("div",{className:"reuse-que__media--cnt reuse-que__media--cnt__prev",onClick:e.prevMedia},i.a.createElement(f.a,{icon:["fas","angle-left"],className:"icon icon__reuse-que--media__prev"}))):null)}return g>0&&(E=i.a.createElement(v.a,null,i.a.createElement("p",{className:"reuse-que__content--title reuse-que__content--title__que-img"},i.a.createElement("a",{href:"/view/question/"+e.que._id},m)),i.a.createElement("div",{className:"reuse-que__content--wrapper"},P))),e.showCnt&&e.showCnt.visible&&e.que._id===e.showCnt.id&&(n.push("reuse-que__footer--details__clk"),r.push("reuse-que__footer--details__options--visible")),e.que.userOpt&&(a=i.a.createElement("div",{className:n.join(" "),onClick:e.userOpt},i.a.createElement("div",{className:"reuse-que__footer--details__mid"}),i.a.createElement("ul",{className:r.join(" ")},i.a.createElement("li",null,i.a.createElement("a",{href:"/edit/question/".concat(e.que._id)},i.a.createElement(f.a,{icon:["far","edit"],className:"icon icon__reuse-que--options"}),"Edit")),C,i.a.createElement("li",{onClick:e.deleteCnt},i.a.createElement(f.a,{icon:["far","trash-alt"],className:"icon icon__reuse-que--options"}),"Delete")))),e.que.liked&&null===u&&(y=i.a.createElement(f.a,{icon:["fas","heart"],className:"icon icon__reuse-que--footer__heart"})),u&&(y=i.a.createElement(f.a,{icon:["fas","heart"],className:"icon icon__reuse-que--footer__heart"})),i.a.createElement("div",{className:"reuse-que"},i.a.createElement("ul",{className:"reuse-que__header"},i.a.createElement("li",null,i.a.createElement("div",{className:"reuse-que__header--category__img"},w),i.a.createElement("div",{className:"reuse-que__header--category__det"},i.a.createElement("div",{className:"reuse-que__header--category__det--name"},i.a.createElement("a",{href:"/user/profile/".concat(e.que.authorID)},e.que.username)),i.a.createElement("div",{className:"reuse-que__header--category__det--timePosted"},"@ ",i.a.createElement(d.a,{date:e.que.queCreated,live:!1,formatter:t})))),i.a.createElement("li",null,i.a.createElement("p",{className:"reuse-que__header--share__category"},i.a.createElement(f.a,{icon:e.que.category.length>1?["fas","tags"]:["fas","tag"],className:"icon icon__reuse-que--header__tag"}),e.que.category[0]),i.a.createElement("div",{className:"reuse-share"},i.a.createElement("div",{className:"reuse-share__icn",onClick:e.share},i.a.createElement(f.a,{icon:["fas","location-arrow"],className:"icon icon__reuse-share--icn"}))))),i.a.createElement("div",{className:"reuse-que__content"},E),i.a.createElement("div",{className:"reuse-que__ans"},i.a.createElement("div",{className:"reuse-que__ans--wrapper"},i.a.createElement("div",{className:"reuse-que__ans--total"},e.que.comment),"Answer")),i.a.createElement("div",{className:"reuse-que__footer"},i.a.createElement("ul",{className:"reuse-que__footer--list"},i.a.createElement("li",null,i.a.createElement(f.a,{icon:["far","thumbs-up"],className:"icon icon__reuse-que--footer__thumbup"}),Object(_.d)(e.que.helpFull)),i.a.createElement("li",{className:"reuse-que__footer--list__item-middle"},i.a.createElement(f.a,{icon:["far","thumbs-down"],className:"icon icon__reuse-que--footer__thumbdown"}),Object(_.d)(e.que.notHelpFull)),i.a.createElement("li",null,i.a.createElement("span",{onClick:e.fav},y),Object(_.d)(null!==s?s:e.que.favorite),e.favChange&&e.favChange.id===e.que._id?i.a.createElement(q.a,{liked:e.favChange.isLiked}):null)),a))};t.a=function(e){return s()(e.content,"queCreated",{reverse:!0}).map(function(t,a){return i.a.createElement(g,{key:a,que:t,media:e.media,userOpt:e.userOpt.bind(void 0,t._id),showCnt:e.showCntOpt,fav:e.fav.bind(void 0,t._id,t.liked,t.favorite,"question"),changedFav:e.changedFav,favChange:e.favChange,share:e.share.bind(void 0,t._id),nextMedia:e.nextMedia.bind(void 0,t._id,t.snapshot.length+t.image.length,"next"),prevMedia:e.prevMedia.bind(void 0,t._id,t.snapshot.length+t.image.length,"prev"),mediaItms:e.mediaItms,removeAnim:e.removeAnim,disableAnim:e.disableAnim,animateItm:e.animateItm,removePrevMedia:e.removePrevMedia,playVideo:e.playVideo,videoErr:e.videoErr,playerIcnId:e.playerIcnId,slidePlay:e.slidePlay,moveSlidePlay:e.moveSlidePlay,clearSlidePlay:e.clearSlidePlay,video:e.video,deleteCnt:e.changeCnt.bind(void 0,t._id,t.title,"delete","question"),changeCnt:e.changeCnt.bind(void 0,t._id,t.title,"draft","question")})})}},673:function(e,t,a){"use strict";a.r(t);var n=a(93),i=a(37),r=a(20),s=a(21),o=a(22),c=a(23),l=a(0),u=a.n(l),d=a(24),m=a(86),p=(a(650),a(652)),h=a(40),_=a(78),v=a(3),f=a(5),q=!0,g=function(e){Object(c.a)(a,e);var t=Object(o.a)(a);function a(e){var s;Object(r.a)(this,a),(s=t.call(this,e)).onScroll=function(){window.innerHeight+Math.ceil(window.pageYOffset+1)>=document.body.offsetHeight&&s.props.onFetchCnt(s.props.userID,"question"!==s.state.filterTag?"filter"===s.state.filterTag?"filter=="+s.props.filterDet:"question-".concat(s.state.filterTag):"question",s.state.fetchLimit,s.props.skipCnt+s.state.fetchLimit,s.props.cntTotal)},s.showUserOptHandler=function(e){if(s.state.cntOpt&&s.state.cntOpt.id===e)s.setState(function(e,t){return{cntOpt:Object(v.f)(e.cntOpt,{visible:!e.cntOpt.visible})}});else{var t={visible:!0,id:e};s.setState({cntOpt:t})}},s.changeFavoriteHandler=function(e,t,a,n){s.props.onChangeFav(e,t,a,s.props.changedFav,s.props.userID,n)},s.showShareHandler=function(e){s.props.onChangeShareID(e,"question"),s.props.history.push("/index/question/share")},s.changeMediaHandler=function(e,t,a){s.setState({removePrevMedia:{id:e,type:a},removeAnim:!1}),s.animateSlider(e,t,a,900)},s.removeAnimHandler=function(e){s.state.removePrevMedia||s.setState({removeAnim:!0})},s.playVideoHandler=function(e){s.props.onFetchVideo(e.id,"".concat(window.location.protocol+"//"+window.location.host,"/media/video/").concat(e.videoCnt))},s.slidePlayHandler=function(e,t,a){a.target.setPointerCapture(a.pointerId),s.setState({playerIcnId:e})},s.clearSlidePlayhandler=function(e){var t=e.target;t.releasePointerCapture(e.pointerId),t.style.left="0px";var a=document.querySelector(".reuse-que__media--wrapper__icn-move");a&&(a.style.left="42%")},s.moveSlidePlayHandler=function(e,t,a){var n=a.target;if(n.hasPointerCapture&&n.hasPointerCapture(a.pointerId)){var i=a.clientX-n.parentElement.offsetLeft-n.offsetWidth/2;i<-(n.offsetWidth/2+n.offsetWidth/4)?q&&(q=!1,s.animateSlider(e,t,"next",0)):i>n.offsetWidth/2+n.offsetWidth/4&&q&&(q=!1,s.animateSlider(e,t,"prev",0));var r=document.querySelector(".reuse-que__media--wrapper__icn-move");if(r){var o=i/n.offsetWidth*100;r.style.left=o+42+"%"}n.style.left=i+"px"}},s.animateSlider=function(e,t,a,r){setTimeout(function(){var r=Object(i.a)(s.state.mediaItms),o=r.filter(function(t){return t.id===e}),c={id:e,position:"next"===a?t>1?1:0:t-1};if(o.length>0){var l,u=Object(n.a)(o);try{for(u.s();!(l=u.n()).done;){var d=l.value;(c={id:d.id,position:"next"===a?d.position+=1:d.position-=1}).position>t-1&&(c=Object(v.f)(c,{position:0})),c.position<0&&(c=Object(v.f)(c,{position:t-1}));var m=r.filter(function(t){return t.id!==e});m.push(c),s.setState({mediaItms:m,removeAnim:!1,removePrevMedia:null,animateItm:{id:e,direction:a}})}}catch(p){u.e(p)}finally{u.f()}}else r.push(c),s.setState({mediaItms:r,removeAnim:!1,removePrevMedia:null,animateItm:{id:e,direction:a}})},r),setTimeout(function(){q=!0},500)},s.changeCntHandler=function(e,t,a,n){var i=String(t).length>50?String(t).substr(0,50)+"...":t;s.props.onChangeCnt(e,i,a,!1,n)},s.props.onFetchCntReset();var o=0;return o=window.innerHeight>=1200?18:window.innerHeight>=900?12:window.innerHeight>=500?9:6,s.state={cntOpt:null,fetchLimit:o,filterTag:"question",mediaItms:[],animateItm:null,removeAnim:!1,removePrevMedia:null,playerIcnId:null,animationComplete:!0,scrollEnable:!1},s}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.props.onFetchCnt(this.props.userID,this.state.filterTag,this.state.fetchLimit,0,0),this.props.onChangeTag("/question")}},{key:"componentDidUpdate",value:function(){this.props.cnts&&this.props.cnts.length>0&&!this.state.scrollEnable&&(window.addEventListener("scroll",this.onScroll,!1),this.setState({scrollEnable:!0})),this.props.match.params.id&&this.state.filterTag!==this.props.match.params.id&&"share"!==this.props.match.params.id&&"filter"!==this.props.match.params.id&&"startfilter"!==this.props.match.params.id&&(this.props.onFetchCntReset(),this.props.onFetchCnt(this.props.userID,"question-".concat(this.props.match.params.id),this.state.fetchLimit,0,0),this.setState({filterTag:this.props.match.params.id}))}},{key:"componentWillUnmount",value:function(){this.props.onFetchCntReset(),window.removeEventListener("scroll",this.onScroll,!1)}},{key:"render",value:function(){var e=u.a.createElement(h.a,null);return this.props.cntErr&&(e=null),this.props.cnts&&0===this.props.cnts.length&&(e=u.a.createElement(_.a,{isAuth:null!==this.props.userID,det:"No content found!",icn:"clone",filter:!0})),this.props.cnts&&0===this.props.cnts.length&&(e=u.a.createElement(_.a,{isAuth:null!==this.props.userID,det:"No content found!",icn:"clone",filter:!0})),this.props.cnts&&this.props.cnts.length>0&&(e=u.a.createElement(p.a,{content:this.props.cnts,media:this.props.media,userOpt:this.showUserOptHandler,showCntOpt:this.state.cntOpt,fav:this.changeFavoriteHandler,changedFav:this.props.changedFav,favChange:this.props.favChange,share:this.showShareHandler,nextMedia:this.changeMediaHandler,prevMedia:this.changeMediaHandler,mediaItms:this.state.mediaItms,removeAnim:this.removeAnimHandler,disableAnim:this.state.removeAnim,animateItm:this.state.animateItm,removePrevMedia:this.state.removePrevMedia,playVideo:this.playVideoHandler,videoErr:this.props.videoErr,video:this.props.postVideo,playerIcnId:this.state.playerIcnId,slidePlay:this.slidePlayHandler,moveSlidePlay:this.moveSlidePlayHandler,clearSlidePlay:this.clearSlidePlayhandler,changeCnt:this.changeCntHandler})),e}}]),a}(l.Component);t.default=Object(m.f)(Object(d.b)(function(e){return{userID:e.auth.userID,cnts:e.cnt.cnts,skipCnt:e.cnt.skipCnt,cntTotal:e.cnt.cntTotal,changedFav:e.cnt.changedFav,favChange:e.cnt.favChange,cntErr:e.cnt.cntErr,postVideo:e.cnt.postVideo,videoErr:e.cnt.videoErr,filterDet:e.cnt.filterDet}},function(e){return{onFetchShareActive:function(){return e(f.sb())},onFetchShareCntActive:function(){return e(f.rb())},onFetchCntActive:function(){return e(f.K())},onFetchNotifyActive:function(){return e(f.ib())},onFetchPtActive:function(){return e(f.kb())},onFetchQueActive:function(){return e(f.mb())},onFetchReqActive:function(){return e(f.ob())},onFetchCnt:function(t,a,n,i,r){return e(f.N(t,a,n,i,r))},onFetchCntReset:function(){return e(f.O())},onChangeFav:function(t,a,n,i,r,s){return e(f.h(t,a,n,i,r,s))},onChangeShareID:function(t,a){return e(f.ic(t,a))},onChangeTag:function(t){return e(f.w(t))},onFetchVideo:function(t,a){return e(f.Cb(t,a))},onChangeCnt:function(t,a,n,i,r){return e(f.d(t,a,n,i,r))}}})(g))}}]);
//# sourceMappingURL=7.77019ab5.chunk.js.map