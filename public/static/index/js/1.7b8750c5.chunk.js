(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{832:function(e,a,t){},834:function(e,a,t){"use strict";var i=t(0),n=t.n(i),r=t(149),l=t.n(r),s=t(99),c=t(117),o=t(150),u=t.n(o),d=t(151),m=t.n(d),_=t(81),v=(t(849),t(832),t(2)),q=t(70),p=t(10),h=t(128);var E=e=>{const a=m()(v.c);let t=null,i=["reuse-que__footer--details"],r=["reuse-que__footer--details__options"],l=null,o=null,d=String(e.que.title).length>149?String(e.que.title).substr(0,150)+"...":e.que.title,E=e.que.snapshot.length+e.que.image.length,f=n.a.createElement("p",{className:"reuse-que__content--title"},n.a.createElement("a",{href:"/view/question/"+e.que._id},d)),g=n.a.createElement("li",{className:"reuse-que__footer--details__options--status",onClick:e.changeCnt},n.a.createElement(p.a,{icon:["far","eye-slash"],className:"icon icon__reuse-que--options__dft"}),"Draft"),N=n.a.createElement(p.a,{icon:["far","heart"],className:"icon icon__reuse-que--footer__heart"}),w=n.a.createElement("img",{src:e.que.userImage,alt:""});"draft"===e.que.mode&&(g=n.a.createElement("li",{className:"reuse-que__footer--details__options--status",onClick:e.changeCntPublish},n.a.createElement(p.a,{icon:["far","eye"],className:"icon icon__reuse-que--options__dft"}),"Publish")),e.que.username&&!e.que.userImage&&(w=n.a.createElement(_.a,{name:e.que.username,size:"36",round:!0}));var y,b=Object(c.a)(e.changedFav);try{for(b.s();!(y=b.n()).done;){let a=y.value;e.que._id===a.id&&(l=a.favAdd,o=a.liked)}}catch(x){b.e(x)}finally{b.f()}let C=null,P=[...e.que.snapshot,...e.que.image],k=null,I=["reuse-que__media--wrapper"];if(P.length>0){let a=!1;var M,O=Object(c.a)(e.mediaItms);try{for(O.s();!(M=O.n()).done;){let t=M.value;t.id===e.que._id&&(a=!0,e.animateItm.id===e.que._id&&("next"!==e.animateItm.direction||e.removePrevAnim||I.push("reuse-que__media--wrapper__anim"),"prev"!==e.animateItm.direction||e.removePrevAnim||I.push("reuse-que__media--wrapper__anim-rev")),e.removePrevMedia&&e.removePrevMedia.id===e.que._id&&A(e.removePrevMedia),j(t.position))}}catch(x){O.e(x)}finally{O.f()}a||(e.removePrevMedia&&e.removePrevMedia.id===e.que._id&&A(e.removePrevMedia),j(0))}function A(e){"next"===e.type?I.push("reuse-que__media--wrapper__anim-exit"):I.push("reuse-que__media--wrapper__anim-exit-rev")}function j(a){let t=P[a],i=t.videoCnt?Object(s.a)({url:"".concat(window.location.protocol+"//"+window.location.host,"/media/image/").concat(t.id)},t,{mediaType:"snapshot"}):Object(s.a)({url:"".concat(window.location.protocol+"//"+window.location.host,"/media/image/").concat(t.id)},t,{mediaType:"image"});i&&"snapshot"===i.mediaType&&(k=e.video&&e.video.id!==i.id?n.a.createElement("div",{className:e.playerIcnId&&e.playerIcnId===e.que._id?"reuse-que__media--wrapper__icn reuse-que__media--wrapper__icn-move":"reuse-que__media--wrapper__icn",onClick:e.playVideo.bind(this,i)},n.a.createElement(p.a,{icon:["fas","play-circle"],className:"icon icon__reuse-que--media__play"})):null),C=n.a.createElement("div",{className:"reuse-que__media"},n.a.createElement("div",{className:e.video&&e.video.id===i.id?"reuse-que__media--main-wrapper reuse-que__media--main-wrapper__load":"reuse-que__media--main-wrapper"},n.a.createElement("div",{onDragStart:()=>!1,"touch-action":"pan-y",className:e.disableAnim?"reuse-que__media--wrapper":I.join(" "),onAnimationEnd:e.removeAnim},k,e.video&&e.video.id===i.id&&e.video.url?n.a.createElement("video",{src:e.video.url,controls:!0,autoPlay:!0},n.a.createElement("p",null,"our browser doesn't support embedded videos")):e.video&&e.video.id===i.id?null:n.a.createElement("img",{draggable:"false",onDragStart:()=>!1,src:i.url,alt:"question"}),e.videoErr&&e.videoErr.id===i.id?n.a.createElement("div",{className:"reuse-que__video-err"},n.a.createElement("div",{className:"reuse-que__video-err--icn",onClick:e.playVideo.bind(this,i.id,e.que.video)},n.a.createElement(p.a,{icon:["fas","redo"],className:"icon icon__reuse-que--video-err__icn"})),n.a.createElement("h3",null," ",e.videoErr.err.message," ")):null)),P&&P.length>1?n.a.createElement(q.a,null,n.a.createElement("div",{className:"reuse-que__media--cnt reuse-que__media--cnt__nxt",onClick:e.nextMedia},n.a.createElement(p.a,{icon:["fas","angle-right"],className:"icon icon__reuse-que--media__nxt"})),n.a.createElement("div",{className:"reuse-que__media--cnt reuse-que__media--cnt__prev",onClick:e.prevMedia},n.a.createElement(p.a,{icon:["fas","angle-left"],className:"icon icon__reuse-que--media__prev"}))):null)}return E>0&&(f=n.a.createElement(q.a,null,n.a.createElement("p",{className:"reuse-que__content--title reuse-que__content--title__que-img"},n.a.createElement("a",{href:"/view/question/"+e.que._id},d)),n.a.createElement("div",{className:"reuse-que__content--wrapper"},C))),e.showCnt&&e.showCnt.visible&&e.que._id===e.showCnt.id&&(i.push("reuse-que__footer--details__clk"),r.push("reuse-que__footer--details__options--visible")),e.que.userOpt&&(t=n.a.createElement("div",{className:i.join(" "),onClick:e.userOpt},n.a.createElement("div",{className:"reuse-que__footer--details__mid"}),n.a.createElement("ul",{className:r.join(" ")},n.a.createElement("li",null,n.a.createElement("a",{href:"/edit/question/".concat(e.que._id)},n.a.createElement(p.a,{icon:["far","edit"],className:"icon icon__reuse-que--options"}),"Edit")),g,n.a.createElement("li",{onClick:e.deleteCnt},n.a.createElement(p.a,{icon:["far","trash-alt"],className:"icon icon__reuse-que--options"}),"Delete")))),e.que.liked&&null===o&&(N=n.a.createElement(p.a,{icon:["fas","heart"],className:"icon icon__reuse-que--footer__heart"})),o&&(N=n.a.createElement(p.a,{icon:["fas","heart"],className:"icon icon__reuse-que--footer__heart"})),n.a.createElement("div",{className:"reuse-que"},n.a.createElement("ul",{className:"reuse-que__header"},n.a.createElement("li",null,n.a.createElement("div",{className:"reuse-que__header--category__img"},w),n.a.createElement("div",{className:"reuse-que__header--category__det"},n.a.createElement("div",{className:"reuse-que__header--category__det--name"},n.a.createElement("a",{href:"/user/profile/".concat(e.que.authorID)},e.que.username)),n.a.createElement("div",{className:"reuse-que__header--category__det--timePosted"},"@ ",n.a.createElement(u.a,{date:e.que.queCreated,live:!1,formatter:a})))),n.a.createElement("li",null,n.a.createElement("p",{className:"reuse-que__header--share__category"},n.a.createElement(p.a,{icon:e.que.category.length>1?["fas","tags"]:["fas","tag"],className:"icon icon__reuse-que--header__tag"}),e.que.category[0]),n.a.createElement("div",{className:"reuse-share"},n.a.createElement("div",{className:"reuse-share__icn",onClick:e.share},n.a.createElement(p.a,{icon:["fas","location-arrow"],className:"icon icon__reuse-share--icn"}))))),n.a.createElement("div",{className:"reuse-que__content"},f),n.a.createElement("div",{className:"reuse-que__ans"},n.a.createElement("div",{className:"reuse-que__ans--wrapper"},n.a.createElement("div",{className:"reuse-que__ans--total"},e.que.comment),"Answer")),n.a.createElement("div",{className:"reuse-que__footer"},n.a.createElement("ul",{className:"reuse-que__footer--list"},n.a.createElement("li",null,n.a.createElement(p.a,{icon:["far","thumbs-up"],className:"icon icon__reuse-que--footer__thumbup"}),Object(v.d)(e.que.helpFull)),n.a.createElement("li",{className:"reuse-que__footer--list__item-middle"},n.a.createElement(p.a,{icon:["far","thumbs-down"],className:"icon icon__reuse-que--footer__thumbdown"}),Object(v.d)(e.que.notHelpFull)),n.a.createElement("li",null,n.a.createElement("span",{onClick:e.fav},N),Object(v.d)(null!==l?l:e.que.favorite),e.favChange&&e.favChange.id===e.que._id?n.a.createElement(h.a,{liked:e.favChange.isLiked}):null)),t))};a.a=(e=>{return l()(e.content,"queCreated",{reverse:!0}).map((a,t)=>n.a.createElement(E,{key:t,que:a,media:e.media,userOpt:e.userOpt.bind(void 0,a._id),showCnt:e.showCntOpt,fav:e.fav.bind(void 0,a._id,a.liked,a.favorite,"question"),changedFav:e.changedFav,favChange:e.favChange,share:e.share.bind(void 0,a._id),nextMedia:e.nextMedia.bind(void 0,a._id,a.snapshot.length+a.image.length,"next"),prevMedia:e.prevMedia.bind(void 0,a._id,a.snapshot.length+a.image.length,"prev"),mediaItms:e.mediaItms,removeAnim:e.removeAnim,disableAnim:e.disableAnim,animateItm:e.animateItm,removePrevMedia:e.removePrevMedia,playVideo:e.playVideo,videoErr:e.videoErr,playerIcnId:e.playerIcnId,slidePlay:e.slidePlay,moveSlidePlay:e.moveSlidePlay,clearSlidePlay:e.clearSlidePlay,video:e.video,deleteCnt:e.changeCnt.bind(void 0,a._id,a.title,"delete","question"),changeCnt:e.changeCnt.bind(void 0,a._id,a.title,"draft","question")}))})},849:function(e,a,t){}}]);
//# sourceMappingURL=1.7b8750c5.chunk.js.map