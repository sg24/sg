(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{739:function(e,t){var a="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(a){var r=new Uint8Array(16);e.exports=function(){return a(r),r}}else{var n=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0===(3&t)&&(e=4294967296*Math.random()),n[t]=e>>>((3&t)<<3)&255;return n}}},740:function(e,t){for(var a=[],r=0;r<256;++r)a[r]=(r+256).toString(16).substr(1);e.exports=function(e,t){var r=t||0,n=a;return[n[e[r++]],n[e[r++]],n[e[r++]],n[e[r++]],"-",n[e[r++]],n[e[r++]],"-",n[e[r++]],n[e[r++]],"-",n[e[r++]],n[e[r++]],"-",n[e[r++]],n[e[r++]],n[e[r++]],n[e[r++]],n[e[r++]],n[e[r++]]].join("")}},741:function(e,t,a){var r=a(742),n=a(743),i=n;i.v1=r,i.v4=n,e.exports=i},742:function(e,t,a){var r,n,i=a(739),o=a(740),s=0,l=0;e.exports=function(e,t,a){var m=t&&a||0,d=t||[],c=(e=e||{}).node||r,u=void 0!==e.clockseq?e.clockseq:n;if(null==c||null==u){var p=i();null==c&&(c=r=[1|p[0],p[1],p[2],p[3],p[4],p[5]]),null==u&&(u=n=16383&(p[6]<<8|p[7]))}var f=void 0!==e.msecs?e.msecs:(new Date).getTime(),v=void 0!==e.nsecs?e.nsecs:l+1,_=f-s+(v-l)/1e4;if(_<0&&void 0===e.clockseq&&(u=u+1&16383),(_<0||f>s)&&void 0===e.nsecs&&(v=0),v>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");s=f,l=v,n=u;var b=(1e4*(268435455&(f+=122192928e5))+v)%4294967296;d[m++]=b>>>24&255,d[m++]=b>>>16&255,d[m++]=b>>>8&255,d[m++]=255&b;var h=f/4294967296*1e4&268435455;d[m++]=h>>>8&255,d[m++]=255&h,d[m++]=h>>>24&15|16,d[m++]=h>>>16&255,d[m++]=u>>>8|128,d[m++]=255&u;for(var g=0;g<6;++g)d[m+g]=c[g];return t||o(d)}},743:function(e,t,a){var r=a(739),n=a(740);e.exports=function(e,t,a){var i=t&&a||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var o=(e=e||{}).random||(e.rng||r)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t)for(var s=0;s<16;++s)t[i+s]=o[s];return t||n(o)}},744:function(e,t,a){"use strict";var r=a(0),n=a.n(r),i=a(6),o=function(e){var t=["reuse-form__itm--det__view-select--media__wrapper"],a=["reuse-form__itm--det__view-select--media__wrapper--close"],r=n.a.createElement("img",{src:e.link,alt:"post",className:"reuse-form__itm--det__view-select--media__wrapper--cnt"});return e.index===e.removeMediaItemIndex&&(t.push("reuse-form__itm--det__view-select--media__wrapper--active"),a.push("reuse-form__itm--det__view-select--media__wrapper--close__active")),"video"===e.mediaType&&(r=n.a.createElement("video",{src:e.link,controls:!0,className:"reuse-form__itm--det__view-select--media__wrapper--cnt"},n.a.createElement("p",null,"our browser doesn't support embedded videos"))),n.a.createElement("div",{className:"reuse-form__itm--det__view-select--media"},n.a.createElement("div",{className:t.join(" ")},r,n.a.createElement("div",{className:a.join(" "),onClick:e.removeMediaItem,onMouseEnter:e.removeMediaItemEnable,onMouseLeave:e.removeMediaItemDisable},n.a.createElement(i.a,{icon:["fas","times"],className:"icon icon__reuse-form--view-select__close"}))))};t.a=function(e){return e.media.map(function(t,a){return n.a.createElement(o,{key:a,link:t.url,index:a,mediaType:e.mediaType,removeMediaItem:e.removeMediaItem.bind(void 0,t.id),removeMediaItemEnable:e.removeMediaItemEnable.bind(void 0,a),removeMediaItemDisable:e.removeMediaItemDisable.bind(void 0,a),removeMediaItemIndex:e.removeMediaItemIndex})})}},745:function(e,t,a){"use strict";a.r(t);var r=a(104),n=a(58),i=a(26),o=a(27),s=a(29),l=a(28),m=a(30),d=a(0),c=a.n(d),u=a(33),p=a(6),f=a(741),v=a.n(f),_=a(5),b=a(8),h=a(744);function g(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,r)}return a}var E=function(e){function t(){var e,a;Object(i.a)(this,t);for(var o=arguments.length,m=new Array(o),d=0;d<o;d++)m[d]=arguments[d];return(a=Object(s.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(m)))).state={inputValue:"",media:a.props.media.image?Object(n.a)(a.props.media.image):[],removeMediaItemIndex:null,snapshotErr:null},a.linkVerifyHandler=function(e){var t=e.target.value;a.setState({inputValue:t,snapshotErr:null}),a.props.onCheckLink(t)},a.addMediaHandler=function(){if(a.props.linkValid&&a.props.linkValid.media){var e=Object(n.a)(a.state.media);e.push({file:a.props.linkValid.media.file,url:a.props.linkValid.media.url,id:v()()}),a.setState({media:e,inputValue:""}),a.props.onResetLink()}},a.selectMediaHandler=function(e){if(a.setState({snapshotErr:null}),e.stopPropagation(),e.preventDefault(),e.target.files){var t=e.target.files;a.handleFiles(t)}},a.dragEnterMediaHandler=function(e){e.stopPropagation(),e.preventDefault()},a.dragOverMediaHandler=function(e){e.stopPropagation(),e.preventDefault()},a.dropMediaHandler=function(e){if(e.stopPropagation(),e.preventDefault(),e.dataTransfer){var t=e.dataTransfer.files;a.handleFiles(t)}},a.removeMediaItemEnableHandler=function(e){a.setState({removeMediaItemIndex:e})},a.removeMediaItemDisableHandler=function(){a.setState({removeMediaItemIndex:null})},a.removeMediaItemHandler=function(e){var t=Object(n.a)(a.state.media).filter(function(t){return t.id!==e});a.setState({media:t}),a.props.media.image&&a.props.media.image.length>0&&a.props.onRemoveMedia(Object(b.c)(a.props.media,{image:t}))},a.handleFiles=function(e){for(var t=Object(n.a)(a.state.media),r=0;r<e.length;r++){var i=e[r];if(i.type.startsWith("image/")){var o=window.URL.createObjectURL(i);t.push({file:i,url:o,id:v()()}),a.setState({media:t})}}},a.submitMediaHandler=function(){var e=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?g(a,!0).forEach(function(t){Object(r.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):g(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({},a.props.media);a.props.onSubmitMedia(Object(b.c)(e,{image:Object(n.a)(a.state.media)}))},a.closeMediaBoxHandler=function(){a.props.onhideMediaBox()},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=null,t=null;return this.props.linkValid&&(e=this.props.linkValid.media?c.a.createElement("img",{src:this.props.linkValid.media.url,alt:"post"}):c.a.createElement("div",{className:"reuse-form__err"},this.props.linkValid.err.message)),this.state.media.length>0&&(t=c.a.createElement("div",{className:"reuse-form__itm--det__view-select"},c.a.createElement(h.a,{media:this.state.media,mediaType:"image",removeMediaItemEnable:this.removeMediaItemEnableHandler,removeMediaItemDisable:this.removeMediaItemDisableHandler,removeMediaItemIndex:this.state.removeMediaItemIndex,removeMediaItem:this.removeMediaItemHandler}))),c.a.createElement("div",{className:"reuse-form__itm"},c.a.createElement("h4",{className:"reuse-form__itm--title"},c.a.createElement(p.a,{icon:["fas","images"],className:"icon icon__reuse-form--itm--title"}),"Add Image"),c.a.createElement("div",{className:"reuse-form__itm--det"},c.a.createElement("div",{className:"reuse-form__cnt"},c.a.createElement("label",{className:"reuse-form__cnt--title"},"Image Link"),c.a.createElement("div",{className:"reuse-form__cnt--det"},c.a.createElement("input",{type:"url",name:"",className:"reuse-form__cnt--det__input reuse-form__cnt--det__input--lg",placeholder:"paste link",onChange:this.linkVerifyHandler,value:this.state.inputValue,spellCheck:!1,pattern:"https://.*"}),c.a.createElement("button",{type:"button",onClick:this.addMediaHandler,disabled:!this.props.linkValid||null!==this.props.linkValid.err,className:"reuse-form__cnt--det__btn"},c.a.createElement(p.a,{icon:["fas","plus"]})))),c.a.createElement("div",{className:"reuse-form__itm--det__view"},e),c.a.createElement("div",{className:"reuse-form__itm--det__alt"},"OR"),c.a.createElement("div",{className:"reuse-form__cnt"},c.a.createElement("div",{className:"reuse-form__cnt--det"},c.a.createElement("div",{className:"reuse-form__cnt--det__fil"},c.a.createElement("div",null,"Upload / Drag and Drop Images"),c.a.createElement("input",{type:"file",name:"",multiple:!0,className:"reuse-form__cnt--det__fil--input",onChange:this.selectMediaHandler,onDragEnter:this.dragEnterMediaHandler,onDragOver:this.dragOverMediaHandler,onDrop:this.dropMediaHandler,accept:"image/*"})))),this.state.snapshotErr?c.a.createElement("div",{className:"reuse-form__err"},"Some features are not available in your browser, ",this.state.snapshotErr):null,t),c.a.createElement("div",{className:"reuse-form__itm--footer reuse-form__btn"},c.a.createElement("button",{type:"button",className:"reuse-form__btn--close",onClick:this.closeMediaBoxHandler},"Exit"),c.a.createElement("button",{type:"button",className:"reuse-form__btn--add",onClick:this.submitMediaHandler,disabled:!this.state.media.length>0},"Add")))}}]),t}(d.Component);t.default=Object(u.b)(function(e){return{linkValid:e.form.linkValid,media:e.form.media}},function(e){return{onCheckLink:function(t){return e(_.j(t,"image"))},onResetLink:function(){return e(_.Y())},onRemoveMedia:function(t){return e(_.V(t))},onSubmitMedia:function(t){return e(_.jb(t))},onhideMediaBox:function(){return e(_.T())}}})(E)}}]);
//# sourceMappingURL=3.43847421.chunk.js.map