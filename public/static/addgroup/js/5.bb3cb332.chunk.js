(this.webpackJsonpaddgroup=this.webpackJsonpaddgroup||[]).push([[5],{811:function(e,t,s){"use strict";s.r(t);var r=s(154),a=s(65),n=s(26),c=s(27),l=s(29),u=s(28),i=s(30),o=s(0),m=s.n(o),d=s(35),h=s(5),p=s(7),f=s(6),b=s(78),_=s(109),v=function(e){var t=["reuse-user__det"],s=["reuse-user__det--select"],r=m.a.createElement("img",{src:e.userDet.image,alt:""}),a=m.a.createElement("div",{className:"reuse-user__det--img__status reuse-user__det--img__status--on"});if(e.userDet.status||(a=m.a.createElement("div",{className:"reuse-user__det--img__status reuse-user__det--img__status--off"})),e.userDet.username&&!e.userDet.image&&(r=m.a.createElement(_.a,{name:e.userDet.username,size:"60",round:!0})),e.selectedUser.length>0){var n=!0,c=!1,l=void 0;try{for(var u,i=e.selectedUser[Symbol.iterator]();!(n=(u=i.next()).done);n=!0){u.value===e.id&&(t.push("reuse-user__det--clk"),s.push("reuse-user__det--select__clk > svg"))}}catch(o){c=!0,l=o}finally{try{n||null==i.return||i.return()}finally{if(c)throw l}}}return m.a.createElement("div",{className:"reuse-user",onClick:e.selected},m.a.createElement("div",{className:t.join(" ")},m.a.createElement("div",{className:"reuse-user__det--img"},r,a),m.a.createElement("ul",{className:"reuse-user__det--user"},m.a.createElement("li",{className:"reuse-user__det--user__info"},m.a.createElement("a",{href:"/users/profile/"+e.userDet.id},e.userDet.username)),m.a.createElement("li",null,m.a.createElement("div",null,e.userDet.studenttotal)," Friend")),m.a.createElement("div",{className:s.join(" ")},m.a.createElement(h.a,{icon:["fas","check-circle"]}))))},U=function(e){return e.content.map((function(t,s){return m.a.createElement(v,{key:s,userDet:t,selected:e.selected.bind(void 0,t),selectedUser:e.selectedUser,id:t.id})}))},E=function(e){function t(){var e,s;Object(n.a)(this,t);for(var r=arguments.length,c=new Array(r),i=0;i<r;i++)c[i]=arguments[i];return(s=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(c)))).state={value:""},s.filterContentHandler=function(e){var t="userSelect"===s.props.curTab?[].concat(Object(a.a)(s.props.offlineUser),Object(a.a)(s.props.onlineUser)):s.props.users;s.props.onFilterUser(t,e.target.value),s.setState({value:e.target.value})},s}return Object(i.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.props.onFilterUser(this.props.users,""),this.props.onInputDefault()}},{key:"componentDidUpdate",value:function(){this.props.defaultValue&&(this.setState({value:""}),this.props.onInputDefault())}},{key:"render",value:function(){return m.a.createElement("input",{type:"search",className:"reuse-form__itm--tab__srch--input",autoFocus:!0,placeholder:"Enter username ...",onChange:this.filterContentHandler,value:this.state.value})}}]),t}(o.Component),S=Object(d.b)((function(e){return{users:e.form.users,defaultValue:e.form.defaultValue,offlineUser:e.form.offlineUser,onlineUser:e.form.onlineUser,curTab:e.form.curTab}}),(function(e){return{onFilterUser:function(t,s){return e(f.N(t,s))},onInputDefault:function(){return e(f.ab())}}}))(E),N=function(e){function t(){return Object(n.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=m.a.createElement(S,null);return m.a.createElement("div",{className:"reuse-form__itm--tab__srch--input-wrapper"},e)}}]),t}(o.Component),j=function(e){function t(){var e,s;Object(n.a)(this,t);for(var c=arguments.length,i=new Array(c),o=0;o<c;o++)i[o]=arguments[o];return(s=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(i)))).state={curTab:"online",showNewTab:!1,users:null,showInput:!1,userSelected:s.props.media.user?Object(a.a)(s.props.media.user):[],showUserSelect:!1},s.changeTabHandler=function(e){var t=null;t="online"===e?e:t,t="offline"===e?e:t,t="userselect"===e?e:t,s.props.onResetTab(),s.setState({curTab:t,showNewTab:!0,showUserSelect:"userselect"===t})},s.showSearchInputHandler=function(){s.setState((function(e,t){return{showInput:!e.showInput}})),s.state.showInput&&s.props.onFetchUsers(s.state.curTab)},s.selectedUserHandler=function(e){var t=Object(a.a)(s.state.userSelected);if(t.filter((function(t){return t===e.id})).length>0){var r=Object(a.a)(t.filter((function(t){return t!==e.id})));return s.setState({userSelected:r,showUserSelect:"userselect"===s.state.curTab}),void(s.props.media.user&&s.props.media.user.length>0&&s.props.onAddUserSelect(Object(p.g)(s.props.media,{user:r})))}t.push(e.id),s.setState({userSelected:t,showUserSelect:"userselect"===s.state.curTab}),s.props.media.user&&s.props.media.user.length>0&&s.props.onAddUserSelect(Object(p.g)(s.props.media,{user:t}))},s.submitMediaHandler=function(){var e=Object(a.a)(s.state.userSelected),t=Object(r.a)({},s.props.media);s.props.onSubmitMedia(Object(p.g)(t,{user:e}))},s.closeMediaBoxHandler=function(){s.props.onhideMediaBox()},s}return Object(i.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.props.onFetchUsers(this.state.curTab)}},{key:"componentDidUpdate",value:function(){if(this.state.showNewTab&&"userselect"!==this.state.curTab&&(this.props.onFetchUsers(this.state.curTab),this.setState({showNewTab:!1,users:this.props.users})),this.state.showUserSelect&&"userselect"===this.state.curTab){var e=Object(a.a)(this.state.userSelected),t=[].concat(Object(a.a)(this.props.onlineUser),Object(a.a)(this.props.offlineUser));this.props.onShowUserSelect(t,e),this.setState({users:this.props.users,showUserSelect:!1})}}},{key:"render",value:function(){var e=null,t=["reuse-form__itm--tab__cnt--selec"],s=null;return this.props.start&&(e=m.a.createElement(b.a,null)),this.props.users&&(e=m.a.createElement(U,{content:this.props.users,selected:this.selectedUserHandler,selectedUser:this.state.userSelected})),this.props.filteredUser&&(e=m.a.createElement(U,{content:this.props.filteredUser,selected:this.selectedUserHandler,selectedUser:this.state.userSelected})),"userselect"===this.state.curTab&&t.push("reuse-form__itm--tab__cnt--selec__active"),this.state.showInput&&(s=m.a.createElement("div",{className:"reuse-form__itm--tab__srch--wrapper"},m.a.createElement("div",{className:"reuse-form__itm--tab__srch--close",onClick:this.showSearchInputHandler},m.a.createElement(h.a,{icon:["fas","times"]})),m.a.createElement(N,null))),m.a.createElement("div",{className:"reuse-form__itm reuse-form__itm--user"},m.a.createElement("div",{className:"reuse-form__itm--tab"},m.a.createElement("ul",{className:"reuse-form__itm--tab__cnt"},m.a.createElement("li",{className:"online"===this.state.curTab?"active-content-tab":null,onClick:this.changeTabHandler.bind(this,"online")},"online"===this.state.curTab?m.a.createElement("div",{className:"active-content-tab__active"}):null,"Online"),m.a.createElement("li",{className:"offline"===this.state.curTab?"active-content-tab":null,onClick:this.changeTabHandler.bind(this,"offline")},"offline"===this.state.curTab?m.a.createElement("div",{className:"active-content-tab__active"}):null,"Offline"),m.a.createElement("li",{className:"userselect"===this.state.curTab?"active-content-tab":null,onClick:this.changeTabHandler.bind(this,"userselect")},"Users Selected","userselect"===this.state.curTab?m.a.createElement("div",{className:"active-content-tab__active"}):null,m.a.createElement("div",{className:t.join(" ")},this.state.userSelected.length))),m.a.createElement("div",{className:"reuse-form__itm--tab__srch"},m.a.createElement("div",{className:"reuse-form__itm--tab__srch--icn",onClick:this.showSearchInputHandler},m.a.createElement(h.a,{icon:["fas","search"],className:"icon icon__reuse-form--srch"})),s)),m.a.createElement("div",{className:"reuse-form__itm--det"},e),m.a.createElement("div",{className:"reuse-form__itm--footer reuse-form__btn"},m.a.createElement("button",{type:"button",className:"reuse-form__btn--close",onClick:this.closeMediaBoxHandler},"Exit"),m.a.createElement("button",{type:"button",className:"reuse-form__btn--add",onClick:this.submitMediaHandler,disabled:this.state.userSelected.length<1},"Invite")))}}]),t}(o.Component);t.default=Object(d.b)((function(e){return{users:e.form.users,filteredUser:e.form.filteredUser,media:e.form.media,curTab:e.form.curTab,start:e.form.startUser,offlineUser:e.form.offlineUser,onlineUser:e.form.onlineUser}}),(function(e){return{onFetchUsers:function(t){return e(f.L(t))},onResetTab:function(){return e(f.eb())},onAddUserSelect:function(t){return e(f.qb(t))},onShowUserSelect:function(t,s){return e(f.kb(t,s))},onSubmitMedia:function(t){return e(f.pb(t))},onhideMediaBox:function(){return e(f.Z())}}}))(j)}}]);
//# sourceMappingURL=5.bb3cb332.chunk.js.map