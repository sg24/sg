(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{776:function(e,t,n){},793:function(e,t,n){"use strict";n.r(t);var s=n(15),r=n(16),a=n(17),c=n(18),i=n(0),u=n.n(i),o=n(24),l=n(86),p=n(72),h=n(8),d=(n(776),function(e){var t=["reuse-user__det--img__status--off"],n=u.a.createElement("img",{src:e.user.image,alt:""}),s=u.a.createElement("ul",{className:"reuse-user__opt"},u.a.createElement("li",null,u.a.createElement("div",{className:"reuse-user__opt--add",onClick:e.addUser},"Add")));return e.user.status&&t.push("reuse-user__det--img__status--on"),""===e.user.image&&(n=u.a.createElement(p.a,{name:e.user.username,size:"60",round:!0})),e.user.request&&(s=u.a.createElement("ul",{className:"reuse-user__opt"},u.a.createElement("li",null,u.a.createElement("div",{className:"reuse-user__opt--acc",onClick:e.acceptUser},"Accept")),u.a.createElement("li",null,u.a.createElement("div",{className:"reuse-user__opt--rej",onClick:e.rejUser},u.a.createElement(h.a,{icon:["fas","user-slash"],className:"icon icon__reuse-user--opt"}),"Reject")))),e.user.pending&&(s=u.a.createElement("ul",{className:"reuse-user__opt"},u.a.createElement("li",{onClick:e.cancelReq},u.a.createElement("div",{className:"reuse-user__opt--cancel"},"Cancel")))),e.user.accept&&(s=u.a.createElement("ul",{className:"reuse-user__opt"},u.a.createElement("li",{onClick:e.unfriend},u.a.createElement("div",{className:"reuse-user__opt--rej"},u.a.createElement(h.a,{icon:["fas","user-slash"],className:"icon icon__reuse-user--opt"}),"Unfriend")),u.a.createElement("li",null,u.a.createElement("a",{href:"/chat/user/".concat(e.user.id),className:"reuse-user__opt--comment"},u.a.createElement(h.a,{icon:["fas","comment"],className:"icon icon__reuse-user--opt"}),"Chat")))),u.a.createElement("div",{className:"reuse-user"},u.a.createElement("div",{className:"reuse-user__det"},u.a.createElement("div",{className:"reuse-user__det--img"},n,u.a.createElement("div",{className:"reuse-user__det--img__status ".concat(t.join(" "))})),u.a.createElement("ul",{className:"reuse-user__det--user"},u.a.createElement("li",{className:"reuse-user__det--user__info"},u.a.createElement("a",{href:"/user/profile/".concat(e.user.id)},e.user.username)),u.a.createElement("li",null,u.a.createElement("div",null,e.user.studenttotal)," Friend"))),s)}),m=function(e){return e.content.map(function(t,n){return u.a.createElement(d,{key:n,user:t,addUser:e.changeCnt.bind(void 0,t.id,null,"addUser",!0,"user"),blockUser:e.changeCnt.bind(void 0,t.id,t.username,"blockUser",!1,"user"),acceptUser:e.changeCnt.bind(void 0,t.id,t.username,"acceptUser",!1,"user"),rejUser:e.changeCnt.bind(void 0,t.id,t.username,"rejUser",!1,"user"),cancelReq:e.changeCnt.bind(void 0,t.id,t.username,"cancelReq",!1,"user"),unfriend:e.changeCnt.bind(void 0,t.id,t.username,"unfriend",!1,"user")})})},f=n(78),_=n(40),E=n(4),g=function(e){Object(c.a)(n,e);var t=Object(a.a)(n);function n(e){var r;Object(s.a)(this,n),(r=t.call(this,e)).onScroll=function(){window.innerHeight+Math.ceil(window.pageYOffset+1)>=document.body.offsetHeight&&r.props.onFetchCnt(r.props.userID,"user"!==r.state.filterTag?"filter"===r.state.filterTag?"filter=="+r.props.filterDet:"users-".concat(r.state.filterTag):"users",r.state.fetchLimit,r.props.skipCnt+r.state.fetchLimit,r.props.cntTotal)},r.changeCntHandler=function(e,t,n,s,a){r.props.onChangeCnt(e,t,n,s,a)},r.props.onFetchCntReset();var a=0;return a=window.innerHeight>=1200?20:window.innerHeight>=900?16:window.innerHeight>=500?12:8,r.state={fetchLimit:a,filterTag:"user",scrollEnable:!1},r}return Object(r.a)(n,[{key:"componentDidMount",value:function(){this.props.onFetchCnt(this.props.userID,"users",this.state.fetchLimit,0,0),this.props.onChangeTag("/user")}},{key:"componentDidUpdate",value:function(){if(this.props.cnts&&this.props.cnts.length>0&&!this.state.scrollEnable&&(window.addEventListener("scroll",this.onScroll,!1),this.setState({scrollEnable:!0})),this.props.startSearch&&this.props.filterDet&&this.props.location.search&&this.state.filterTag!=="filter==".concat(this.props.filterDet)){this.props.onFetchCntReset();var e="filter==".concat(this.props.filterDet);this.props.onFetchCnt(this.props.userID,"users-"+e,this.state.fetchLimit,0,0),this.setState({filterTag:e})}this.props.startSearch||"user"===this.state.filterTag||(this.props.onFetchCntReset(),this.props.onFetchCnt(this.props.userID,"users",this.state.fetchLimit,0,0),this.setState({filterTag:"user"}))}},{key:"componentWillUnmount",value:function(){this.props.onFetchCntReset(),window.removeEventListener("scroll",this.onScroll,!1)}},{key:"render",value:function(){var e=u.a.createElement(_.a,null);return this.props.cntErr&&(e=null),this.props.cnts&&0===this.props.cnts.length&&(e=u.a.createElement(f.a,{isAuth:this.props.status,det:"Users not found !!",icn:"users",filter:!0})),this.props.cnts&&this.props.cnts.length>0&&(e=u.a.createElement(m,{content:this.props.cnts,changeCnt:this.changeCntHandler})),this.props.status||(e=u.a.createElement(f.a,{isAuth:this.props.status,det:"Users not found !!",icn:"users",filter:!0})),e}}]),n}(i.Component);t.default=Object(l.f)(Object(o.b)(function(e){return{status:e.auth.status,cnts:e.cnt.cnts,skipCnt:e.cnt.skipCnt,cntTotal:e.cnt.cntTotal,filterDet:e.cnt.filterDet,cntErr:e.cnt.cntErr,addUser:e.cnt.addUser,pending:e.cnt.pending,request:e.cnt.request,blocked:e.cnt.blocked,accept:e.cnt.accept,startSearch:e.filter.startSearch}},function(e){return{onFetchShareActive:function(){return e(E.ub())},onFetchShareCntActive:function(){return e(E.tb())},onFetchCntActive:function(){return e(E.M())},onFetchNotifyActive:function(){return e(E.kb())},onFetchPtActive:function(){return e(E.mb())},onFetchQueActive:function(){return e(E.ob())},onFetchReqActive:function(){return e(E.qb())},onFetchCnt:function(t,n,s,r,a){return e(E.P(t,n,s,r,a))},onFetchCntReset:function(){return e(E.Q())},onChangeTag:function(t){return e(E.w(t))},onChangeCnt:function(t,n,s,r,a){return e(E.d(t,n,s,r,a))}}})(g))}}]);
//# sourceMappingURL=23.72406d2b.chunk.js.map