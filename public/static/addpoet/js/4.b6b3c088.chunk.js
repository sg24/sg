(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{740:function(e,t,a){"use strict";var r=a(0),i=a.n(r),n=a(8),s=function(e){var t=["reuse-form__itm--det__view-select--media__wrapper"],a=["reuse-form__itm--det__view-select--media__wrapper--close"],r=i.a.createElement("img",{src:e.link,alt:"post",className:"reuse-form__itm--det__view-select--media__wrapper--cnt"});return e.index===e.removeMediaItemIndex&&(t.push("reuse-form__itm--det__view-select--media__wrapper--active"),a.push("reuse-form__itm--det__view-select--media__wrapper--close__active")),"video"===e.mediaType&&(r=i.a.createElement("video",{src:e.link,controls:!0,className:"reuse-form__itm--det__view-select--media__wrapper--cnt"},i.a.createElement("p",null,"our browser doesn't support embedded videos"))),i.a.createElement("div",{className:"reuse-form__itm--det__view-select--media"},i.a.createElement("div",{className:t.join(" ")},r,i.a.createElement("div",{className:a.join(" "),onClick:e.removeMediaItem,onMouseEnter:e.removeMediaItemEnable,onMouseLeave:e.removeMediaItemDisable},i.a.createElement(n.a,{icon:["fas","times"],className:"icon icon__reuse-form--view-select__close"}))))};t.a=function(e){return e.media.map(function(t,a){return i.a.createElement(s,{key:a,link:t.url,index:a,mediaType:e.mediaType,removeMediaItem:e.removeMediaItem.bind(void 0,t.id),removeMediaItemEnable:e.removeMediaItemEnable.bind(void 0,a),removeMediaItemDisable:e.removeMediaItemDisable.bind(void 0,a),removeMediaItemIndex:e.removeMediaItemIndex})})}},746:function(e,t,a){"use strict";a.r(t);var r=a(106),i=a(59),n=a(26),s=a(27),l=a(29),o=a(28),m=a(285),d=a(30),c=a(0),u=a.n(c),p=a(33),f=a(8),_=a(5),v=a(7),b=a(740);function h(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,r)}return a}var E=function(e){function t(){var e,a;Object(n.a)(this,t);for(var s=arguments.length,d=new Array(s),c=0;c<s;c++)d[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(o.a)(t)).call.apply(e,[this].concat(d)))).state={inputValue:"",media:a.props.media.image?Object(i.a)(a.props.media.image):[],removeMediaItemIndex:null,snapshotErr:null},a.linkVerifyHandler=function(e){var t=e.target.value;a.setState({inputValue:t,snapshotErr:null}),a.props.onCheckLink(t)},a.addMediaHandler=function(){if(a.props.linkValid&&a.props.linkValid.media){var e=Object(i.a)(a.state.media);Object(v.c)(a.props.linkValid.media.url).then(function(t){e.push({file:t,url:a.props.linkValid.media.url}),a.setState({media:e,inputValue:""}),a.props.onResetLink()}).catch(function(t){var r=new FileReader,i=Object(m.a)(a);r.readAsDataURL(a.props.linkValid.media.file),r.addEventListener("loadend",function(){e.push({file:r.result,url:this.props.linkValid.media.url}),i.setState({media:e,inputValue:"",snapshotErr:t}),i.props.onResetLink()})})}},a.selectMediaHandler=function(e){if(a.setState({snapshotErr:null}),e.stopPropagation(),e.preventDefault(),e.target.files){var t=e.target.files;a.handleFiles(t)}},a.dragEnterMediaHandler=function(e){e.stopPropagation(),e.preventDefault()},a.dragOverMediaHandler=function(e){e.stopPropagation(),e.preventDefault()},a.dropMediaHandler=function(e){if(e.stopPropagation(),e.preventDefault(),e.dataTransfer){var t=e.dataTransfer.files;a.handleFiles(t)}},a.removeMediaItemEnableHandler=function(e){a.setState({removeMediaItemIndex:e})},a.removeMediaItemDisableHandler=function(){a.setState({removeMediaItemIndex:null})},a.removeMediaItemHandler=function(e){var t=Object(i.a)(a.state.media).filter(function(t,a){return a!==e});a.setState({media:t}),a.props.media.image&&a.props.media.image.length>0&&a.props.onRemoveMedia(Object(v.e)(a.props.media,{image:t}))},a.handleFiles=function(e){for(var t=Object(i.a)(a.state.media),r=function(r){var i=e[r];if(i.type.startsWith("image/")){var n=window.URL.createObjectURL(i);Object(v.c)(n).then(function(e){t.push({file:e,url:n}),a.setState({media:t})}).catch(function(e){var r=new FileReader,s=Object(m.a)(a);r.readAsDataURL(i),r.addEventListener("loadend",function(){t.push({file:r.result,url:n}),s.setState({media:t,snapshotErr:e})})})}},n=0;n<e.length;n++)r(n)},a.submitMediaHandler=function(){var e=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?h(a,!0).forEach(function(t){Object(r.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):h(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({},a.props.media);a.props.onSubmitMedia(Object(v.e)(e,{image:Object(i.a)(a.state.media)}))},a.closeMediaBoxHandler=function(){a.props.onhideMediaBox()},a}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=null,t=null;return this.props.linkValid&&(e=this.props.linkValid.media?u.a.createElement("img",{src:this.props.linkValid.media.url,alt:"post"}):u.a.createElement("div",{className:"reuse-form__err"},this.props.linkValid.err.message)),this.state.media.length>0&&(t=u.a.createElement("div",{className:"reuse-form__itm--det__view-select"},u.a.createElement(b.a,{media:this.state.media,mediaType:"image",removeMediaItemEnable:this.removeMediaItemEnableHandler,removeMediaItemDisable:this.removeMediaItemDisableHandler,removeMediaItemIndex:this.state.removeMediaItemIndex,removeMediaItem:this.removeMediaItemHandler}))),u.a.createElement("div",{className:"reuse-form__itm"},u.a.createElement("h4",{className:"reuse-form__itm--title"},u.a.createElement(f.a,{icon:["fas","images"],className:"icon icon__reuse-form--itm--title"}),"Add Image"),u.a.createElement("div",{className:"reuse-form__itm--det"},u.a.createElement("div",{className:"reuse-form__cnt"},u.a.createElement("label",{className:"reuse-form__cnt--title"},"Image Link"),u.a.createElement("div",{className:"reuse-form__cnt--det"},u.a.createElement("input",{type:"url",name:"",className:"reuse-form__cnt--det__input reuse-form__cnt--det__input--lg",placeholder:"paste link",onChange:this.linkVerifyHandler,value:this.state.inputValue,spellCheck:!1,pattern:"https://.*"}),u.a.createElement("button",{type:"button",onClick:this.addMediaHandler,disabled:!this.props.linkValid||null!==this.props.linkValid.err,className:"reuse-form__cnt--det__btn"},u.a.createElement(f.a,{icon:["fas","plus"]})))),u.a.createElement("div",{className:"reuse-form__itm--det__view"},e),u.a.createElement("div",{className:"reuse-form__itm--det__alt"},"OR"),u.a.createElement("div",{className:"reuse-form__cnt"},u.a.createElement("div",{className:"reuse-form__cnt--det"},u.a.createElement("div",{className:"reuse-form__cnt--det__fil"},"Drag and Drop Images",u.a.createElement("input",{type:"file",name:"",multiple:!0,className:"reuse-form__cnt--det__fil--input",onChange:this.selectMediaHandler,onDragEnter:this.dragEnterMediaHandler,onDragOver:this.dragOverMediaHandler,onDrop:this.dropMediaHandler,accept:"image/*"})))),this.state.snapshotErr?u.a.createElement("div",{className:"reuse-form__err"},"Some features are not available in your browser, ",this.state.snapshotErr):null,t),u.a.createElement("div",{className:"reuse-form__itm--footer reuse-form__btn"},u.a.createElement("button",{type:"button",className:"reuse-form__btn--close",onClick:this.closeMediaBoxHandler},"Exit"),u.a.createElement("button",{type:"button",className:"reuse-form__btn--add",onClick:this.submitMediaHandler,disabled:!this.state.media.length>0},"Add")))}}]),t}(c.Component);t.default=Object(p.b)(function(e){return{linkValid:e.form.linkValid,media:e.form.media}},function(e){return{onCheckLink:function(t){return e(_.j(t,"image"))},onResetLink:function(){return e(_.Y())},onRemoveMedia:function(t){return e(_.V(t))},onSubmitMedia:function(t){return e(_.jb(t))},onhideMediaBox:function(){return e(_.T())}}})(E)}}]);
//# sourceMappingURL=4.b6b3c088.chunk.js.map