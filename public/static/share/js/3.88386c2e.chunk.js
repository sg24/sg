(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{669:function(e,t,r){},670:function(e,t,r){},671:function(e,t,r){},672:function(e,t,r){},673:function(e,t,r){},674:function(e,t,r){},675:function(e,t,r){},676:function(e,t,r){},677:function(e,t,r){"use strict";r.r(t);var s=r(12),a=r(13),n=r(15),c=r(14),u=r(16),l=r(0),i=r.n(l),o=r(89),h=r(19),p=(r(669),r(670),r(4)),f=function(e){function t(){var e,r;Object(s.a)(this,t);for(var a=arguments.length,u=new Array(a),l=0;l<a;l++)u[l]=arguments[l];return(r=Object(n.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(u)))).state={inputValue:""},r.filterContentHandler=function(e){r.setState({inputValue:e.target.value}),r.props.onFilterUser(r.props.users,e.target.value)},r}return Object(u.a)(t,e),Object(a.a)(t,[{key:"render",value:function(){return i.a.createElement("input",{className:"reuse-share__search--cnt",placeholder:"search user....",autoFocus:!0,onChange:this.filterContentHandler,value:this.state.inputValue})}}]),t}(l.Component),d=Object(h.b)(function(e){return{users:e.share.users}},function(e){return{onFilterUser:function(t,r){return e(p.ib(t,r))}}})(f),m=function(e){function t(){var e,r;Object(s.a)(this,t);for(var a=arguments.length,u=new Array(a),l=0;l<a;l++)u[l]=arguments[l];return(r=Object(n.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(u)))).state={inputValue:""},r.filterContentHandler=function(e){r.props.onFilterUserSelect(e.target.value,r.props.userSelect),r.setState({inputValue:e.target.value})},r}return Object(u.a)(t,e),Object(a.a)(t,[{key:"componentDidMount",value:function(){this.props.onFilterUserSelect("",this.props.userSelect)}},{key:"render",value:function(){return i.a.createElement("input",{className:"reuse-share__search--cnt",placeholder:"search user selected....",autoFocus:!0,onChange:this.filterContentHandler,value:this.state.inputValue})}}]),t}(l.Component),v=Object(h.b)(function(e){return{userSelect:e.share.userSelect}},function(e){return{onFilterUserSelect:function(t,r){return e(p.kb(t,r))}}})(m),S=function(e){function t(){return Object(s.a)(this,t),Object(n.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(a.a)(t,[{key:"render",value:function(){var e=i.a.createElement(d,null);return this.props.viewAllUsers||(e=i.a.createElement(v,null)),i.a.createElement("div",{className:"reuse-share__search"},e)}}]),t}(l.Component),b=Object(h.b)(function(e){return{viewAllUsers:e.share.viewAllUsers}},null)(S),_=r(30),w=r(67),U=(r(671),r(3)),E=r(48),O=(r(672),function(e){var t=["reuse-user__det"],r=["reuse-user__det--select"],s=i.a.createElement("img",{src:e.userDet.image,alt:""}),a=i.a.createElement("div",{className:"reuse-user__det--img__status reuse-user__det--img__status--on"});if(e.userDet.status||(a=i.a.createElement("div",{className:"reuse-user__det--img__status reuse-user__det--img__status--off"})),e.userDet.username&&!e.userDet.image&&(s=i.a.createElement(E.a,{name:e.userDet.username,size:"60",round:!0})),e.selectedUser.length>0){var n=!0,c=!1,u=void 0;try{for(var l,o=e.selectedUser[Symbol.iterator]();!(n=(l=o.next()).done);n=!0)l.value.id===e.id&&(t.push("reuse-user__det--clk"),r.push("reuse-user__det--select__clk > svg"))}catch(h){c=!0,u=h}finally{try{n||null==o.return||o.return()}finally{if(c)throw u}}}return i.a.createElement("div",{className:"reuse-user",onClick:e.selected},i.a.createElement("div",{className:t.join(" ")},i.a.createElement("div",{className:"reuse-user__det--img"},s,a),i.a.createElement("ul",{className:"reuse-user__det--user"},i.a.createElement("li",{className:"reuse-user__det--user__info"},i.a.createElement("a",{href:"/user/profile/"+e.userDet.id},e.userDet.username)),i.a.createElement("li",null,i.a.createElement("div",null,e.userDet.studenttotal)," Friend")),i.a.createElement("div",{className:r.join(" ")},i.a.createElement(U.a,{icon:["fas","check-circle"]}))))}),j=function(e){return e.content.map(function(t,r){return i.a.createElement(O,{key:r,userDet:t,selected:e.selected.bind(void 0,t),selectedUser:e.selectedUser,id:t.id})})},y=r(39),g=function(e){function t(){var e,r;Object(s.a)(this,t);for(var a=arguments.length,u=new Array(a),l=0;l<a;l++)u[l]=arguments[l];return(r=Object(n.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(u)))).state={users:r.props.userSelect?r.props.userSelect:[]},r.showSelectedUserHandler=function(e){var t=r.state.users.filter(function(t){return t.id===e.id});if(t.length>0){var s=Object(w.a)({},t[0]),a=Object(_.a)(r.state.users).filter(function(e){return e.id!==s.id});return r.setState({users:a}),void r.props.onSelectUser(a)}var n=r.state.users.concat(e);r.props.onSelectUser(n),r.setState(function(e){return{users:n}})},r}return Object(u.a)(t,e),Object(a.a)(t,[{key:"componentDidMount",value:function(){this.props.onFetchUsers()}},{key:"render",value:function(){var e=i.a.createElement(y.a,null);return this.props.users&&(e=i.a.createElement("div",{className:"reuse-share__all-users"},i.a.createElement(j,{content:this.props.filterUser?this.props.filterUser:this.props.users,selected:this.showSelectedUserHandler,selectedUser:this.state.users}))),e}}]),t}(l.Component),k=Object(h.b)(function(e){return{users:e.share.users,userSelect:e.share.userSelect,filterUser:e.share.filterUser}},function(e){return{onFetchUsers:function(){return e(p.bb())},onSelectUser:function(t){return e(p.Fb(t))}}})(g),N=(r(673),function(e){function t(){var e,r;Object(s.a)(this,t);for(var a=arguments.length,u=new Array(a),l=0;l<a;l++)u[l]=arguments[l];return(r=Object(n.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(u)))).state={users:r.props.userSelect},r.removeSelectedUserHandler=function(e){var t=r.state.users.filter(function(t){return t.id===e.id});if(t.length>0){var s=Object(w.a)({},t[0]),a=Object(_.a)(r.state.users).filter(function(e){return e.id!==s.id}),n=r.props.userSelect.filter(function(e){return e.id!==s.id});return r.props.onRemoveUser(n),r.props.onFilterUserSelect(null,a),void r.setState({users:a})}},r}return Object(u.a)(t,e),Object(a.a)(t,[{key:"componentDidUpdate",value:function(){this.props.filterUserSelect&&JSON.stringify(this.state.users)!==JSON.stringify(this.props.filterUserSelect)&&this.setState({users:this.props.filterUserSelect})}},{key:"render",value:function(){var e=i.a.createElement(y.a,null);return this.state.users&&(e=i.a.createElement(j,{content:this.state.users,selected:this.removeSelectedUserHandler,selectedUser:this.state.users})),i.a.createElement("div",{className:"reuse-share__user-select"},i.a.createElement("h4",{className:"reuse-share__user-select--title"},i.a.createElement(U.a,{icon:["fas","users"],className:"icon icon__reuse-share--user"}),"User Selected"),e)}}]),t}(l.Component)),H=Object(h.b)(function(e){return{userSelect:e.share.userSelect,filterUserSelect:e.share.filterUserSelect}},function(e){return{onRemoveUser:function(t){return e(p.ub(t))},onFilterUserSelect:function(t,r){return e(p.kb(t,r))}}})(N),D=function(e){function t(){return Object(s.a)(this,t),Object(n.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(a.a)(t,[{key:"render",value:function(){var e=i.a.createElement(k,null);return this.props.viewAllUsers||(e=i.a.createElement(H,null)),e}}]),t}(l.Component),C=Object(h.b)(function(e){return{viewAllUsers:e.share.viewAllUsers}},null)(D),A=(r(674),r(42)),F=function(e){var t=i.a.createElement(A.a,null,i.a.createElement(U.a,{icon:["fas","users"],className:"icon__reuse-share--view"}),"Users");return e.viewAllUsers&&(t=i.a.createElement(A.a,null,i.a.createElement(U.a,{icon:["far","eye"],className:"icon__reuse-share--view"}),"View")),i.a.createElement("div",{className:"reuse-share__user-counter reuse-share__user-counter--more-opt"},i.a.createElement("div",{className:"reuse-share__user-counter--share",onClick:e.shareUser},i.a.createElement(U.a,{icon:["fas","location-arrow"],className:"icon icon__reuse-share--share"}),"Share",i.a.createElement("div",{className:"reuse-share__user-counter--share__select"},e.userSelect.length)),i.a.createElement("div",{className:"reuse-share__user-counter--view",onClick:e.viewUsers},t))},V=(r(675),function(e){var t=["reuse-share__social-icn"];return e.switchOpt&&t.push("reuse-share__social-icn--more-opt"),i.a.createElement("ul",{className:t.join(" ")})}),I=(r(676),function(e){return i.a.createElement("div",{className:"reuse-share__switch-opt",onClick:e.switchOpt},i.a.createElement("div",{className:"reuse-share__switch-opt--mid"}))}),M=function(e){function t(){var e,r;Object(s.a)(this,t);for(var a=arguments.length,u=new Array(a),l=0;l<a;l++)u[l]=arguments[l];return(r=Object(n.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(u)))).state={showSocialMed:!0,showShareUser:!1,userSelect:null},r.switchShareOptHandler=function(){r.setState(function(e,t){return{showSocialMed:!e.showSocialMed,showShareUser:!e.showShareUser}})},r.viewUsersHandler=function(){r.props.onViewUsers()},r.shareUserHandler=function(){r.props.onShareUser(r.props.userSelect,r.props.shareID,r.props.cntType)},r.facebookShareHandler=function(){var e=window.open("https://www.facebook.com/sharer/sharer.php?u=".concat(document.location.origin,"/view/").concat(r.props.cntType,"/").concat(r.props.shareID),"facebook-popup","height=350,width=600");return e.focus&&e.focus(),!1},r.twitterShareHandler=function(){var e=window.open("https://twitter.com/share?url=".concat(document.location.origin,"/view/").concat(r.props.cntType,"/").concat(r.props.shareID),"twitter-popup","height=350,width=600");return e.focus&&e.focus(),!1},r}return Object(u.a)(t,e),Object(a.a)(t,[{key:"componentDidUpdate",value:function(e,t){var r=this;this.state.userSelect!==this.props.userSelect&&this.setState(function(e,t){return{showSocialMed:!(r.props.userSelect.length>0),showShareUser:r.props.userSelect.length>0,userSelect:r.props.userSelect}})}},{key:"render",value:function(){var e=null;return this.state.showSocialMed&&(e=i.a.createElement(V,{shareFacebook:this.facebookShareHandler,shareTwitter:this.twitterShareHandler})),this.state.userSelect&&this.state.userSelect.length>0&&this.state.showSocialMed&&(e=i.a.createElement(A.a,null,i.a.createElement(V,{switchOpt:!0,shareFacebook:this.facebookShareHandler,shareTwitter:this.twitterShareHandler}),i.a.createElement(I,{switchOpt:this.switchShareOptHandler}))),this.state.showShareUser&&(e=i.a.createElement(A.a,null,i.a.createElement(F,{userSelect:this.state.userSelect,viewUsers:this.viewUsersHandler,viewAllUsers:this.props.viewAllUsers,shareUser:this.shareUserHandler}),i.a.createElement(I,{switchOpt:this.switchShareOptHandler}))),e}}]),t}(l.Component),T=Object(h.b)(function(e){return{userSelect:e.share.userSelect,viewAllUsers:e.share.viewAllUsers,shareID:e.share.shareID,cntType:e.share.cntType}},function(e){return{onViewUsers:function(){return e(p.Gb())},onShareUser:function(t,r,s){return e(p.zb(t,r,s))}}})(M),J=r(213),z=function(e){function t(){var e,r;Object(s.a)(this,t);for(var a=arguments.length,u=new Array(a),l=0;l<a;l++)u[l]=arguments[l];return(r=Object(n.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(u)))).closeShareHandler=function(){r.props.history.goBack()},r}return Object(u.a)(t,e),Object(a.a)(t,[{key:"componentWillUnmount",value:function(){this.props.onDefaultShareProps()}},{key:"render",value:function(){var e=i.a.createElement("div",{className:"reuse-share__wrapper"},i.a.createElement(b,null),i.a.createElement(C,null),i.a.createElement(T,null));this.props.start&&(e=i.a.createElement("div",{className:"reuse-share__wrapper"},i.a.createElement(y.a,{cnt:"Sharing ....."}))),this.props.shareErr&&(e=i.a.createElement(J.a,{err:this.props.shareErr}));var t=i.a.createElement("div",{className:"reuse-share"},i.a.createElement("div",{className:"reuse-share__main-wrapper"},i.a.createElement("div",{className:"reuse-share__backdrop",onClick:this.closeShareHandler}),e));return this.props.shareID||(this.closeShareHandler(),t=null),t}}]),t}(l.Component);t.default=Object(o.e)(Object(h.b)(function(e){return{start:e.share.start,shareErr:e.share.shareErr,shareID:e.share.shareID,status:e.auth.status}},function(e){return{onDefaultShareProps:function(){return e(p.yb())}}})(z))}}]);
//# sourceMappingURL=3.88386c2e.chunk.js.map