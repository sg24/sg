(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{647:function(e,t,n){},670:function(e,t,n){},678:function(e,t,n){"use strict";n.r(t);var a=n(20),r=n(21),c=n(22),s=n(23),i=n(0),o=n.n(i),l=n(25),p=n(85),u=n(124),h=n.n(u),d=n(92),m=n(125),_=n.n(m),f=n(126),w=n.n(f),v=n(72),g=(n(670),n(647),n(9)),E=n(62),C=n(3),b=n(99),N=function(e){var t=w()(C.c),n=null,a=["reuse-pwt__content--det__user--det"],r=["reuse-pwt__content--det__user--det__opt"],c=null,s=null,i=o.a.createElement("li",{className:"reuse-pwt__content--det__user--det__opt--status",onClick:e.changeCnt},o.a.createElement(g.a,{icon:["far","eye-slash"],className:"icon icon__reuse-pwt--options__dft"}),"Draft"),l=o.a.createElement(g.a,{icon:["far","heart"],className:"icon icon__reuse-pwt--footer__heart"}),p=o.a.createElement("img",{src:e.pwt.userImage,alt:""});"draft"===e.pwt.mode&&(i=o.a.createElement("li",{className:"reuse-pwt__content--det__user--det__opt--status",onClick:e.changeCntPublish},o.a.createElement(g.a,{icon:["far","eye"],className:"icon icon__reuse-pwt--options__dft"}),"Publish")),e.pwt.username&&!e.pwt.userImage&&(p=o.a.createElement(v.a,{name:e.pwt.username,size:"50",round:!0}));var u,h=Object(d.a)(e.changedFav);try{for(h.s();!(u=h.n()).done;){var m=u.value;e.pwt._id===m.id&&(c=m.favAdd,s=m.liked)}}catch(N){h.e(N)}finally{h.f()}e.showCnt&&e.showCnt.visible&&e.showCnt.id===e.pwt._id&&(a.push("reuse-pwt__content--det__user--det__clk"),r.push("reuse-pwt__content--det__user--det__opt--visible")),e.pwt.userOpt&&(n=o.a.createElement("div",{className:a.join(" "),onClick:e.userOpt},o.a.createElement("div",{className:"reuse-pwt__content--det__user--det__mid"}),o.a.createElement("ul",{className:r.join(" ")},o.a.createElement("li",null,o.a.createElement("a",{href:"/edit/poet/".concat(e.pwt._id)},o.a.createElement(g.a,{icon:["far","edit"],className:"icon icon__reuse-pwt--options"}),"Edit")),i,o.a.createElement("li",{onClick:e.deleteCnt},o.a.createElement(g.a,{icon:["far","trash-alt"],className:"icon icon__reuse-pwt--options"}),"Delete")))),e.pwt.liked&&null===s&&(l=o.a.createElement(g.a,{icon:["fas","heart"],className:"icon icon__reuse-pwt--footer__heart"})),s&&(l=o.a.createElement(g.a,{icon:["fas","heart"],className:"icon icon__reuse-pwt--footer__heart"}));var f=o.a.createElement("div",{className:"reuse-pwt"},o.a.createElement("div",{className:"reuse-share"},o.a.createElement("div",{className:"reuse-share__icn",onClick:e.share},o.a.createElement(g.a,{icon:["fas","location-arrow"],className:"icon icon__reuse-share--icn"}))),o.a.createElement("div",{className:"reuse-pwt__content"},o.a.createElement("div",{className:"reuse-pwt__content--tag"},o.a.createElement("span",null,o.a.createElement(g.a,{icon:e.pwt.category.length>1?["fas","tags"]:["fas","tag"],className:"icon icon__reuse-pwt--header__tag"}),e.pwt.category[0])),o.a.createElement("div",{className:"reuse-pwt__content--title"},o.a.createElement("div",{className:"reuse-pwt__content--title__wrapper"},o.a.createElement("a",{href:"/view/poet/"+e.pwt._id},String(e.pwt.title).length>149?String(e.pwt.title).substr(0,150)+"...":e.pwt.title))),o.a.createElement("div",{className:"reuse-pwt__content--det"},o.a.createElement("div",{className:"reuse-pwt__content--det__user"},o.a.createElement("div",{className:"reuse-pwt__content--det__user--img"},p),o.a.createElement("a",{href:"/user/profile/"+e.pwt.authorID}," ",String(e.pwt.username).substr(0,8)," "),o.a.createElement("div",{className:"reuse-pwt__content--det__user--time"},"@ ",o.a.createElement(_.a,{date:e.pwt.pwtCreated,live:!1,formatter:t})),n))),o.a.createElement("ul",{className:"reuse-pwt__footer"},o.a.createElement("li",null,o.a.createElement(g.a,{icon:["far","smile"],className:"icon icon__reuse-pwt--footer__smile"}),Object(C.d)(e.pwt.helpFull)),o.a.createElement("li",null,o.a.createElement("span",{onClick:e.fav},l),Object(C.d)(null!==c?c:e.pwt.favorite),e.favChange&&e.favChange.id===e.pwt._id?o.a.createElement(b.a,{liked:e.favChange.isLiked}):null),o.a.createElement("li",null,o.a.createElement(g.a,{icon:["far","comment-dots"],className:"icon icon__reuse-pwt--footer__comments"}),Object(C.d)(e.pwt.comment))));return o.a.createElement(E.a,null,f)},O=function(e){return h()(e.content,"pwtCreated",{reverse:!0}).map(function(t,n){return o.a.createElement(N,{key:n,pwt:t,media:e.media,userOpt:e.userOpt.bind(void 0,t._id),showCnt:e.showCntOpt,fav:e.fav.bind(void 0,t._id,t.liked,t.favorite,"poet"),changedFav:e.changedFav,favChange:e.favChange,share:e.share.bind(void 0,t._id),deleteCnt:e.changeCnt.bind(void 0,t._id,t.title,"delete","poet"),changeCnt:e.changeCnt.bind(void 0,t._id,t.title,"draft","poet")})})},F=n(40),k=n(77),S=n(5),D=function(e){Object(s.a)(n,e);var t=Object(c.a)(n);function n(e){var r;Object(a.a)(this,n),(r=t.call(this,e)).onScroll=function(){window.innerHeight+Math.ceil(window.pageYOffset+1)>=document.body.offsetHeight&&r.props.onFetchCnt(r.props.userID,"poet",r.state.fetchLimit,r.props.skipCnt+r.state.fetchLimit,r.props.cntTotal)},r.showUserOptHandler=function(e){if(r.state.cntOpt&&r.state.cntOpt.id===e)r.setState(function(e,t){return{cntOpt:Object(C.f)(e.cntOpt,{visible:!e.cntOpt.visible})}});else{var t={visible:!0,id:e};r.setState({cntOpt:t})}},r.changeFavoriteHandler=function(e,t,n,a){r.props.onChangeFav(e,t,n,r.props.changedFav,r.props.userID,a)},r.showShareHandler=function(e){r.props.onChangeShareID(e,"poet"),r.props.history.push("/index/poet/share")},r.changeCntHandler=function(e,t,n,a){var c=String(t).length>50?String(t).substr(0,50)+"...":t;r.props.onChangeCnt(e,c,n,!1,a)},r.props.onFetchCntReset();var c=0;return c=window.innerHeight>=1200?18:window.innerHeight>=900?12:window.innerHeight>=500?9:6,r.state={cntOpt:null,fetchLimit:c,filterTag:"poet",mediaItms:[],animateItm:null,removeAnim:!1,removePrevMedia:null,playerIcnId:null,animationComplete:!0,scrollEnable:!1},r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){this.props.onFetchCnt(this.props.userID,this.state.filterTag,this.state.fetchLimit,0,0),this.props.onChangeTag("/poet")}},{key:"componentDidUpdate",value:function(){this.props.cnts&&this.props.cnts.length>0&&!this.state.scrollEnable&&(window.addEventListener("scroll",this.onScroll,!1),this.setState({scrollEnable:!0}))}},{key:"componentWillUnmount",value:function(){this.props.onFetchCntReset(),window.removeEventListener("scroll",this.onScroll,!1)}},{key:"render",value:function(){var e=o.a.createElement(F.a,null);return this.props.cntErr&&(e=null),this.props.cnts&&0===this.props.cnts.length&&(e=o.a.createElement(k.a,{isAuth:null!==this.props.userID,det:"No content found!",icn:"clone",filter:!0})),this.props.cnts&&0===this.props.cnts.length&&(e=o.a.createElement(k.a,{isAuth:null!==this.props.userID,det:"No content found!",icn:"clone",filter:!0})),this.props.cnts&&this.props.cnts.length>0&&(e=o.a.createElement(O,{content:this.props.cnts,media:this.props.media,userOpt:this.showUserOptHandler,showCntOpt:this.state.cntOpt,fav:this.changeFavoriteHandler,changedFav:this.props.changedFav,favChange:this.props.favChange,share:this.showShareHandler,changeCnt:this.changeCntHandler})),e}}]),n}(i.Component);t.default=Object(p.f)(Object(l.b)(function(e){return{userID:e.auth.userID,cnts:e.cnt.cnts,cntErr:e.cnt.cntErr,skipCnt:e.cnt.skipCnt,cntTotal:e.cnt.cntTotal,changedFav:e.cnt.changedFav,favChange:e.cnt.favChange,filterDet:e.cnt.filterDet}},function(e){return{onFetchShareActive:function(){return e(S.sb())},onFetchShareCntActive:function(){return e(S.rb())},onFetchNotifyActive:function(){return e(S.ib())},onFetchPtActive:function(){return e(S.kb())},onFetchQueActive:function(){return e(S.mb())},onFetchCntActive:function(){return e(S.K())},onFetchReqActive:function(){return e(S.ob())},onFetchCnt:function(t,n,a,r,c){return e(S.N(t,n,a,r,c))},onFetchCntReset:function(){return e(S.O())},onChangeFav:function(t,n,a,r,c,s){return e(S.h(t,n,a,r,c,s))},onChangeShareID:function(t,n){return e(S.fc(t,n))},onChangeTag:function(t){return e(S.w(t))},onChangeCnt:function(t,n,a,r,c){return e(S.d(t,n,a,r,c))}}})(D))}}]);
//# sourceMappingURL=9.f57dc5f4.chunk.js.map