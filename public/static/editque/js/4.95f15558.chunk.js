(this.webpackJsonpaddpoet=this.webpackJsonpaddpoet||[]).push([[4],{811:function(e,t){var a="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(a){var n=new Uint8Array(16);e.exports=function(){return a(n),n}}else{var i=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0===(3&t)&&(e=4294967296*Math.random()),i[t]=e>>>((3&t)<<3)&255;return i}}},812:function(e,t){for(var a=[],n=0;n<256;++n)a[n]=(n+256).toString(16).substr(1);e.exports=function(e,t){var n=t||0,i=a;return[i[e[n++]],i[e[n++]],i[e[n++]],i[e[n++]],"-",i[e[n++]],i[e[n++]],"-",i[e[n++]],i[e[n++]],"-",i[e[n++]],i[e[n++]],"-",i[e[n++]],i[e[n++]],i[e[n++]],i[e[n++]],i[e[n++]],i[e[n++]]].join("")}},813:function(e,t,a){var n=a(814),i=a(815),r=i;r.v1=n,r.v4=i,e.exports=r},814:function(e,t,a){var n,i,r=a(811),o=a(812),s=0,d=0;e.exports=function(e,t,a){var l=t&&a||0,m=t||[],c=(e=e||{}).node||n,p=void 0!==e.clockseq?e.clockseq:i;if(null==c||null==p){var u=r();null==c&&(c=n=[1|u[0],u[1],u[2],u[3],u[4],u[5]]),null==p&&(p=i=16383&(u[6]<<8|u[7]))}var v=void 0!==e.msecs?e.msecs:(new Date).getTime(),f=void 0!==e.nsecs?e.nsecs:d+1,_=v-s+(f-d)/1e4;if(_<0&&void 0===e.clockseq&&(p=p+1&16383),(_<0||v>s)&&void 0===e.nsecs&&(f=0),f>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");s=v,d=f,i=p;var h=(1e4*(268435455&(v+=122192928e5))+f)%4294967296;m[l++]=h>>>24&255,m[l++]=h>>>16&255,m[l++]=h>>>8&255,m[l++]=255&h;var b=v/4294967296*1e4&268435455;m[l++]=b>>>8&255,m[l++]=255&b,m[l++]=b>>>24&15|16,m[l++]=b>>>16&255,m[l++]=p>>>8|128,m[l++]=255&p;for(var E=0;E<6;++E)m[l+E]=c[E];return t||o(m)}},815:function(e,t,a){var n=a(811),i=a(812);e.exports=function(e,t,a){var r=t&&a||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var o=(e=e||{}).random||(e.rng||n)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t)for(var s=0;s<16;++s)t[r+s]=o[s];return t||i(o)}},816:function(e,t,a){"use strict";var n=a(0),i=a.n(n),r=a(5),o=function(e){var t=["reuse-form__itm--det__view-select--media__wrapper"],a=["reuse-form__itm--det__view-select--media__wrapper--close"],n=i.a.createElement("img",{src:e.link,alt:"post",className:"reuse-form__itm--det__view-select--media__wrapper--cnt"});return e.index===e.removeMediaItemIndex&&(t.push("reuse-form__itm--det__view-select--media__wrapper--active"),a.push("reuse-form__itm--det__view-select--media__wrapper--close__active")),"video"!==e.mediaType&&"snapvideo"!==e.mediaType||(n=i.a.createElement("video",{src:e.link,controls:!0,autoPlay:"snapvideo"===e.mediaType,className:"reuse-form__itm--det__view-select--media__wrapper--cnt"},i.a.createElement("p",null,"our browser doesn't support embedded videos"))),i.a.createElement("div",{className:"reuse-form__itm--det__view-select--media"},i.a.createElement("div",{className:t.join(" ")},n,"snapshot"===e.mediaType?i.a.createElement("div",{className:"reuse-form__itm--det__view-select--media__play",onClick:e.playVideo},i.a.createElement(r.a,{icon:["fas","play-circle"],className:"icon icon__reuse-form--media__play"})):null,i.a.createElement("div",{className:a.join(" "),onClick:e.removeMediaItem,onMouseEnter:e.removeMediaItemEnable,onMouseLeave:e.removeMediaItemDisable},i.a.createElement(r.a,{icon:["fas","times"],className:"icon icon__reuse-form--view-select__close"}))))};t.a=function(e){return e.media.map((function(t,a){return i.a.createElement(o,{key:a,link:t.url,index:a,mediaType:t.mediaType,playVideo:e.playVideo.bind(void 0,t.videoCnt),removeMediaItem:e.removeMediaItem.bind(void 0,t.id),removeMediaItemEnable:e.removeMediaItemEnable.bind(void 0,a),removeMediaItemDisable:e.removeMediaItemDisable.bind(void 0,a),removeMediaItemIndex:e.removeMediaItemIndex})}))}},818:function(e,t,a){"use strict";a.r(t);var n=a(74),i=a(40),r=a(27),o=a(28),s=a(30),d=a(29),l=a(31),m=a(0),c=a.n(m),p=a(36),u=a(5),v=a(813),f=a.n(v),_=a(7),h=a(6),b=a(816),E=function(e){function t(){var e,a;Object(r.a)(this,t);for(var o=arguments.length,l=new Array(o),m=0;m<o;m++)l[m]=arguments[m];return(a=Object(s.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(l)))).state={inputValue:"",snapshot:a.props.media.video?Object(i.a)(a.props.snapshot):[],media:a.props.media.video?Object(i.a)(a.props.media.video):[],removeMediaItemIndex:null,snapshotErr:null,fetched:!1},a.linkVerifyHandler=function(e){var t=e.target.value;a.setState({inputValue:t,snapshotErr:null}),a.props.onCheckLink(t)},a.addMediaHandler=function(){if(a.props.linkValid&&a.props.linkValid.media){var e=f()(),t=Object(i.a)(a.state.media);t.push(Object(h.f)(a.props.linkValid.media,{id:e,mediaType:"video"})),a.setState({media:t,inputValue:""}),a.props.onResetLink(),a.props.editVideo||a.props.onVideoEdit()}},a.selectMediaHandler=function(e){if(a.setState({snapshotErr:null}),e.stopPropagation(),e.preventDefault(),e.target.files){var t=e.target.files;a.handleFiles(t)}},a.dragEnterMediaHandler=function(e){e.stopPropagation(),e.preventDefault()},a.dragOverMediaHandler=function(e){e.stopPropagation(),e.preventDefault()},a.dropMediaHandler=function(e){if(e.stopPropagation(),e.preventDefault(),e.dataTransfer){var t=e.dataTransfer.files;a.handleFiles(t)}},a.removeMediaItemEnableHandler=function(e){a.setState({removeMediaItemIndex:e})},a.removeMediaItemDisableHandler=function(){a.setState({removeMediaItemIndex:null})},a.removeMediaItemHandler=function(e){a.props.editVideo||a.props.onVideoEdit();var t=Object(i.a)(a.state.media),n=Object(i.a)(a.state.snapshot),r=t.filter((function(t){return t.id!==e})),o=n.filter((function(t){return t.id!==e})),s=n.filter((function(t){return t.id===e}));a.setState({media:r,snapshot:o});var d,l=[].concat(Object(i.a)(a.props.media.video),Object(i.a)(a.props.snapshot));l&&l.length>0&&(a.props.onRemoveMedia(Object(h.f)(a.props.media,{video:r})),a.props.onRemoveSnapshot(o),s[0]&&(d=a.props).onSaveRemoveSnap.apply(d,Object(i.a)(s)))},a.handleFiles=function(e){var t=Object(i.a)(a.state.media);a.props.editVideo||a.props.onVideoEdit();for(var n=0;n<e.length;n++){var r=e[n];if(r.type.startsWith("video/")){var o=f()(),s=window.URL.createObjectURL(r);t.push({file:r,url:s,id:o,mediaType:"video"}),a.setState({media:t})}}},a.playVideoHandler=function(e){var t=0,n=a.state.snapshot,i=n.filter((function(a,n){return a.videoCnt===e&&(t=n,!0)}));if(i.length>0){var r=Object(h.f)(i[0],{url:"".concat(window.location.protocol+"//"+window.location.host,"/media/video/").concat(e),mediaType:"snapvideo"});n[t]=r,a.setState({snapshot:n})}},a.submitMediaHandler=function(){var e=Object(n.a)({},a.props.media);a.props.onSubmitMedia(Object(h.f)(e,{video:Object(i.a)(a.state.media)})),a.props.onAddSnapshot(a.state.snapshot)},a.closeMediaBoxHandler=function(){a.props.onhideMediaBox()},a}return Object(l.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=null,t=null,a=[].concat(Object(i.a)(this.state.snapshot),Object(i.a)(this.state.media));return this.props.linkValid&&(e=this.props.linkValid.media?c.a.createElement("video",{src:this.props.linkValid.media.url,controls:!0},c.a.createElement("p",null,"our browser doesn't support embedded videos")):c.a.createElement("div",{className:"reuse-form__err"},this.props.linkValid.err.message)),a.length>0&&(t=c.a.createElement("div",{className:"reuse-form__itm--det__view-select"},c.a.createElement(b.a,{media:a,removeMediaItemEnable:this.removeMediaItemEnableHandler,removeMediaItemDisable:this.removeMediaItemDisableHandler,removeMediaItemIndex:this.state.removeMediaItemIndex,removeMediaItem:this.removeMediaItemHandler,playVideo:this.playVideoHandler}))),c.a.createElement("div",{className:"reuse-form__itm reuse-form__itm--vid"},c.a.createElement("h4",{className:"reuse-form__itm--title"},c.a.createElement(u.a,{icon:["fas","video"],className:"icon icon__reuse-form--itm--title"}),"Add Video"),c.a.createElement("div",{className:"reuse-form__itm--det"},c.a.createElement("div",{className:"reuse-form__cnt"},c.a.createElement("label",{className:"reuse-form__cnt--title"},"Video Link"),c.a.createElement("div",{className:"reuse-form__cnt--det"},c.a.createElement("input",{type:"url",name:"",className:"reuse-form__cnt--det__input reuse-form__cnt--det__input--lg",placeholder:"paste link",onChange:this.linkVerifyHandler,value:this.state.inputValue,spellCheck:!1,pattern:"https://.*"}),c.a.createElement("button",{type:"button",onClick:this.addMediaHandler,disabled:!this.props.linkValid||null!==this.props.linkValid.err,className:"reuse-form__cnt--det__btn"},c.a.createElement(u.a,{icon:["fas","plus"]})))),c.a.createElement("div",{className:"reuse-form__itm--det__view"},e),c.a.createElement("div",{className:"reuse-form__itm--det__alt reuse-form__itm--det__alt--vid"},"OR"),c.a.createElement("div",{className:"reuse-form__cnt"},c.a.createElement("div",{className:"reuse-form__cnt--det"},c.a.createElement("div",{className:"reuse-form__cnt--det__fil"},c.a.createElement("div",null,"Upload / Drag and Drop Videos"),c.a.createElement("input",{type:"file",name:"",multiple:!0,className:"reuse-form__cnt--det__fil--input",onChange:this.selectMediaHandler,onDragEnter:this.dragEnterMediaHandler,onDragOver:this.dragOverMediaHandler,onDrop:this.dropMediaHandler,accept:"video/*"})))),this.state.snapshotErr?c.a.createElement("div",{className:"reuse-form__err"},this.state.snapshotErr):null,t),c.a.createElement("div",{className:"reuse-form__itm--footer reuse-form__btn"},c.a.createElement("button",{type:"button",className:"reuse-form__btn--close",onClick:this.closeMediaBoxHandler},"Exit"),c.a.createElement("button",{type:"button",className:"reuse-form__btn--add",onClick:this.submitMediaHandler,disabled:![].concat(Object(i.a)(this.state.media),Object(i.a)(this.state.snapshot)).length>0},"Add")))}}]),t}(m.Component);t.default=Object(p.b)((function(e){return{showVideo:e.form.showVideo,linkValid:e.form.linkValid,snapshot:e.form.snapshot,media:e.form.media,videoFetched:e.form.videoFetched,editVideo:e.form.editVideo}}),(function(e){return{onFetchVideo:function(t){return e(_.S(t))},onVideoFetched:function(){return e(_.Bb())},onCheckLink:function(t){return e(_.j(t,"video"))},onResetLink:function(){return e(_.lb())},onVideoEdit:function(){return e(_.Ab())},onAddSnapshot:function(t){return e(_.c(t))},onRemoveSnapshot:function(t){return e(_.jb(t))},onSaveRemoveSnap:function(t){return e(_.nb(t))},onRemoveMedia:function(t){return e(_.ib(t))},onSubmitMedia:function(t){return e(_.yb(t))},onhideMediaBox:function(){return e(_.fb())}}}))(E)}}]);
//# sourceMappingURL=4.95f15558.chunk.js.map