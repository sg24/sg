(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{501:function(e,t,a){},503:function(e,t,a){},504:function(e,t,a){"use strict";var i=a(0),n=a.n(i),s=a(97),r=a.n(s),o=a(67),l=a(73),c=a(98),d=a.n(c),m=a(99),u=a.n(m),h=a(53),p=(a(503),a(501),a(2)),_=a(43),v=a(9),f=a(79);var q=e=>{const t=u()(p.c);let a=null,i=["reuse-que__footer--details"],s=["reuse-que__footer--details__options"],r=null,c=null,m=String(e.que.title).length>149?String(e.que.title).substr(0,150)+"...":e.que.title,q=e.que.snapshot.length+e.que.image.length,g=n.a.createElement("p",{className:"reuse-que__content--title"},n.a.createElement("a",{href:"/view/question/"+e.que._id},m)),E=n.a.createElement("li",{className:"reuse-que__footer--details__options--status",onClick:e.changeCnt},n.a.createElement(v.a,{icon:["far","eye-slash"],className:"icon icon__reuse-que--options__dft"}),"Draft"),w=n.a.createElement(v.a,{icon:["far","heart"],className:"icon icon__reuse-que--footer__heart"}),C=n.a.createElement("img",{src:e.que.userImage,alt:""});"draft"===e.que.mode&&(E=n.a.createElement("li",{className:"reuse-que__footer--details__options--status",onClick:e.changeCntPublish},n.a.createElement(v.a,{icon:["far","eye"],className:"icon icon__reuse-que--options__dft"}),"Publish")),e.que.username&&!e.que.userImage&&(C=n.a.createElement(h.a,{name:e.que.username,size:"36",round:!0}));var y,b=Object(l.a)(e.changedFav);try{for(b.s();!(y=b.n()).done;){let t=y.value;e.que._id===t.id&&(r=t.favAdd,c=t.liked)}}catch(H){b.e(H)}finally{b.f()}let N=null,I=[...e.que.snapshot,...e.que.image],P=null,S=["reuse-que__media--wrapper"];if(I.length>0){let t=!1;var O,A=Object(l.a)(e.mediaItms);try{for(A.s();!(O=A.n()).done;){let a=O.value;a.id===e.que._id&&(t=!0,e.animateItm.id===e.que._id&&("next"!==e.animateItm.direction||e.removePrevAnim||S.push("reuse-que__media--wrapper__anim"),"prev"!==e.animateItm.direction||e.removePrevAnim||S.push("reuse-que__media--wrapper__anim-rev")),e.removePrevMedia&&e.removePrevMedia.id===e.que._id&&F(e.removePrevMedia),M(a.position))}}catch(H){A.e(H)}finally{A.f()}t||(e.removePrevMedia&&e.removePrevMedia.id===e.que._id&&F(e.removePrevMedia),M(0))}function F(e){"next"===e.type?S.push("reuse-que__media--wrapper__anim-exit"):S.push("reuse-que__media--wrapper__anim-exit-rev")}function M(t){let a=I[t],i=a.videoCnt?Object(o.a)({url:"".concat(window.location.protocol+"//"+window.location.host,"/media/image/").concat(a.id)},a,{mediaType:"snapshot"}):Object(o.a)({url:"".concat(window.location.protocol+"//"+window.location.host,"/media/image/").concat(a.id)},a,{mediaType:"image"});i&&"snapshot"===i.mediaType&&(P=e.video&&e.video.id!==i.id?n.a.createElement("div",{className:e.playerIcnId&&e.playerIcnId===e.que._id?"reuse-que__media--wrapper__icn reuse-que__media--wrapper__icn-move":"reuse-que__media--wrapper__icn",onClick:e.playVideo.bind(this,i)},n.a.createElement(v.a,{icon:["fas","play-circle"],className:"icon icon__reuse-que--media__play"})):null),N=n.a.createElement("div",{className:"reuse-que__media"},n.a.createElement("div",{className:e.video&&e.video.id===i.id?"reuse-que__media--main-wrapper reuse-que__media--main-wrapper__load":"reuse-que__media--main-wrapper"},n.a.createElement("div",{onDragStart:()=>!1,"touch-action":"pan-y",className:e.disableAnim?"reuse-que__media--wrapper":S.join(" "),onAnimationEnd:e.removeAnim},P,e.video&&e.video.id===i.id&&e.video.url?n.a.createElement("video",{src:e.video.url,controls:!0,autoPlay:!0},n.a.createElement("p",null,"our browser doesn't support embedded videos")):e.video&&e.video.id===i.id?null:n.a.createElement("img",{draggable:"false",onDragStart:()=>!1,src:i.url,alt:"question"}),e.videoErr&&e.videoErr.id===i.id?n.a.createElement("div",{className:"reuse-que__video-err"},n.a.createElement("div",{className:"reuse-que__video-err--icn",onClick:e.playVideo.bind(this,i.id,e.que.video)},n.a.createElement(v.a,{icon:["fas","redo"],className:"icon icon__reuse-que--video-err__icn"})),n.a.createElement("h3",null," ",e.videoErr.err.message," ")):null)),I&&I.length>1?n.a.createElement(_.a,null,n.a.createElement("div",{className:"reuse-que__media--cnt reuse-que__media--cnt__nxt",onClick:e.nextMedia},n.a.createElement(v.a,{icon:["fas","angle-right"],className:"icon icon__reuse-que--media__nxt"})),n.a.createElement("div",{className:"reuse-que__media--cnt reuse-que__media--cnt__prev",onClick:e.prevMedia},n.a.createElement(v.a,{icon:["fas","angle-left"],className:"icon icon__reuse-que--media__prev"}))):null)}return q>0&&(g=n.a.createElement(_.a,null,n.a.createElement("p",{className:"reuse-que__content--title reuse-que__content--title__que-img"},n.a.createElement("a",{href:"/view/question/"+e.que._id},m)),n.a.createElement("div",{className:"reuse-que__content--wrapper"},N))),e.showCnt&&e.showCnt.visible&&e.que._id===e.showCnt.id&&(i.push("reuse-que__footer--details__clk"),s.push("reuse-que__footer--details__options--visible")),e.que.userOpt&&(a=n.a.createElement("div",{className:i.join(" "),onClick:e.userOpt},n.a.createElement("div",{className:"reuse-que__footer--details__mid"}),n.a.createElement("ul",{className:s.join(" ")},n.a.createElement("li",null,n.a.createElement("a",{href:"/edit/question/".concat(e.que._id)},n.a.createElement(v.a,{icon:["far","edit"],className:"icon icon__reuse-que--options"}),"Edit")),E,n.a.createElement("li",{onClick:e.deleteCnt},n.a.createElement(v.a,{icon:["far","trash-alt"],className:"icon icon__reuse-que--options"}),"Delete")))),e.que.liked&&null===c&&(w=n.a.createElement(v.a,{icon:["fas","heart"],className:"icon icon__reuse-que--footer__heart"})),c&&(w=n.a.createElement(v.a,{icon:["fas","heart"],className:"icon icon__reuse-que--footer__heart"})),n.a.createElement("div",{className:"reuse-que"},n.a.createElement("ul",{className:"reuse-que__header"},n.a.createElement("li",null,n.a.createElement("div",{className:"reuse-que__header--category__img"},C),n.a.createElement("div",{className:"reuse-que__header--category__det"},n.a.createElement("div",{className:"reuse-que__header--category__det--name"},n.a.createElement("a",{href:"/user/profile/".concat(e.que.authorID)},e.que.username)),n.a.createElement("div",{className:"reuse-que__header--category__det--timePosted"},"@ ",n.a.createElement(d.a,{date:e.que.queCreated,live:!1,formatter:t})))),n.a.createElement("li",null,n.a.createElement("p",{className:"reuse-que__header--share__category"},n.a.createElement(v.a,{icon:e.que.category.length>1?["fas","tags"]:["fas","tag"],className:"icon icon__reuse-que--header__tag"}),e.que.category[0]),n.a.createElement("div",{className:"reuse-share"},n.a.createElement("div",{className:"reuse-share__icn",onClick:e.share},n.a.createElement(v.a,{icon:["fas","location-arrow"],className:"icon icon__reuse-share--icn"}))))),n.a.createElement("div",{className:"reuse-que__content"},g),n.a.createElement("div",{className:"reuse-que__ans"},n.a.createElement("div",{className:"reuse-que__ans--wrapper"},n.a.createElement("div",{className:"reuse-que__ans--total"},e.que.comment),"Answer")),n.a.createElement("div",{className:"reuse-que__footer"},n.a.createElement("ul",{className:"reuse-que__footer--list"},n.a.createElement("li",null,n.a.createElement(v.a,{icon:["far","thumbs-up"],className:"icon icon__reuse-que--footer__thumbup"}),Object(p.d)(e.que.helpFull)),n.a.createElement("li",{className:"reuse-que__footer--list__item-middle"},n.a.createElement(v.a,{icon:["far","thumbs-down"],className:"icon icon__reuse-que--footer__thumbdown"}),Object(p.d)(e.que.notHelpFull)),n.a.createElement("li",null,n.a.createElement("span",{onClick:e.fav},w),Object(p.d)(null!==r?r:e.que.favorite),e.favChange&&e.favChange.id===e.que._id?n.a.createElement(f.a,{liked:e.favChange.isLiked}):null)),a))};t.a=(e=>{return r()(e.content,"queCreated",{reverse:!0}).map((t,a)=>n.a.createElement(q,{key:a,que:t,media:e.media,userOpt:e.userOpt.bind(void 0,t._id),showCnt:e.showCntOpt,fav:e.fav.bind(void 0,t._id,t.liked,t.favorite,"question"),changedFav:e.changedFav,favChange:e.favChange,share:e.share.bind(void 0,t._id),nextMedia:e.nextMedia.bind(void 0,t._id,t.snapshot.length+t.image.length,"next"),prevMedia:e.prevMedia.bind(void 0,t._id,t.snapshot.length+t.image.length,"prev"),mediaItms:e.mediaItms,removeAnim:e.removeAnim,disableAnim:e.disableAnim,animateItm:e.animateItm,removePrevMedia:e.removePrevMedia,playVideo:e.playVideo,videoErr:e.videoErr,playerIcnId:e.playerIcnId,slidePlay:e.slidePlay,moveSlidePlay:e.moveSlidePlay,clearSlidePlay:e.clearSlidePlay,video:e.video,deleteCnt:e.changeCnt.bind(void 0,t._id,t.title,"delete","question"),changeCnt:e.changeCnt.bind(void 0,t._id,t.title,"draft","question")}))})},525:function(e,t,a){"use strict";a.r(t);var i=a(73),n=a(0),s=a.n(n),r=a(19),o=a(66),l=(a(502),a(504)),c=a(29),d=a(60),m=a(2),u=a(4);let h=!0;t.default=Object(o.f)(Object(r.b)(e=>({userID:e.auth.userID,cnts:e.cnt.cnts,skipCnt:e.cnt.skipCnt,cntTotal:e.cnt.cntTotal,changedFav:e.cnt.changedFav,favChange:e.cnt.favChange,cntErr:e.cnt.cntErr,postVideo:e.cnt.postVideo,videoErr:e.cnt.videoErr,filterDet:e.cnt.filterDet}),e=>({onFetchShareActive:()=>e(u.sb()),onFetchShareCntActive:()=>e(u.rb()),onFetchCntActive:()=>e(u.K()),onFetchNotifyActive:()=>e(u.ib()),onFetchPtActive:()=>e(u.kb()),onFetchQueActive:()=>e(u.mb()),onFetchReqActive:()=>e(u.ob()),onFetchCnt:(t,a,i,n,s)=>e(u.N(t,a,i,n,s)),onFetchCntReset:()=>e(u.O()),onChangeFav:(t,a,i,n,s,r)=>e(u.h(t,a,i,n,s,r)),onChangeShareID:(t,a)=>e(u.fc(t,a)),onChangeTag:t=>e(u.w(t)),onFetchVideo:(t,a)=>e(u.zb(t,a)),onChangeCnt:(t,a,i,n,s)=>e(u.d(t,a,i,n,s))}))(class extends n.Component{constructor(e){super(e),this.onScroll=(()=>{window.innerHeight+Math.ceil(window.pageYOffset+1)>=document.body.offsetHeight&&this.props.onFetchCnt(this.props.userID,"question",this.state.fetchLimit,this.props.skipCnt+this.state.fetchLimit,this.props.cntTotal)}),this.showUserOptHandler=(e=>{if(this.state.cntOpt&&this.state.cntOpt.id===e)return void this.setState((e,t)=>({cntOpt:Object(m.f)(e.cntOpt,{visible:!e.cntOpt.visible})}));const t={visible:!0,id:e};this.setState({cntOpt:t})}),this.changeFavoriteHandler=((e,t,a,i)=>{this.props.onChangeFav(e,t,a,this.props.changedFav,this.props.userID,i)}),this.showShareHandler=(e=>{this.props.onChangeShareID(e,"question"),this.props.history.push("/index/question/share")}),this.changeMediaHandler=((e,t,a)=>{this.setState({removePrevMedia:{id:e,type:a},removeAnim:!1}),this.animateSlider(e,t,a,900)}),this.removeAnimHandler=(e=>{this.state.removePrevMedia||this.setState({removeAnim:!0})}),this.playVideoHandler=(e=>{this.props.onFetchVideo(e.id,"".concat(window.location.protocol+"//"+window.location.host,"/media/video/").concat(e.videoCnt))}),this.slidePlayHandler=((e,t,a)=>{a.target.setPointerCapture(a.pointerId),this.setState({playerIcnId:e})}),this.clearSlidePlayhandler=(e=>{let t=e.target;t.releasePointerCapture(e.pointerId),t.style.left="0px";let a=document.querySelector(".reuse-que__media--wrapper__icn-move");a&&(a.style.left="42%")}),this.moveSlidePlayHandler=((e,t,a)=>{let i=a.target;if(i.hasPointerCapture&&i.hasPointerCapture(a.pointerId)){let n=a.clientX-i.parentElement.offsetLeft-i.offsetWidth/2;n<-(i.offsetWidth/2+i.offsetWidth/4)?h&&(h=!1,this.animateSlider(e,t,"next",0)):n>i.offsetWidth/2+i.offsetWidth/4&&h&&(h=!1,this.animateSlider(e,t,"prev",0));let s=document.querySelector(".reuse-que__media--wrapper__icn-move");if(s){let e=n/i.offsetWidth*100;s.style.left=e+42+"%"}i.style.left=n+"px"}}),this.animateSlider=((e,t,a,n)=>{setTimeout(()=>{let n=[...this.state.mediaItms],s=n.filter(t=>t.id===e),r={id:e,position:"next"===a?t>1?1:0:t-1};if(s.length>0){var o,l=Object(i.a)(s);try{for(l.s();!(o=l.n()).done;){let i=o.value;(r={id:i.id,position:"next"===a?i.position+=1:i.position-=1}).position>t-1&&(r=Object(m.f)(r,{position:0})),r.position<0&&(r=Object(m.f)(r,{position:t-1}));let s=n.filter(t=>t.id!==e);s.push(r),this.setState({mediaItms:s,removeAnim:!1,removePrevMedia:null,animateItm:{id:e,direction:a}})}}catch(c){l.e(c)}finally{l.f()}}else n.push(r),this.setState({mediaItms:n,removeAnim:!1,removePrevMedia:null,animateItm:{id:e,direction:a}})},n),setTimeout(()=>{h=!0},500)}),this.changeCntHandler=((e,t,a,i)=>{let n=String(t).length>50?String(t).substr(0,50)+"...":t;this.props.onChangeCnt(e,n,a,!1,i)}),this.props.onFetchCntReset();let t=0;t=window.innerHeight>=1200?18:window.innerHeight>=900?12:window.innerHeight>=500?9:6,this.state={cntOpt:null,fetchLimit:t,filterTag:"question",mediaItms:[],animateItm:null,removeAnim:!1,removePrevMedia:null,playerIcnId:null,animationComplete:!0,scrollEnable:!1}}componentDidMount(){this.props.onFetchCnt(this.props.userID,this.state.filterTag,this.state.fetchLimit,0,0),this.props.onChangeTag("/question")}componentDidUpdate(){this.props.cnts&&this.props.cnts.length>0&&!this.state.scrollEnable&&(window.addEventListener("scroll",this.onScroll,!1),this.setState({scrollEnable:!0}))}componentWillUnmount(){this.props.onFetchCntReset(),window.removeEventListener("scroll",this.onScroll,!1)}render(){let e=s.a.createElement(c.a,null);return this.props.cntErr&&(e=null),this.props.cnts&&0===this.props.cnts.length&&(e=s.a.createElement(d.a,{isAuth:null!==this.props.userID,det:"No content found!",icn:"clone",filter:!0})),this.props.cnts&&0===this.props.cnts.length&&(e=s.a.createElement(d.a,{isAuth:null!==this.props.userID,det:"No content found!",icn:"clone",filter:!0})),this.props.cnts&&this.props.cnts.length>0&&(e=s.a.createElement(l.a,{content:this.props.cnts,media:this.props.media,userOpt:this.showUserOptHandler,showCntOpt:this.state.cntOpt,fav:this.changeFavoriteHandler,changedFav:this.props.changedFav,favChange:this.props.favChange,share:this.showShareHandler,nextMedia:this.changeMediaHandler,prevMedia:this.changeMediaHandler,mediaItms:this.state.mediaItms,removeAnim:this.removeAnimHandler,disableAnim:this.state.removeAnim,animateItm:this.state.animateItm,removePrevMedia:this.state.removePrevMedia,playVideo:this.playVideoHandler,videoErr:this.props.videoErr,video:this.props.postVideo,playerIcnId:this.state.playerIcnId,slidePlay:this.slidePlayHandler,moveSlidePlay:this.moveSlidePlayHandler,clearSlidePlay:this.clearSlidePlayhandler,changeCnt:this.changeCntHandler})),e}}))}}]);
//# sourceMappingURL=7.0bf1698d.chunk.js.map