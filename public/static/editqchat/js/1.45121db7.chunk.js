(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{800:function(e,t){var a="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(a){var i=new Uint8Array(16);e.exports=function(){return a(i),i}}else{var r=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0===(3&t)&&(e=4294967296*Math.random()),r[t]=e>>>((3&t)<<3)&255;return r}}},801:function(e,t){for(var a=[],i=0;i<256;++i)a[i]=(i+256).toString(16).substr(1);e.exports=function(e,t){var i=t||0,r=a;return[r[e[i++]],r[e[i++]],r[e[i++]],r[e[i++]],"-",r[e[i++]],r[e[i++]],"-",r[e[i++]],r[e[i++]],"-",r[e[i++]],r[e[i++]],"-",r[e[i++]],r[e[i++]],r[e[i++]],r[e[i++]],r[e[i++]],r[e[i++]]].join("")}},802:function(e,t,a){var i=a(803),r=a(804),n=r;n.v1=i,n.v4=r,e.exports=n},803:function(e,t,a){var i,r,n=a(800),o=a(801),s=0,d=0;e.exports=function(e,t,a){var l=t&&a||0,m=t||[],c=(e=e||{}).node||i,u=void 0!==e.clockseq?e.clockseq:r;if(null==c||null==u){var p=n();null==c&&(c=i=[1|p[0],p[1],p[2],p[3],p[4],p[5]]),null==u&&(u=r=16383&(p[6]<<8|p[7]))}var v=void 0!==e.msecs?e.msecs:(new Date).getTime(),f=void 0!==e.nsecs?e.nsecs:d+1,_=v-s+(f-d)/1e4;if(_<0&&void 0===e.clockseq&&(u=u+1&16383),(_<0||v>s)&&void 0===e.nsecs&&(f=0),f>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");s=v,d=f,r=u;var h=(1e4*(268435455&(v+=122192928e5))+f)%4294967296;m[l++]=h>>>24&255,m[l++]=h>>>16&255,m[l++]=h>>>8&255,m[l++]=255&h;var b=v/4294967296*1e4&268435455;m[l++]=b>>>8&255,m[l++]=255&b,m[l++]=b>>>24&15|16,m[l++]=b>>>16&255,m[l++]=u>>>8|128,m[l++]=255&u;for(var M=0;M<6;++M)m[l+M]=c[M];return t||o(m)}},804:function(e,t,a){var i=a(800),r=a(801);e.exports=function(e,t,a){var n=t&&a||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var o=(e=e||{}).random||(e.rng||i)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t)for(var s=0;s<16;++s)t[n+s]=o[s];return t||r(o)}},805:function(e,t,a){"use strict";var i=a(0),r=a.n(i),n=a(7),o=function(e){var t=["reuse-form__itm--det__view-select--media__wrapper"],a=["reuse-form__itm--det__view-select--media__wrapper--close"],i=r.a.createElement("img",{src:e.link,alt:"post",className:"reuse-form__itm--det__view-select--media__wrapper--cnt"});return e.index===e.removeMediaItemIndex&&(t.push("reuse-form__itm--det__view-select--media__wrapper--active"),a.push("reuse-form__itm--det__view-select--media__wrapper--close__active")),"video"===e.mediaType&&(i=r.a.createElement("video",{src:e.link,controls:!0,className:"reuse-form__itm--det__view-select--media__wrapper--cnt"},r.a.createElement("p",null,"our browser doesn't support embedded videos"))),r.a.createElement("div",{className:"reuse-form__itm--det__view-select--media"},r.a.createElement("div",{className:t.join(" ")},i,r.a.createElement("div",{className:a.join(" "),onClick:e.removeMediaItem,onMouseEnter:e.removeMediaItemEnable,onMouseLeave:e.removeMediaItemDisable},r.a.createElement(n.a,{icon:["fas","times"],className:"icon icon__reuse-form--view-select__close"}))))};t.a=function(e){return e.media.map(function(t,a){return r.a.createElement(o,{key:a,link:t.url,index:a,mediaType:e.mediaType,removeMediaItem:e.removeMediaItem.bind(void 0,t.id),removeMediaItemEnable:e.removeMediaItemEnable.bind(void 0,a),removeMediaItemDisable:e.removeMediaItemDisable.bind(void 0,a),removeMediaItemIndex:e.removeMediaItemIndex})})}},807:function(e,t,a){"use strict";a.r(t);var i=a(39),r=a(36),n=a(56),o=a(26),s=a(27),d=a(29),l=a(28),m=a(0),c=a.n(m),u=a(33),p=a(7),v=a(802),f=a.n(v),_=a(5),h=a(6),b=a(805),M=function(e){Object(d.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(o.a)(this,a);for(var s=arguments.length,d=new Array(s),l=0;l<s;l++)d[l]=arguments[l];return(e=t.call.apply(t,[this].concat(d))).state={inputValue:"",snapshot:e.props.media.video?Object(n.a)(e.props.snapshot):[],media:e.props.media.video?Object(n.a)(e.props.media.video):[],removeMediaItemIndex:null,mediaRemoved:!1,snapshotErr:null,position:e.props.position},e.linkVerifyHandler=function(t){var a=t.target.value;e.setState({inputValue:a,snapshotErr:null}),e.props.onCheckLink(a)},e.addMediaHandler=function(){if(e.props.linkValid&&e.props.linkValid.media){var t=f()(),a=Object(n.a)(e.state.media);a.push(Object(h.h)(e.props.linkValid.media,{id:t})),e.setState({media:a,inputValue:""}),e.props.onResetLink()}},e.selectMediaHandler=function(t){if(e.setState({snapshotErr:null}),t.stopPropagation(),t.preventDefault(),t.target.files){var a=t.target.files;e.handleFiles(a)}},e.dragEnterMediaHandler=function(e){e.stopPropagation(),e.preventDefault()},e.dragOverMediaHandler=function(e){e.stopPropagation(),e.preventDefault()},e.dropMediaHandler=function(t){if(t.stopPropagation(),t.preventDefault(),t.dataTransfer){var a=t.dataTransfer.files;e.handleFiles(a)}},e.removeMediaItemEnableHandler=function(t){e.setState({removeMediaItemIndex:t})},e.removeMediaItemDisableHandler=function(){e.setState({removeMediaItemIndex:null})},e.removeMediaItemHandler=function(t){var a=Object(n.a)(e.state.media),i=Object(n.a)(e.state.snapshot),o=a.filter(function(e){return e.id!==t}),s=i.filter(function(e){return e.id!==t});if(e.setState({media:o,snapshot:s,mediaRemoved:!0}),e.props.media.video&&e.props.media.video.length>0){e.props.onRemoveMedia(Object(h.h)(e.props.media,{video:o}));var d=JSON.parse(localStorage.getItem("question")),l=d.filter(function(t){return t.position===e.state.position})[0],m=localStorage.getItem("removedMedia")?JSON.parse(localStorage.getItem("removedMedia")):[],c=l.video?l.video:[],u=l.snapshot?l.snapshot:[],p=c.filter(function(e){return e.id===t})[0],v=u.filter(function(e){return e.videoCnt===t})[0];if(p){var f=c.filter(function(e){return e.id!==t}),_=u.filter(function(e){return e.videoCnt!==t});l.video=f,l.snapshot=_;var b=d.filter(function(t){return t.position!==e.state.position});b.push(l),m.push(Object(r.a)(Object(r.a)({},v),{},{mediaType:"snapshot"})),localStorage.setItem("question",JSON.stringify(b)),localStorage.setItem("removedMedia",JSON.stringify(m))}}},e.handleFiles=function(t){for(var a=Object(n.a)(e.state.media),i=0;i<t.length;i++){var r=t[i];if(r.type.startsWith("video/")){var o=f()(),s=window.URL.createObjectURL(r);a.push({file:r,url:s,id:o}),e.setState({media:a})}}},e.submitMediaHandler=function(){var t=Object(r.a)({},e.props.media);e.saveMedia(),e.props.onSubmitMedia(Object(h.h)(t,{video:Object(n.a)(e.state.media)}))},e.closeMediaBoxHandler=function(){e.state.mediaRemoved&&e.saveMedia(),e.props.onhideMediaBox()},e.saveMedia=function(){var t,a=e.state.media,r=[],n=Object(i.a)(a);try{for(n.s();!(t=n.n()).done;){var o=t.value;o.file&&r.push(o)}}catch(s){n.e(s)}finally{n.f()}"indexedDB"in window&&Object(h.f)("media",e.state.position).then(function(t){var a=[],n=[].concat(r);if(t){var o,d=Object(i.a)(t.image);try{for(d.s();!(o=d.n()).done;){var l=o.value;a.push({file:l.file,id:l.id,url:window.URL.createObjectURL(l.file)})}}catch(s){d.e(s)}finally{d.f()}}Object(h.i)("media",{position:e.state.position,image:a,video:n})})},e}return Object(s.a)(a,[{key:"render",value:function(){var e=null,t=null;return this.props.linkValid&&(e=this.props.linkValid.media?c.a.createElement("video",{src:this.props.linkValid.media.url,controls:!0},c.a.createElement("p",null,"our browser doesn't support embedded videos")):c.a.createElement("div",{className:"reuse-form__err"},this.props.linkValid.err.message)),this.state.media.length>0&&(t=c.a.createElement("div",{className:"reuse-form__itm--det__view-select"},c.a.createElement(b.a,{media:this.state.media,mediaType:"video",removeMediaItemEnable:this.removeMediaItemEnableHandler,removeMediaItemDisable:this.removeMediaItemDisableHandler,removeMediaItemIndex:this.state.removeMediaItemIndex,removeMediaItem:this.removeMediaItemHandler}))),c.a.createElement("div",{className:"reuse-form__itm reuse-form__itm--vid"},c.a.createElement("h4",{className:"reuse-form__itm--title"},c.a.createElement(p.a,{icon:["fas","video"],className:"icon icon__reuse-form--itm--title"}),"Add Video"),c.a.createElement("div",{className:"reuse-form__itm--det"},c.a.createElement("div",{className:"reuse-form__cnt"},c.a.createElement("label",{className:"reuse-form__cnt--title"},"Video Link"),c.a.createElement("div",{className:"reuse-form__cnt--det"},c.a.createElement("input",{type:"url",name:"",className:"reuse-form__cnt--det__input reuse-form__cnt--det__input--lg",placeholder:"paste link",onChange:this.linkVerifyHandler,value:this.state.inputValue,spellCheck:!1,pattern:"https://.*"}),c.a.createElement("button",{type:"button",onClick:this.addMediaHandler,disabled:!this.props.linkValid||null!==this.props.linkValid.err,className:"reuse-form__cnt--det__btn"},c.a.createElement(p.a,{icon:["fas","plus"]})))),c.a.createElement("div",{className:"reuse-form__itm--det__view"},e),c.a.createElement("div",{className:"reuse-form__itm--det__alt reuse-form__itm--det__alt--vid"},"OR"),c.a.createElement("div",{className:"reuse-form__cnt"},c.a.createElement("div",{className:"reuse-form__cnt--det"},c.a.createElement("div",{className:"reuse-form__cnt--det__fil"},c.a.createElement("div",null,"Upload / Drag and Drop Videos"),c.a.createElement("input",{type:"file",name:"",multiple:!0,className:"reuse-form__cnt--det__fil--input",onChange:this.selectMediaHandler,onDragEnter:this.dragEnterMediaHandler,onDragOver:this.dragOverMediaHandler,onDrop:this.dropMediaHandler,accept:"video/*"})))),this.state.snapshotErr?c.a.createElement("div",{className:"reuse-form__err"},this.state.snapshotErr):null,t),c.a.createElement("div",{className:"reuse-form__itm--footer reuse-form__btn"},c.a.createElement("button",{type:"button",className:"reuse-form__btn--close",onClick:this.closeMediaBoxHandler},"Exit"),c.a.createElement("button",{type:"button",className:"reuse-form__btn--add",onClick:this.submitMediaHandler,disabled:!this.state.media.length>0},"Add")))}}]),a}(m.Component);t.default=Object(u.b)(function(e){return{linkValid:e.form.linkValid,snapshot:e.form.snapshot,media:e.form.media,position:e.form.position}},function(e){return{onCheckLink:function(t){return e(_.k(t,"video"))},onResetLink:function(){return e(_.jb())},onAddSnapshot:function(t){return e(_.d(t))},onRemoveSnapshot:function(t){return e(_.hb(t))},onRemoveMedia:function(t){return e(_.gb(t))},onSubmitMedia:function(t){return e(_.yb(t))},onhideMediaBox:function(){return e(_.eb())}}})(M)}}]);
//# sourceMappingURL=1.45121db7.chunk.js.map