(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{651:function(e,t,a){},655:function(e,t,a){"use strict";var n=a(87),i=a(16),r=a(17),s=a(18),o=a(19),c=a(0),l=a.n(c),u=a(8),d=a(800),m=a(788),p=(a(656),function(e){Object(o.a)(a,e);var t=Object(s.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={items:e.props.images,currentIndex:0,video:null,isNext:!0},e.prevMediaHandler=function(){var t=e.state.currentIndex,a=e.state.items.length;t<1&&(t=a),t-=1,e.setState({currentIndex:t,isNext:!1})},e.nextMediaHandler=function(){var t=e.state.currentIndex;t===e.state.items.length-1&&(t=-1),t+=1,e.setState({currentIndex:t,isNext:!0})},e.playVideoHandler=function(t){e.setState({video:{url:"".concat(window.location.protocol+"//"+window.location.host,"/media/video/").concat(t.videoCnt),id:t.id}})},e}return Object(r.a)(a,[{key:"render",value:function(){var e=this.state.currentIndex,t=this.state.isNext,a=this.state.items[e],i=a.videoCnt?Object(n.a)({url:"".concat(window.location.protocol+"//"+window.location.host,"/media/image/").concat(a.id)},a,{mediaType:"snapshot"}):Object(n.a)({url:"".concat(window.location.protocol+"//"+window.location.host,"/media/image/").concat(a.id)},a,{mediaType:"image"}),r=null,s=null;i&&"snapshot"===i.mediaType&&(r=l.a.createElement("div",{className:this.props.playClass,onClick:this.playVideoHandler.bind(this,a)},l.a.createElement(u.a,{icon:["fas","play-circle"],className:this.props.playIcnClass}))),this.state.items.length>1&&(s=l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:this.props.nextClass,onClick:this.nextMediaHandler},l.a.createElement(u.a,{icon:["fas","angle-right"],className:this.props.nextIcnClass})),l.a.createElement("div",{className:this.props.prevClass,onClick:this.prevMediaHandler},l.a.createElement(u.a,{icon:["fas","angle-left"],className:this.props.prevIcnClass}))));var o=l.a.createElement("img",{alt:"",src:i.url});return this.state.video&&this.state.video.id===i.id&&this.state.video.url&&(r=null,o=l.a.createElement("video",{src:this.state.video.url,controls:!0,autoPlay:!0},l.a.createElement("p",null,"our browser doesn't support embedded videos"))),l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:this.props.wrapperClass},l.a.createElement(d.a,{component:null},l.a.createElement(m.a,{key:e,classNames:{enter:t?"enter-next":"enter-prev",enterActive:"enter-active",exit:"exit",exitActive:t?"exit-active-next":"exit-active-prev"},timeout:500},l.a.createElement("div",{className:"reuse-cnt__media--currentIndex",key:e},r,o)))),s)}}]),a}(c.Component));t.a=p},656:function(e,t,a){},775:function(e,t,a){},792:function(e,t,a){"use strict";a.r(t);var n=a(93),i=a(37),r=a(16),s=a(17),o=a(18),c=a(19),l=a(0),u=a.n(l),d=a(24),m=a(86),p=(a(664),a(124)),h=a.n(p),v=a(125),f=a.n(v),_=a(126),g=a.n(_),q=a(73),E=(a(775),a(651),a(3)),C=a(62),y=a(8),w=a(99),b=a(655),I=function(e){var t=g()(E.c),a=null,r=["reuse-que__footer--details"],s=["reuse-que__footer--details__options"],o=null,c=null,l=String(e.que.title).length>149?String(e.que.title).substr(0,150)+"...":e.que.title,d=e.que.snapshot.length+e.que.image.length,m=u.a.createElement("p",{className:"reuse-que__content--title"},u.a.createElement("a",{href:"/view/question/"+e.que._id},l)),p=u.a.createElement("li",{className:"reuse-que__footer--details__options--status",onClick:e.changeCnt},u.a.createElement(y.a,{icon:["far","eye-slash"],className:"icon icon__reuse-que--options__dft"}),"Draft"),h=u.a.createElement(y.a,{icon:["far","heart"],className:"icon icon__reuse-que--footer__heart"}),v=u.a.createElement("img",{src:e.que.userImage,alt:""});"draft"===e.que.mode&&(p=u.a.createElement("li",{className:"reuse-que__footer--details__options--status",onClick:e.changeCntPublish},u.a.createElement(y.a,{icon:["far","eye"],className:"icon icon__reuse-que--options__dft"}),"Publish")),e.que.username&&!e.que.userImage&&(v=u.a.createElement(q.a,{name:e.que.username,size:"36",round:!0}));var _,I=Object(n.a)(e.changedFav);try{for(I.s();!(_=I.n()).done;){var N=_.value;e.que._id===N.id&&(o=N.favAdd,c=N.liked)}}catch(x){I.e(x)}finally{I.f()}var O=null,S=[].concat(Object(i.a)(e.que.snapshot),Object(i.a)(e.que.image));return S.length>0&&(O=u.a.createElement("div",{className:"reuse-que__media"},u.a.createElement("div",{className:"reuse-que__media--main-wrapper"},u.a.createElement(b.a,{images:S,wrapperClass:"reuse-que__media--wrapper",prevClass:"reuse-que__media--cnt reuse-que__media--cnt__prev",prevIcnClass:"icon icon__reuse-que--media__prev",nextClass:"reuse-que__media--cnt reuse-que__media--cnt__nxt",nextIcnClass:"icon icon__reuse-que--media__nxt",playClass:"reuse-que__media--wrapper__icn",playIcnClass:"icon icon__reuse-que--media__play"})))),d>0&&(m=u.a.createElement(C.a,null,u.a.createElement("p",{className:"reuse-que__content--title reuse-que__content--title__que-img"},u.a.createElement("a",{href:"/view/question/"+e.que._id},l)),u.a.createElement("div",{className:"reuse-que__content--wrapper"},O))),e.showCnt&&e.showCnt.visible&&e.que._id===e.showCnt.id&&(r.push("reuse-que__footer--details__clk"),s.push("reuse-que__footer--details__options--visible")),e.que.userOpt&&(a=u.a.createElement("div",{className:r.join(" "),onClick:e.userOpt},u.a.createElement("div",{className:"reuse-que__footer--details__mid"}),u.a.createElement("ul",{className:s.join(" ")},u.a.createElement("li",null,u.a.createElement("a",{href:"/edit/question/".concat(e.que._id)},u.a.createElement(y.a,{icon:["far","edit"],className:"icon icon__reuse-que--options"}),"Edit")),p,u.a.createElement("li",{onClick:e.deleteCnt},u.a.createElement(y.a,{icon:["far","trash-alt"],className:"icon icon__reuse-que--options"}),"Delete")))),e.que.liked&&null===c&&(h=u.a.createElement(y.a,{icon:["fas","heart"],className:"icon icon__reuse-que--footer__heart"})),c&&(h=u.a.createElement(y.a,{icon:["fas","heart"],className:"icon icon__reuse-que--footer__heart"})),u.a.createElement("div",{className:"reuse-que"},u.a.createElement("ul",{className:"reuse-que__header"},u.a.createElement("li",null,u.a.createElement("div",{className:"reuse-que__header--category__img"},v),u.a.createElement("div",{className:"reuse-que__header--category__det"},u.a.createElement("div",{className:"reuse-que__header--category__det--name"},u.a.createElement("a",{href:"/user/profile/".concat(e.que.authorID)},e.que.username)),u.a.createElement("div",{className:"reuse-que__header--category__det--timePosted"},"@ ",u.a.createElement(f.a,{date:e.que.queCreated,live:!1,formatter:t})))),u.a.createElement("li",null,u.a.createElement("p",{className:"reuse-que__header--share__category"},u.a.createElement(y.a,{icon:e.que.category.length>1?["fas","tags"]:["fas","tag"],className:"icon icon__reuse-que--header__tag"}),e.que.category[0]),u.a.createElement("div",{className:"reuse-share"},u.a.createElement("div",{className:"reuse-share__icn",onClick:e.share},u.a.createElement(y.a,{icon:["fas","location-arrow"],className:"icon icon__reuse-share--icn"}))))),u.a.createElement("div",{className:"reuse-que__content"},m),u.a.createElement("div",{className:"reuse-que__ans"},u.a.createElement("div",{className:"reuse-que__ans--wrapper"},u.a.createElement("div",{className:"reuse-que__ans--total"},e.que.comment),"Answer")),u.a.createElement("div",{className:"reuse-que__footer"},u.a.createElement("ul",{className:"reuse-que__footer--list"},u.a.createElement("li",null,u.a.createElement(y.a,{icon:["far","thumbs-up"],className:"icon icon__reuse-que--footer__thumbup"}),Object(E.d)(e.que.helpFull)),u.a.createElement("li",{className:"reuse-que__footer--list__item-middle"},u.a.createElement(y.a,{icon:["far","thumbs-down"],className:"icon icon__reuse-que--footer__thumbdown"}),Object(E.d)(e.que.notHelpFull)),u.a.createElement("li",null,u.a.createElement("span",{onClick:e.fav},h),Object(E.d)(null!==o?o:e.que.favorite),e.favChange&&e.favChange.id===e.que._id?u.a.createElement(w.a,{liked:e.favChange.isLiked}):null)),a))},N=function(e){return h()(e.content,"queCreated",{reverse:!0}).map(function(t,a){return u.a.createElement(I,{key:a,que:t,media:e.media,userOpt:e.userOpt.bind(void 0,t._id),showCnt:e.showCntOpt,fav:e.fav.bind(void 0,t._id,t.liked,t.favorite,"question"),changedFav:e.changedFav,favChange:e.favChange,share:e.share.bind(void 0,t._id),nextMedia:e.nextMedia.bind(void 0,t._id,t.snapshot.length+t.image.length,"next"),prevMedia:e.prevMedia.bind(void 0,t._id,t.snapshot.length+t.image.length,"prev"),mediaItms:e.mediaItms,removeAnim:e.removeAnim,disableAnim:e.disableAnim,animateItm:e.animateItm,removePrevMedia:e.removePrevMedia,playVideo:e.playVideo,videoErr:e.videoErr,playerIcnId:e.playerIcnId,slidePlay:e.slidePlay,moveSlidePlay:e.moveSlidePlay,clearSlidePlay:e.clearSlidePlay,video:e.video,deleteCnt:e.changeCnt.bind(void 0,t._id,t.title,"delete","question"),changeCnt:e.changeCnt.bind(void 0,t._id,t.title,"draft","question")})})},O=a(40),S=a(78),x=a(5),F=!0,P=function(e){Object(c.a)(a,e);var t=Object(o.a)(a);function a(e){var s;Object(r.a)(this,a),(s=t.call(this,e)).onScroll=function(){window.innerHeight+Math.ceil(window.pageYOffset+1)>=document.body.offsetHeight&&s.props.onFetchCnt(s.props.userID,"question"!==s.state.filterTag?"filter"===s.state.filterTag?"filter=="+s.props.filterDet:"question-".concat(s.state.filterTag):"question",s.state.fetchLimit,s.props.skipCnt+s.state.fetchLimit,s.props.cntTotal)},s.showUserOptHandler=function(e){if(s.state.cntOpt&&s.state.cntOpt.id===e)s.setState(function(e,t){return{cntOpt:Object(E.f)(e.cntOpt,{visible:!e.cntOpt.visible})}});else{var t={visible:!0,id:e};s.setState({cntOpt:t})}},s.changeFavoriteHandler=function(e,t,a,n){s.props.onChangeFav(e,t,a,s.props.changedFav,s.props.userID,n)},s.showShareHandler=function(e){s.props.onChangeShareID(e,"question"),s.props.history.push("/index/question/share")},s.changeMediaHandler=function(e,t,a){s.setState({removePrevMedia:{id:e,type:a},removeAnim:!1}),s.animateSlider(e,t,a,900)},s.removeAnimHandler=function(e){s.state.removePrevMedia||s.setState({removeAnim:!0})},s.playVideoHandler=function(e){s.props.onFetchVideo(e.id,"".concat(window.location.protocol+"//"+window.location.host,"/media/video/").concat(e.videoCnt))},s.slidePlayHandler=function(e,t,a){a.target.setPointerCapture(a.pointerId),s.setState({playerIcnId:e})},s.clearSlidePlayhandler=function(e){var t=e.target;t.releasePointerCapture(e.pointerId),t.style.left="0px";var a=document.querySelector(".reuse-que__media--wrapper__icn-move");a&&(a.style.left="42%")},s.moveSlidePlayHandler=function(e,t,a){var n=a.target;if(n.hasPointerCapture&&n.hasPointerCapture(a.pointerId)){var i=a.clientX-n.parentElement.offsetLeft-n.offsetWidth/2;i<-(n.offsetWidth/2+n.offsetWidth/4)?F&&(F=!1,s.animateSlider(e,t,"next",0)):i>n.offsetWidth/2+n.offsetWidth/4&&F&&(F=!1,s.animateSlider(e,t,"prev",0));var r=document.querySelector(".reuse-que__media--wrapper__icn-move");if(r){var o=i/n.offsetWidth*100;r.style.left=o+42+"%"}n.style.left=i+"px"}},s.animateSlider=function(e,t,a,r){setTimeout(function(){var r=Object(i.a)(s.state.mediaItms),o=r.filter(function(t){return t.id===e}),c={id:e,position:"next"===a?t>1?1:0:t-1};if(o.length>0){var l,u=Object(n.a)(o);try{for(u.s();!(l=u.n()).done;){var d=l.value;(c={id:d.id,position:"next"===a?d.position+=1:d.position-=1}).position>t-1&&(c=Object(E.f)(c,{position:0})),c.position<0&&(c=Object(E.f)(c,{position:t-1}));var m=r.filter(function(t){return t.id!==e});m.push(c),s.setState({mediaItms:m,removeAnim:!1,removePrevMedia:null,animateItm:{id:e,direction:a}})}}catch(p){u.e(p)}finally{u.f()}}else r.push(c),s.setState({mediaItms:r,removeAnim:!1,removePrevMedia:null,animateItm:{id:e,direction:a}})},r),setTimeout(function(){F=!0},500)},s.changeCntHandler=function(e,t,a,n){var i=String(t).length>50?String(t).substr(0,50)+"...":t;s.props.onChangeCnt(e,i,a,!1,n)},s.props.onFetchCntReset();var o=0;return o=window.innerHeight>=1200?18:window.innerHeight>=900?12:window.innerHeight>=500?9:6,s.state={cntOpt:null,fetchLimit:o,filterTag:"question",mediaItms:[],animateItm:null,removeAnim:!1,removePrevMedia:null,playerIcnId:null,animationComplete:!0,scrollEnable:!1},s}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.props.onFetchCnt(this.props.userID,this.state.filterTag,this.state.fetchLimit,0,0),this.props.onChangeTag("/question")}},{key:"componentDidUpdate",value:function(){this.props.cnts&&this.props.cnts.length>0&&!this.state.scrollEnable&&(window.addEventListener("scroll",this.onScroll,!1),this.setState({scrollEnable:!0})),this.props.match.params.id&&this.state.filterTag!==this.props.match.params.id&&"share"!==this.props.match.params.id&&"filter"!==this.props.match.params.id&&"startfilter"!==this.props.match.params.id&&(this.props.onFetchCntReset(),this.props.onFetchCnt(this.props.userID,"question-".concat(this.props.match.params.id),this.state.fetchLimit,0,0),this.setState({filterTag:this.props.match.params.id}))}},{key:"componentWillUnmount",value:function(){this.props.onFetchCntReset(),window.removeEventListener("scroll",this.onScroll,!1)}},{key:"render",value:function(){var e=u.a.createElement(O.a,null);return this.props.cntErr&&(e=null),this.props.cnts&&0===this.props.cnts.length&&(e=u.a.createElement(S.a,{isAuth:null!==this.props.userID,det:"No content found!",icn:"clone",filter:!0})),this.props.cnts&&0===this.props.cnts.length&&(e=u.a.createElement(S.a,{isAuth:null!==this.props.userID,det:"No content found!",icn:"clone",filter:!0})),this.props.cnts&&this.props.cnts.length>0&&(e=u.a.createElement(N,{content:this.props.cnts,media:this.props.media,userOpt:this.showUserOptHandler,showCntOpt:this.state.cntOpt,fav:this.changeFavoriteHandler,changedFav:this.props.changedFav,favChange:this.props.favChange,share:this.showShareHandler,nextMedia:this.changeMediaHandler,prevMedia:this.changeMediaHandler,mediaItms:this.state.mediaItms,removeAnim:this.removeAnimHandler,disableAnim:this.state.removeAnim,animateItm:this.state.animateItm,removePrevMedia:this.state.removePrevMedia,playVideo:this.playVideoHandler,videoErr:this.props.videoErr,video:this.props.postVideo,playerIcnId:this.state.playerIcnId,slidePlay:this.slidePlayHandler,moveSlidePlay:this.moveSlidePlayHandler,clearSlidePlay:this.clearSlidePlayhandler,changeCnt:this.changeCntHandler})),e}}]),a}(l.Component);t.default=Object(m.f)(Object(d.b)(function(e){return{userID:e.auth.userID,cnts:e.cnt.cnts,skipCnt:e.cnt.skipCnt,cntTotal:e.cnt.cntTotal,changedFav:e.cnt.changedFav,favChange:e.cnt.favChange,cntErr:e.cnt.cntErr,postVideo:e.cnt.postVideo,videoErr:e.cnt.videoErr,filterDet:e.cnt.filterDet}},function(e){return{onFetchShareActive:function(){return e(x.sb())},onFetchShareCntActive:function(){return e(x.rb())},onFetchCntActive:function(){return e(x.K())},onFetchNotifyActive:function(){return e(x.ib())},onFetchPtActive:function(){return e(x.kb())},onFetchQueActive:function(){return e(x.mb())},onFetchReqActive:function(){return e(x.ob())},onFetchCnt:function(t,a,n,i,r){return e(x.N(t,a,n,i,r))},onFetchCntReset:function(){return e(x.O())},onChangeFav:function(t,a,n,i,r,s){return e(x.h(t,a,n,i,r,s))},onChangeShareID:function(t,a){return e(x.ic(t,a))},onChangeTag:function(t){return e(x.w(t))},onFetchVideo:function(t,a){return e(x.Cb(t,a))},onChangeCnt:function(t,a,n,i,r){return e(x.d(t,a,n,i,r))}}})(P))}}]);
//# sourceMappingURL=17.1cdacec4.chunk.js.map