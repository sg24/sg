(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{651:function(e,t,n){},776:function(e,t,n){},793:function(e,t,n){"use strict";n.r(t);var a=n(16),s=n(17),o=n(18),c=n(19),i=n(0),r=n.n(i),l=n(24),u=n(86),h=(n(664),n(124)),p=n.n(h),m=n(125),d=n.n(m),_=n(126),f=n.n(_),E=n(73),v=(n(776),n(651),n(3)),w=n(8),g=function(e){var t=f()(v.c),n=null,a=["reuse-onlineque__content--posted__user--det"],s=["reuse-onlineque__content--posted__user--det__opt"],o=String(e.cnt.title).length>149?String(e.cnt.title).substr(0,150)+"...":e.cnt.title,c=null,i=r.a.createElement("li",{className:"reuse-onlineque__content--posted__user--det__opt--status",onClick:e.changeCnt},r.a.createElement(w.a,{icon:["far","eye-slash"],className:"icon icon__reuse-onlineque--options__dft"}),"Draft"),l=r.a.createElement("img",{src:e.cnt.userImage,alt:""});return"draft"===e.cnt.mode&&(i=r.a.createElement("li",{className:"reuse-onlineque__content--posted__user--det__opt--status",onClick:e.changeCntPublish},r.a.createElement(w.a,{icon:["far","eye"],className:"icon icon__reuse-onlineque--options__dft"}),"Publish")),e.cnt.username&&!e.cnt.userImage&&(l=r.a.createElement(E.a,{name:e.cnt.username,size:"36",round:!0})),e.showCnt&&e.showCnt.visible&&e.cnt._id===e.showCnt.id&&(a.push("reuse-onlineque__content--posted__user--det__clk "),s.push("reuse-onlineque__content--posted__user--det__opt--visible")),e.showTooltip&&e.showTooltip.visible&&e.cnt._id===e.showTooltip.id&&(c=r.a.createElement("ul",{className:"reuse-onlineque__footer--tooltip"},r.a.createElement("li",null," (1) Add author as friend. ",r.a.createElement("a",{href:"/user/profile/".concat(e.cnt.authorID)},e.cnt.username)),r.a.createElement("li",null," (2) Chat to request access"))),e.cnt.userOpt&&(n=r.a.createElement("div",{className:a.join(" "),onClick:e.userOpt},r.a.createElement("div",{className:"reuse-onlineque__content--posted__user--det__mid"}),r.a.createElement("ul",{className:s.join(" ")},r.a.createElement("li",null,r.a.createElement("a",{href:"/edit/qchat/".concat(e.cnt._id)},r.a.createElement(w.a,{icon:["far","edit"],className:"icon icon__reuse-onlineque--options"}),"Edit")),i,r.a.createElement("li",{onClick:e.deleteCnt},r.a.createElement(w.a,{icon:["far","trash-alt"],className:"icon icon__reuse-onlineque--options"}),"Delete")))),r.a.createElement("div",{className:"reuse-onlineque"},r.a.createElement("ul",{className:"reuse-onlineque__header"},r.a.createElement("li",null,r.a.createElement("div",{className:"reuse-onlineque__header--quesNumber"},e.cnt.qchatTotal),r.a.createElement("div",{className:"reuse-onlineque__header--title"},e.cnt.qchatTotal>1?"Questions":"Question")),r.a.createElement("li",null,r.a.createElement("div",{className:"reuse-onlineque__header--quesTime"},r.a.createElement(w.a,{icon:["far","clock"],className:"icon icon__reuse-onlineque--time"}),"".concat(e.cnt.hour?e.cnt.hour:0,"hr\n                        ").concat(e.cnt.minute?e.cnt.minute:0,"min\n                        ").concat(e.cnt.second?e.cnt.second:0,"sec "))),r.a.createElement("li",null,r.a.createElement("div",{className:"reuse-share"},r.a.createElement("div",{className:"reuse-share__icn",onClick:e.share},r.a.createElement(w.a,{icon:["fas","location-arrow"],className:"icon icon__reuse-share--icn"}))))),r.a.createElement("div",{className:"reuse-onlineque__content"},r.a.createElement("p",{className:"reuse-onlineque__content--title"},r.a.createElement("a",{href:"/view/qchat/".concat(e.cnt._id)},o)),r.a.createElement("div",{className:"reuse-onlineque__content--posted"},r.a.createElement("div",{className:"reuse-onlineque__content--posted__user"},r.a.createElement("div",{className:"reuse-onlineque__content--posted__user--img"},l),r.a.createElement("span",null,r.a.createElement("a",{href:"/user/profile/".concat(e.cnt.authorID)},e.cnt.username),"@ ",r.a.createElement(d.a,{date:e.cnt.created,live:!1,formatter:t})),n))),r.a.createElement("ul",{className:"reuse-onlineque__footer"},r.a.createElement("li",null,r.a.createElement(w.a,{icon:["far","comment-dots"],className:"icon icon__reuse-onlineque--comment"}),Object(v.d)(e.cnt.comment)),r.a.createElement("li",{className:"reuse-onlineque__footer--exam"},e.cnt.access?r.a.createElement("span",{className:"reuse-onlineque__footer--exam__start",onClick:e.start}," Start"):r.a.createElement("span",{className:"reuse-onlineque__footer--exam__req",onClick:e.tooltip},r.a.createElement(w.a,{icon:["fas","lock"],className:"icon icon__reuse-onlineque--comment"})," Request")),r.a.createElement("li",null,r.a.createElement(w.a,{icon:["fas","pencil-alt"],className:"icon icon__reuse-onlineque--pen"}),Object(v.d)(e.cnt.write))),c)},q=function(e){return p()(e.content,"created",{reverse:!0}).map(function(t,n){return r.a.createElement(g,{key:n,cnt:t,userOpt:e.userOpt.bind(void 0,t._id),showCnt:e.showCntOpt,share:e.share.bind(void 0,t._id),tooltip:e.tooltip.bind(void 0,t._id),showTooltip:e.showTooltip,start:e.startExam.bind(void 0,t.contentID),deleteCnt:e.changeCnt.bind(void 0,t._id,t.title,"delete","deleteqchat"),changeCnt:e.changeCnt.bind(void 0,t._id,t.title,"draft","qchat")})})},C=n(40),b=n(78),N=n(5),T=function(e){Object(c.a)(n,e);var t=Object(o.a)(n);function n(e){var s;Object(a.a)(this,n),(s=t.call(this,e)).onScroll=function(){window.innerHeight+Math.ceil(window.pageYOffset+1)>=document.body.offsetHeight&&s.props.onFetchCnt(s.props.userID,"qchat"!==s.state.filterTag?"filter"===s.state.filterTag?"filter=="+s.props.filterDet:"qchat-".concat(s.state.filterTag):"qchat",s.state.fetchLimit,s.props.skipCnt+s.state.fetchLimit,s.props.cntTotal)},s.showUserOptHandler=function(e){if(s.state.cntOpt&&s.state.cntOpt.id===e)s.setState(function(e,t){return{cntOpt:Object(v.f)(e.cntOpt,{visible:!e.cntOpt.visible})}});else{var t={visible:!0,id:e};s.setState({cntOpt:t})}},s.showShareHandler=function(e){s.props.onChangeShareID(e,"qchat"),s.props.history.push("/index/qchat/share")},s.showTooltipHandler=function(e){if(s.state.showTooltip&&s.state.showTooltip.id===e)s.setState(function(e,t){return{showTooltip:Object(v.f)(e.showTooltip,{visible:!e.showTooltip.visible})}});else{var t={visible:!0,id:e};s.setState({showTooltip:t})}},s.changeCntHandler=function(e,t,n,a){var o=String(t).length>50?String(t).substr(0,50)+"...":t;s.props.onChangeCnt(e,o,n,!1,a)},s.startExamHandler=function(e){window.open("https://www.slodge24.com/examtab/".concat(e),"_blank").focus()},s.props.onFetchCntReset();var o=0;return o=window.innerHeight>=1200?18:window.innerHeight>=900?12:window.innerHeight>=500?9:6,s.state={cntOpt:null,fetchLimit:o,filterTag:"qchat",showTooltip:null,active:null},s}return Object(s.a)(n,[{key:"componentDidMount",value:function(){this.props.onFetchCnt(this.props.userID,this.state.filterTag,this.state.fetchLimit,0,0),this.props.onChangeTag("/qchat")}},{key:"componentDidUpdate",value:function(){this.props.cnts&&this.props.cnts.length>0&&!this.state.scrollEnable&&(window.addEventListener("scroll",this.onScroll,!1),this.setState({scrollEnable:!0})),this.props.match.params.id&&this.state.filterTag!==this.props.match.params.id&&"share"!==this.props.match.params.id&&"filter"!==this.props.match.params.id&&"startfilter"!==this.props.match.params.id&&(this.props.onFetchCntReset(),this.props.onFetchCnt(this.props.userID,"qchat-".concat(this.props.match.params.id),this.state.fetchLimit,0,0),this.setState({filterTag:this.props.match.params.id}))}},{key:"componentWillUnmount",value:function(){this.props.onFetchCntReset(),window.removeEventListener("scroll",this.onScroll,!1)}},{key:"render",value:function(){var e=r.a.createElement(C.a,null);return this.props.postErr&&(e=null),this.props.cnts&&0===this.props.cnts.length&&"shared"===this.state.filterTag&&(e=r.a.createElement(b.a,{isAuth:null!==this.props.userID,det:"No content found!",icn:"clone",filter:!0})),this.props.cnts&&0===this.props.cnts.length&&"shared"!==this.state.filterTag&&(e=r.a.createElement(b.a,{isAuth:null!==this.props.userID,det:"No content found!",icn:"clone",filter:!0})),this.props.cnts&&this.props.cnts.length>0&&(e=r.a.createElement(q,{content:this.props.cnts,userOpt:this.showUserOptHandler,showCntOpt:this.state.cntOpt,share:this.showShareHandler,tooltip:this.showTooltipHandler,showTooltip:this.state.showTooltip,startExam:this.startExamHandler,changeCnt:this.changeCntHandler})),e}}]),n}(i.Component);t.default=Object(u.f)(Object(l.b)(function(e){return{userID:e.auth.userID,cnts:e.cnt.cnts,skipCnt:e.cnt.skipCnt,cntTotal:e.cnt.cntTotal,changedFav:e.cnt.changedFav,favChange:e.cnt.favChange,cntErr:e.cnt.cntErr,postVideo:e.cnt.postVideo,videoErr:e.cnt.videoErr,filterDet:e.cnt.filterDet}},function(e){return{onFetchShareActive:function(){return e(N.sb())},onFetchShareCntActive:function(){return e(N.rb())},onFetchCntActive:function(){return e(N.K())},onFetchNotifyActive:function(){return e(N.ib())},onFetchPtActive:function(){return e(N.kb())},onFetchQueActive:function(){return e(N.mb())},onFetchReqActive:function(){return e(N.ob())},onFetchCnt:function(t,n,a,s,o){return e(N.N(t,n,a,s,o))},onFetchCntReset:function(){return e(N.O())},onChangeFav:function(t,n,a,s,o,c){return e(N.h(t,n,a,s,o,c))},onChangeShareID:function(t,n){return e(N.ic(t,n))},onChangeTag:function(t){return e(N.w(t))},onFetchVideo:function(t,n){return e(N.Cb(t,n))},onChangeCnt:function(t,n,a,s,o){return e(N.d(t,n,a,s,o))}}})(T))}}]);
//# sourceMappingURL=21.e6a9be0a.chunk.js.map