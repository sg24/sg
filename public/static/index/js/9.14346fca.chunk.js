(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{705:function(e,t,r){},706:function(e,t,r){},707:function(e,t,r){},708:function(e,t,r){},709:function(e,t,r){},710:function(e,t,r){},711:function(e,t,r){},712:function(e,t,r){},786:function(e,t,r){"use strict";r.r(t);var s=r(16),a=r(17),n=r(18),c=r(19),l=r(0),u=r.n(l),i=r(86),o=r(24),h=(r(705),r(706),r(5)),p=function(e){Object(c.a)(r,e);var t=Object(n.a)(r);function r(){var e;Object(s.a)(this,r);for(var a=arguments.length,n=new Array(a),c=0;c<a;c++)n[c]=arguments[c];return(e=t.call.apply(t,[this].concat(n))).state={inputValue:""},e.filterContentHandler=function(t){e.setState({inputValue:t.target.value}),e.props.onFilterUser(e.props.users,t.target.value)},e}return Object(a.a)(r,[{key:"render",value:function(){return u.a.createElement("input",{className:"reuse-share__search--cnt",placeholder:"search user....",autoFocus:!0,onChange:this.filterContentHandler,value:this.state.inputValue})}}]),r}(l.Component),f=Object(o.b)(function(e){return{users:e.share.users}},function(e){return{onFilterUser:function(t,r){return e(h.Kb(t,r))}}})(p),m=function(e){Object(c.a)(r,e);var t=Object(n.a)(r);function r(){var e;Object(s.a)(this,r);for(var a=arguments.length,n=new Array(a),c=0;c<a;c++)n[c]=arguments[c];return(e=t.call.apply(t,[this].concat(n))).state={inputValue:""},e.filterContentHandler=function(t){e.props.onFilterUserSelect(t.target.value,e.props.userSelect),e.setState({inputValue:t.target.value})},e}return Object(a.a)(r,[{key:"componentDidMount",value:function(){this.props.onFilterUserSelect("",this.props.userSelect)}},{key:"render",value:function(){return u.a.createElement("input",{className:"reuse-share__search--cnt",placeholder:"search user selected....",autoFocus:!0,onChange:this.filterContentHandler,value:this.state.inputValue})}}]),r}(l.Component),d=Object(o.b)(function(e){return{userSelect:e.share.userSelect}},function(e){return{onFilterUserSelect:function(t,r){return e(h.Mb(t,r))}}})(m),v=function(e){Object(c.a)(r,e);var t=Object(n.a)(r);function r(){return Object(s.a)(this,r),t.apply(this,arguments)}return Object(a.a)(r,[{key:"render",value:function(){var e=u.a.createElement(f,null);return this.props.viewAllUsers||(e=u.a.createElement(d,null)),u.a.createElement("div",{className:"reuse-share__search"},e)}}]),r}(l.Component),_=Object(o.b)(function(e){return{viewAllUsers:e.share.viewAllUsers}},null)(v),S=r(37),w=r(87),b=(r(707),r(93)),E=r(8),U=r(73),O=(r(708),function(e){var t=["share-user__det"],r=["share-user__det--select"],s=u.a.createElement("img",{src:e.userDet.image,alt:""}),a=u.a.createElement("div",{className:"share-user__det--img__status share-user__det--img__status--on"});if(e.userDet.status||(a=u.a.createElement("div",{className:"share-user__det--img__status share-user__det--img__status--off"})),e.userDet.username&&!e.userDet.image&&(s=u.a.createElement(U.a,{name:e.userDet.username,size:"60",round:!0})),e.selectedUser.length>0){var n,c=Object(b.a)(e.selectedUser);try{for(c.s();!(n=c.n()).done;)n.value.id===e.id&&(t.push("share-user__det--clk"),r.push("share-user__det--select__clk > svg"))}catch(l){c.e(l)}finally{c.f()}}return u.a.createElement("div",{className:"share-user",onClick:e.selected},u.a.createElement("div",{className:t.join(" ")},u.a.createElement("div",{className:"share-user__det--img"},s,a),u.a.createElement("ul",{className:"share-user__det--user"},u.a.createElement("li",{className:"share-user__det--user__info"},u.a.createElement("a",{href:"/user/profile/"+e.userDet.id},e.userDet.username)),u.a.createElement("li",null,u.a.createElement("div",null,e.userDet.student)," Student")),u.a.createElement("div",{className:r.join(" ")},u.a.createElement(E.a,{icon:["fas","check-circle"]}))))}),j=function(e){return e.content.map(function(t,r){return u.a.createElement(O,{key:r,userDet:t,selected:e.selected.bind(void 0,t),selectedUser:e.selectedUser,id:t.id})})},k=r(40),y=function(e){Object(c.a)(r,e);var t=Object(n.a)(r);function r(){var e;Object(s.a)(this,r);for(var a=arguments.length,n=new Array(a),c=0;c<a;c++)n[c]=arguments[c];return(e=t.call.apply(t,[this].concat(n))).state={users:e.props.userSelect?e.props.userSelect:[]},e.showSelectedUserHandler=function(t){var r=e.state.users.filter(function(e){return e.id===t.id});if(r.length>0){var s=Object(w.a)({},r[0]),a=Object(S.a)(e.state.users).filter(function(e){return e.id!==s.id});return e.setState({users:a}),void e.props.onSelectUser(a)}var n=e.state.users.concat(t);e.props.onSelectUser(n),e.setState(function(e){return{users:n}})},e}return Object(a.a)(r,[{key:"componentDidMount",value:function(){this.props.onFetchUsers()}},{key:"render",value:function(){var e=u.a.createElement(k.a,null);return this.props.users&&(e=u.a.createElement("div",{className:"reuse-share__all-users"},u.a.createElement(j,{content:this.props.filterUser?this.props.filterUser:this.props.users,selected:this.showSelectedUserHandler,selectedUser:this.state.users}))),e}}]),r}(l.Component),g=Object(o.b)(function(e){return{users:e.share.users,userSelect:e.share.userSelect,filterUser:e.share.filterUser}},function(e){return{onFetchUsers:function(){return e(h.Bb())},onSelectUser:function(t){return e(h.rc(t))}}})(y),N=(r(709),function(e){Object(c.a)(r,e);var t=Object(n.a)(r);function r(){var e;Object(s.a)(this,r);for(var a=arguments.length,n=new Array(a),c=0;c<a;c++)n[c]=arguments[c];return(e=t.call.apply(t,[this].concat(n))).state={users:e.props.userSelect},e.removeSelectedUserHandler=function(t){var r=e.state.users.filter(function(e){return e.id===t.id});if(r.length>0){var s=Object(w.a)({},r[0]),a=Object(S.a)(e.state.users).filter(function(e){return e.id!==s.id}),n=e.props.userSelect.filter(function(e){return e.id!==s.id});return e.props.onRemoveUser(n),e.props.onFilterUserSelect(null,a),void e.setState({users:a})}},e}return Object(a.a)(r,[{key:"componentDidUpdate",value:function(){this.props.filterUserSelect&&JSON.stringify(this.state.users)!==JSON.stringify(this.props.filterUserSelect)&&this.setState({users:this.props.filterUserSelect})}},{key:"render",value:function(){var e=u.a.createElement(k.a,null);return this.state.users&&(e=u.a.createElement(j,{content:this.state.users,selected:this.removeSelectedUserHandler,selectedUser:this.state.users})),u.a.createElement("div",{className:"reuse-share__user-select"},u.a.createElement("h4",{className:"reuse-share__user-select--title"},u.a.createElement(E.a,{icon:["fas","users"],className:"icon icon__reuse-share--user"}),"User Selected"),e)}}]),r}(l.Component)),H=Object(o.b)(function(e){return{userSelect:e.share.userSelect,filterUserSelect:e.share.filterUserSelect}},function(e){return{onRemoveUser:function(t){return e(h.bc(t))},onFilterUserSelect:function(t,r){return e(h.Mb(t,r))}}})(N),D=function(e){Object(c.a)(r,e);var t=Object(n.a)(r);function r(){return Object(s.a)(this,r),t.apply(this,arguments)}return Object(a.a)(r,[{key:"render",value:function(){var e=u.a.createElement(g,null);return this.props.viewAllUsers||(e=u.a.createElement(H,null)),e}}]),r}(l.Component),C=Object(o.b)(function(e){return{viewAllUsers:e.share.viewAllUsers}},null)(D),A=(r(710),r(62)),F=function(e){var t=u.a.createElement(A.a,null,u.a.createElement(E.a,{icon:["fas","users"],className:"icon__reuse-share--view"}),"Users");return e.viewAllUsers&&(t=u.a.createElement(A.a,null,u.a.createElement(E.a,{icon:["far","eye"],className:"icon__reuse-share--view"}),"View")),u.a.createElement("div",{className:"reuse-share__user-counter reuse-share__user-counter--more-opt"},u.a.createElement("div",{className:"reuse-share__user-counter--share",onClick:e.shareUser},u.a.createElement(E.a,{icon:["fas","location-arrow"],className:"icon icon__reuse-share--share"}),"Share",u.a.createElement("div",{className:"reuse-share__user-counter--share__select"},e.userSelect.length)),u.a.createElement("div",{className:"reuse-share__user-counter--view",onClick:e.viewUsers},t))},M=(r(711),function(e){var t=["reuse-share__social-icn"];return e.switchOpt&&t.push("reuse-share__social-icn--more-opt"),u.a.createElement("ul",{className:t.join(" ")},u.a.createElement("li",{onClick:e.shareFacebook},u.a.createElement(E.a,{icon:["fab","facebook-square"],className:"icon icon__reuse-share--facebook"})),u.a.createElement("li",{onClick:e.shareTwitter},u.a.createElement(E.a,{icon:["fab","twitter"],className:"icon icon__reuse-share--googleplus"})))}),V=(r(712),function(e){return u.a.createElement("div",{className:"reuse-share__switch-opt",onClick:e.switchOpt},u.a.createElement("div",{className:"reuse-share__switch-opt--mid"}))}),I=function(e){Object(c.a)(r,e);var t=Object(n.a)(r);function r(){var e;Object(s.a)(this,r);for(var a=arguments.length,n=new Array(a),c=0;c<a;c++)n[c]=arguments[c];return(e=t.call.apply(t,[this].concat(n))).state={showSocialMed:!0,showShareUser:!1,userSelect:null},e.switchShareOptHandler=function(){e.setState(function(e,t){return{showSocialMed:!e.showSocialMed,showShareUser:!e.showShareUser}})},e.viewUsersHandler=function(){e.props.onViewUsers()},e.shareUserHandler=function(){e.props.onShareUser(e.props.userSelect,e.props.shareID,e.props.cntType)},e.facebookShareHandler=function(){var t=window.open("https://www.facebook.com/sharer/sharer.php?u=".concat(document.location.origin,"/view/").concat(e.props.cntType,"/").concat(e.props.shareID),"facebook-popup","height=350,width=600");return t.focus&&t.focus(),!1},e.twitterShareHandler=function(){var t=window.open("https://twitter.com/share?url=".concat(document.location.origin,"/view/").concat(e.props.cntType,"/").concat(e.props.shareID),"twitter-popup","height=350,width=600");return t.focus&&t.focus(),!1},e}return Object(a.a)(r,[{key:"componentDidUpdate",value:function(e,t){var r=this;this.state.userSelect!==this.props.userSelect&&this.setState(function(e,t){return{showSocialMed:!(r.props.userSelect.length>0),showShareUser:r.props.userSelect.length>0,userSelect:r.props.userSelect}})}},{key:"render",value:function(){var e=null;return this.state.showSocialMed&&(e=u.a.createElement(M,{shareFacebook:this.facebookShareHandler,shareTwitter:this.twitterShareHandler})),this.state.userSelect&&this.state.userSelect.length>0&&this.state.showSocialMed&&(e=u.a.createElement(A.a,null,u.a.createElement(M,{switchOpt:!0,shareFacebook:this.facebookShareHandler,shareTwitter:this.twitterShareHandler}),u.a.createElement(V,{switchOpt:this.switchShareOptHandler}))),this.state.showShareUser&&(e=u.a.createElement(A.a,null,u.a.createElement(F,{userSelect:this.state.userSelect,viewUsers:this.viewUsersHandler,viewAllUsers:this.props.viewAllUsers,shareUser:this.shareUserHandler}),u.a.createElement(V,{switchOpt:this.switchShareOptHandler}))),e}}]),r}(l.Component),T=Object(o.b)(function(e){return{userSelect:e.share.userSelect,viewAllUsers:e.share.viewAllUsers,shareID:e.share.shareID,cntType:e.share.cntType}},function(e){return{onViewUsers:function(){return e(h.sc())},onShareUser:function(t,r,s){return e(h.kc(t,r,s))}}})(I),J=r(162),B=function(e){Object(c.a)(r,e);var t=Object(n.a)(r);function r(){var e;Object(s.a)(this,r);for(var a=arguments.length,n=new Array(a),c=0;c<a;c++)n[c]=arguments[c];return(e=t.call.apply(t,[this].concat(n))).closeShareHandler=function(){e.props.history.goBack()},e}return Object(a.a)(r,[{key:"componentWillUnmount",value:function(){this.props.onDefaultShareProps()}},{key:"render",value:function(){var e=u.a.createElement("div",{className:"reuse-share__wrapper"},u.a.createElement(_,null),u.a.createElement(C,null),u.a.createElement(T,null));this.props.start&&(e=u.a.createElement("div",{className:"reuse-share__wrapper"},u.a.createElement(k.a,{cnt:"Sharing ....."}))),this.props.shareErr&&(e=u.a.createElement(J.a,{err:this.props.shareErr}));var t=u.a.createElement("div",{className:"reuse-share"},u.a.createElement("div",{className:"reuse-share__main-wrapper"},u.a.createElement("div",{className:"reuse-share__backdrop",onClick:this.closeShareHandler}),e));return this.props.shareID||(this.closeShareHandler(),t=null),t}}]),r}(l.Component);t.default=Object(i.f)(Object(o.b)(function(e){return{start:e.share.start,shareErr:e.share.shareErr,shareID:e.share.shareID,status:e.auth.status}},function(e){return{onDefaultShareProps:function(){return e(h.jc())}}})(B))}}]);
//# sourceMappingURL=9.14346fca.chunk.js.map