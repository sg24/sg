(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{734:function(e,t,a){},737:function(e,t,a){"use strict";a.r(t);var r=a(21),n=a(22),c=a(24),i=a(25),o=a(0),s=a.n(o),u=a(8),d=a(23),m=a(112),l=a.n(m),p=a(95),v=(a(734),a(4)),f=a(5),h=a(55),g=s.a.createRef(null),b=function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return(e=t.call.apply(t,[this].concat(c))).state={start:!1,err:null,id:e.props.match.params.id,categ:e.props.match.params.categ},e.stopRecHandler=function(){g&&g.current&&Object(v.d)(g.current).then(function(t){g.current.srcObject.getVideoTracks().forEach(function(e){e.stop()}),e.props.history.goBack(),e.props.onUploadMedia([{file:t,type:"image",format:"png",chatID:l()()}],e.state.id,e.state.categ)}).catch(function(t){e.setState({err:t})})},e}return Object(n.a)(a,[{key:"componentDidMount",value:function(){"mediaDevices"in navigator||(navigator.mediaDevices={}),"getUserMedia"in navigator.mediaDevices||(navigator.mediaDevices.getUserMedia=function(e){var t=navigator.webkitGetUserMedia||navigator.mozGetUserMedia;return t?new Promise(function(a,r){t.call(navigator,e,a,r)}):Promise.reject(new Error("getUserMedia is not implemented!"))});var e=this;navigator.mediaDevices.getUserMedia({video:!0}).then(function(t){g.current.srcObject=t,e.setState({start:!0})}).catch(function(t){e.setState({err:t,start:!1})})}},{key:"componentWillUnmount",value:function(){g&&g.current&&g.current.srcObject&&g.current.srcObject.getVideoTracks().forEach(function(e){e.stop()})}},{key:"render",value:function(){var e=s.a.createElement(h.a,{bg:!0});return this.state.start&&(e=null),this.state.err&&this.props.onTypingErr(this.state.err),s.a.createElement("div",{className:"site-main__chat--cam"},s.a.createElement("div",{className:"site-main__chat--cam__wrapper"},e,s.a.createElement("video",{ref:g,autoPlay:!0,className:"site-main__chat--cam__video--wrapper"},s.a.createElement("p",null,"our browser doesn't support embedded videos")),s.a.createElement("button",{onClick:this.stopRecHandler,className:"site-main__chat--cam__control",disabled:!this.state.start},s.a.createElement(u.a,{icon:["fas","camera"],className:"icon icon__site-main--chat__footer--camera"}))))}}]),a}(o.Component);t.default=Object(p.e)(Object(d.b)(function(e){return{vidRecBackdrop:e.cnt.vidRecBackdrop}},function(e){return{onTypingErr:function(t){return e(f.H(t))},onUploadMedia:function(t,a,r){return e(f.Sb(t,a,r))}}})(b))}}]);
//# sourceMappingURL=6.a0d2c881.chunk.js.map