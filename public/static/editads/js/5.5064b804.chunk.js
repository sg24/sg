(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{808:function(e,t,s){"use strict";s.r(t);var r=s(50),a=s(38),n=s(27),c=s(28),l=s(30),u=s(29),i=s(0),o=s.n(i),m=s(35),d=s(5),f=s(6),p=s(7),h=s(75),b=s(68),_=s(114),v=function(e){var t=["reuse-user__det"],s=["reuse-user__det--select"],r=o.a.createElement("img",{src:e.userDet.image,alt:""}),a=o.a.createElement("div",{className:"reuse-user__det--img__status reuse-user__det--img__status--on"});if(e.userDet.status||(a=o.a.createElement("div",{className:"reuse-user__det--img__status reuse-user__det--img__status--off"})),e.userDet.username&&!e.userDet.image&&(r=o.a.createElement(_.a,{name:e.userDet.username,size:"60",round:!0})),e.selectedUser.length>0){var n,c=Object(b.a)(e.selectedUser);try{for(c.s();!(n=c.n()).done;)n.value===e.id&&(t.push("reuse-user__det--clk"),s.push("reuse-user__det--select__clk > svg"))}catch(l){c.e(l)}finally{c.f()}}return o.a.createElement("div",{className:"reuse-user",onClick:e.selected},o.a.createElement("div",{className:t.join(" ")},o.a.createElement("div",{className:"reuse-user__det--img"},r,a),o.a.createElement("ul",{className:"reuse-user__det--user"},o.a.createElement("li",{className:"reuse-user__det--user__info"},o.a.createElement("a",{href:"/users/profile/"+e.userDet.id},e.userDet.username)),o.a.createElement("li",null,o.a.createElement("div",null,e.userDet.studenttotal)," Friend")),o.a.createElement("div",{className:s.join(" ")},o.a.createElement(d.a,{icon:["fas","check-circle"]}))))},U=function(e){return e.content.map(function(t,s){return o.a.createElement(v,{key:s,userDet:t,selected:e.selected.bind(void 0,t),selectedUser:e.selectedUser,id:t.id})})},E=function(e){Object(l.a)(s,e);var t=Object(u.a)(s);function s(){var e;Object(n.a)(this,s);for(var r=arguments.length,c=new Array(r),l=0;l<r;l++)c[l]=arguments[l];return(e=t.call.apply(t,[this].concat(c))).state={value:""},e.filterContentHandler=function(t){var s="userSelect"===e.props.curTab?[].concat(Object(a.a)(e.props.offlineUser),Object(a.a)(e.props.onlineUser)):e.props.users;e.props.onFilterUser(s,t.target.value),e.setState({value:t.target.value})},e}return Object(c.a)(s,[{key:"componentDidMount",value:function(){this.props.onFilterUser(this.props.users,""),this.props.onInputDefault()}},{key:"componentDidUpdate",value:function(){this.props.defaultValue&&(this.setState({value:""}),this.props.onInputDefault())}},{key:"render",value:function(){return o.a.createElement("input",{type:"search",className:"reuse-form__itm--tab__srch--input",autoFocus:!0,placeholder:"Enter username ...",onChange:this.filterContentHandler,value:this.state.value})}}]),s}(i.Component),S=Object(m.b)(function(e){return{users:e.form.users,defaultValue:e.form.defaultValue,offlineUser:e.form.offlineUser,onlineUser:e.form.onlineUser,curTab:e.form.curTab}},function(e){return{onFilterUser:function(t,s){return e(p.U(t,s))},onInputDefault:function(){return e(p.hb())}}})(E),w=function(e){Object(l.a)(s,e);var t=Object(u.a)(s);function s(){return Object(n.a)(this,s),t.apply(this,arguments)}return Object(c.a)(s,[{key:"render",value:function(){var e=o.a.createElement(S,null);return o.a.createElement("div",{className:"reuse-form__itm--tab__srch--input-wrapper"},e)}}]),s}(i.Component),N=function(e){Object(l.a)(s,e);var t=Object(u.a)(s);function s(){var e;Object(n.a)(this,s);for(var c=arguments.length,l=new Array(c),u=0;u<c;u++)l[u]=arguments[u];return(e=t.call.apply(t,[this].concat(l))).state={curTab:"online",showNewTab:!1,users:null,showInput:!1,userSelected:e.props.media.user?Object(a.a)(e.props.media.user):[],showUserSelect:!1},e.changeTabHandler=function(t){var s=null;s="online"===t?t:s,s="offline"===t?t:s,s="userselect"===t?t:s,e.props.onResetTab(),e.setState({curTab:s,showNewTab:!0,showUserSelect:"userselect"===s})},e.showSearchInputHandler=function(){e.setState(function(e,t){return{showInput:!e.showInput}}),e.state.showInput&&e.props.onFetchUsers(e.state.curTab)},e.selectedUserHandler=function(t){var s=Object(a.a)(e.state.userSelected);if(s.filter(function(e){return e===t.id}).length>0){var r=Object(a.a)(s.filter(function(e){return e!==t.id}));return e.setState({userSelected:r,showUserSelect:"userselect"===e.state.curTab}),void(e.props.media.user&&e.props.media.user.length>0&&e.props.onAddUserSelect(Object(f.f)(e.props.media,{user:r})))}s.push(t.id),e.setState({userSelected:s,showUserSelect:"userselect"===e.state.curTab}),e.props.media.user&&e.props.media.user.length>0&&e.props.onAddUserSelect(Object(f.f)(e.props.media,{user:s}))},e.submitMediaHandler=function(){var t=Object(a.a)(e.state.userSelected),s=Object(r.a)({},e.props.media);e.props.onSubmitMedia(Object(f.f)(s,{user:t}))},e.closeMediaBoxHandler=function(){e.props.onhideMediaBox()},e}return Object(c.a)(s,[{key:"componentDidMount",value:function(){this.props.onFetchUsers(this.state.curTab)}},{key:"componentDidUpdate",value:function(){if(this.state.showNewTab&&"userselect"!==this.state.curTab&&(this.props.onFetchUsers(this.state.curTab),this.setState({showNewTab:!1,users:this.props.users})),this.state.showUserSelect&&"userselect"===this.state.curTab){var e=Object(a.a)(this.state.userSelected),t=[].concat(Object(a.a)(this.props.onlineUser),Object(a.a)(this.props.offlineUser));this.props.onShowUserSelect(t,e),this.setState({users:this.props.users,showUserSelect:!1})}}},{key:"render",value:function(){var e=null,t=["reuse-form__itm--tab__cnt--selec"],s=null;return this.props.start&&(e=o.a.createElement(h.a,null)),this.props.users&&(e=o.a.createElement(U,{content:this.props.users,selected:this.selectedUserHandler,selectedUser:this.state.userSelected})),this.props.filteredUser&&(e=o.a.createElement(U,{content:this.props.filteredUser,selected:this.selectedUserHandler,selectedUser:this.state.userSelected})),"userselect"===this.state.curTab&&t.push("reuse-form__itm--tab__cnt--selec__active"),this.state.showInput&&(s=o.a.createElement("div",{className:"reuse-form__itm--tab__srch--wrapper"},o.a.createElement("div",{className:"reuse-form__itm--tab__srch--close",onClick:this.showSearchInputHandler},o.a.createElement(d.a,{icon:["fas","times"]})),o.a.createElement(w,null))),o.a.createElement("div",{className:"reuse-form__itm reuse-form__itm--user"},o.a.createElement("div",{className:"reuse-form__itm--tab"},o.a.createElement("ul",{className:"reuse-form__itm--tab__cnt"},o.a.createElement("li",{className:"online"===this.state.curTab?"active-content-tab":null,onClick:this.changeTabHandler.bind(this,"online")},"online"===this.state.curTab?o.a.createElement("div",{className:"active-content-tab__active"}):null,"Online"),o.a.createElement("li",{className:"offline"===this.state.curTab?"active-content-tab":null,onClick:this.changeTabHandler.bind(this,"offline")},"offline"===this.state.curTab?o.a.createElement("div",{className:"active-content-tab__active"}):null,"Offline"),o.a.createElement("li",{className:"userselect"===this.state.curTab?"active-content-tab":null,onClick:this.changeTabHandler.bind(this,"userselect")},"Users Selected","userselect"===this.state.curTab?o.a.createElement("div",{className:"active-content-tab__active"}):null,o.a.createElement("div",{className:t.join(" ")},this.state.userSelected.length))),o.a.createElement("div",{className:"reuse-form__itm--tab__srch"},o.a.createElement("div",{className:"reuse-form__itm--tab__srch--icn",onClick:this.showSearchInputHandler},o.a.createElement(d.a,{icon:["fas","search"],className:"icon icon__reuse-form--srch"})),s)),o.a.createElement("div",{className:"reuse-form__itm--det"},e),o.a.createElement("div",{className:"reuse-form__itm--footer reuse-form__btn"},o.a.createElement("button",{type:"button",className:"reuse-form__btn--close",onClick:this.closeMediaBoxHandler},"Exit"),o.a.createElement("button",{type:"button",className:"reuse-form__btn--add",onClick:this.submitMediaHandler,disabled:this.state.userSelected.length<1},"Share")))}}]),s}(i.Component);t.default=Object(m.b)(function(e){return{users:e.form.users,filteredUser:e.form.filteredUser,media:e.form.media,curTab:e.form.curTab,start:e.form.startUser,offlineUser:e.form.offlineUser,onlineUser:e.form.onlineUser}},function(e){return{onFetchUsers:function(t){return e(p.P(t))},onResetTab:function(){return e(p.mb())},onAddUserSelect:function(t){return e(p.zb(t))},onShowUserSelect:function(t,s){return e(p.tb(t,s))},onSubmitMedia:function(t){return e(p.yb(t))},onhideMediaBox:function(){return e(p.fb())}}})(N)}}]);
//# sourceMappingURL=5.5064b804.chunk.js.map