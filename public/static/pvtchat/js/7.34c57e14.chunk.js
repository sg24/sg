(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{739:function(t,e,a){},742:function(t,e,a){"use strict";a.r(e);var r=a(22),n=a(23),c=a(25),i=a(26),o=a(0),s=a.n(o),d=a(8),u=a(24),m=a(96),p=(a(739),a(4)),l=a(5),h=a(49),v=s.a.createRef(null),f=function(t){Object(i.a)(a,t);var e=Object(c.a)(a);function a(){var t;Object(r.a)(this,a);for(var n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return(t=e.call.apply(e,[this].concat(c))).state={start:!1,mediaRecorder:null,id:t.props.match.params.id,categ:t.props.match.params.categ},t.stopRecHandler=function(){Object(p.i)(p.f,t.state.mediaRecorder,t.state.start,{video:!0,audio:!0},"video/mp4","mp4","media","pvtMediaRecChat").then(function(e){t.setState({mediaRecorder:null,start:!1}),t.props.onUploadMedia(e,t.state.id,t.state.categ),t.props.history.goBack()}).catch(function(e){t.setState({start:!1})})},t}return Object(n.a)(a,[{key:"componentDidMount",value:function(){var t=this;Object(p.i)(p.f,this.state.mediaRecorder,this.state.start,{video:!0,audio:!0},"video/mp4","mp4","media","pvtMediaRecChat").then(function(e){v.current.srcObject=e.stream,t.setState({mediaRecorder:e.mediaRecorder,start:!0})}).catch(function(e){t.setState({start:!1})})}},{key:"componentWillUnmount",value:function(){this.state.mediaRecorder&&this.state.mediaRecorder.stream.getTracks().forEach(function(t){return t.stop()})}},{key:"render",value:function(){var t=s.a.createElement(h.a,{bg:!0});return this.state.start&&(t=null),this.state.err&&this.props.onTypingErr(this.state.err),s.a.createElement("div",{className:"site-main__chat--vidcam"},s.a.createElement("div",{className:"site-main__chat--vidcam__wrapper"},t,s.a.createElement("video",{ref:v,autoPlay:!0,className:"site-main__chat--vidcam__video--wrapper"},s.a.createElement("p",null,"our browser doesn't support embedded videos")),s.a.createElement("button",{onClick:this.stopRecHandler,className:"site-main__chat--vidcam__control",disabled:!this.state.start},s.a.createElement(d.a,{icon:["fas","video"]}))))}}]),a}(o.Component);e.default=Object(m.e)(Object(u.b)(function(t){return{vidRecBackdrop:t.cnt.vidRecBackdrop}},function(t){return{onTypingErr:function(e){return t(l.L(e))},onUploadMedia:function(e,a,r){return t(l.Xb(e,a,r))}}})(f))}}]);
//# sourceMappingURL=7.34c57e14.chunk.js.map