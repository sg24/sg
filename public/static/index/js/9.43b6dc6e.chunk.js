(this.webpackJsonpindex=this.webpackJsonpindex||[]).push([[9],{659:function(t,e,n){"use strict";n.r(e);var i=n(63),r=n(20),o=n(21),a=n(23),s=n(22),c=n(24),h=n(0),l=n.n(h),p=n(29),d=n(82),u=(n(638),n(645)),v=n(53),m=n(119),f=n(3),g=n(6),C=!0,y=function(t){function e(t){var n;Object(r.a)(this,e),(n=Object(a.a)(this,Object(s.a)(e).call(this,t))).onScroll=function(){document.documentElement.scrollHeight-document.documentElement.scrollTop===document.documentElement.clientHeight&&n.props.onFetchCnt(n.props.userID,"shared",n.state.fetchLimit,n.props.skipCnt+n.state.fetchLimit,n.props.cntTotal)},n.showUserOptHandler=function(t){if(n.state.cntOpt&&n.state.cntOpt.id===t)n.setState((function(t,e){return{cntOpt:Object(f.f)(t.cntOpt,{visible:!t.cntOpt.visible})}}));else{var e={visible:!0,id:t};n.setState({cntOpt:e})}},n.changeFavoriteHandler=function(t,e,i,r){n.props.onChangeFav(t,e,i,n.props.changedFav,n.props.userID,r)},n.showShareHandler=function(t){n.props.onChangeShareID(t,"question"),n.props.history.push("/index/question/share")},n.changeMediaHandler=function(t,e,i){n.setState({removePrevMedia:{id:t,type:i},removeAnim:!1}),n.animateSlider(t,e,i,900)},n.removeAnimHandler=function(t){n.state.removePrevMedia||n.setState({removeAnim:!0})},n.playVideoHandler=function(t){n.props.onFetchVideo(t.id,"".concat(window.location.protocol+"//"+window.location.host,"/media/video/").concat(t.videoCnt))},n.slidePlayHandler=function(t,e,i){i.target.setPointerCapture(i.pointerId),n.setState({playerIcnId:t})},n.clearSlidePlayhandler=function(t){var e=t.target;e.releasePointerCapture(t.pointerId),e.style.left="0px";var n=document.querySelector(".reuse-que__media--wrapper__icn-move");n&&(n.style.left="42%")},n.moveSlidePlayHandler=function(t,e,i){var r=i.target;if(r.hasPointerCapture&&r.hasPointerCapture(i.pointerId)){var o=i.clientX-r.parentElement.offsetLeft-r.offsetWidth/2;o<-(r.offsetWidth/2+r.offsetWidth/4)?C&&(C=!1,n.animateSlider(t,e,"next",0)):o>r.offsetWidth/2+r.offsetWidth/4&&C&&(C=!1,n.animateSlider(t,e,"prev",0));var a=document.querySelector(".reuse-que__media--wrapper__icn-move");if(a){var s=o/r.offsetWidth*100;a.style.left=s+42+"%"}r.style.left=o+"px"}},n.animateSlider=function(t,e,r,o){setTimeout((function(){var o=Object(i.a)(n.state.mediaItms),a=o.filter((function(e){return e.id===t})),s={id:t,position:"next"===r?1:e-1};if(a.length>0){var c=!0,h=!1,l=void 0;try{for(var p,d=a[Symbol.iterator]();!(c=(p=d.next()).done);c=!0){var u=p.value;(s={id:u.id,position:"next"===r?u.position+=1:u.position-=1}).position>e-1&&(s=Object(f.f)(s,{position:0})),s.position<0&&(s=Object(f.f)(s,{position:e-1}));var v=o.filter((function(e){return e.id!==t}));v.push(s),n.setState({mediaItms:v,removeAnim:!1,removePrevMedia:null,animateItm:{id:t,direction:r}})}}catch(m){h=!0,l=m}finally{try{c||null==d.return||d.return()}finally{if(h)throw l}}}else o.push(s),n.setState({mediaItms:o,removeAnim:!1,removePrevMedia:null,animateItm:{id:t,direction:r}})}),o),setTimeout((function(){C=!0}),500)},n.changeCntHandler=function(t,e,i,r){var o=String(e).length>50?String(e).substr(0,50)+"...":e;n.props.onChangeCnt(t,o,i,!1,r)},n.props.onFetchCntReset();var o=0;return o=window.innerHeight>=1200?18:window.innerHeight>=900?12:window.innerHeight>=500?9:6,n.state={cntOpt:null,fetchLimit:o,filterTag:"shared",mediaItms:[],animateItm:null,removeAnim:!1,removePrevMedia:null,playerIcnId:null,animationComplete:!0,scrollEnable:!1},n}return Object(c.a)(e,t),Object(o.a)(e,[{key:"componentDidMount",value:function(){this.props.onFetchCnt(this.props.userID,this.state.filterTag,this.state.fetchLimit,0,0),this.props.onChangeTag("/question")}},{key:"componentDidUpdate",value:function(){this.props.cnts&&this.props.cnts.length>0&&!this.state.scrollEnable&&(window.addEventListener("scroll",this.onScroll,!1),this.setState({scrollEnable:!0}))}},{key:"componentWillUnmount",value:function(){this.props.onFetchCntReset(),window.removeEventListener("scroll",this.onScroll,!1)}},{key:"render",value:function(){this.props.onFetchShareActive(),this.props.onFetchCntActive(),this.props.onFetchNotifyActive(),this.props.onFetchPtActive(),this.props.onFetchQueActive(),this.props.onFetchShareCntActive(),this.props.onFetchReqActive();var t=l.a.createElement(v.a,null);return this.props.cntErr&&(t=null),this.props.cnts&&0===this.props.cnts.length&&(t=l.a.createElement(m.a,{isAuth:this.props.status,det:"No Shared Question found!",icn:"hand-paper",filter:!0})),this.props.cnts&&this.props.cnts.length>0&&(t=l.a.createElement(u.a,{content:this.props.cnts,media:this.props.media,userOpt:this.showUserOptHandler,showCntOpt:this.state.cntOpt,fav:this.changeFavoriteHandler,changedFav:this.props.changedFav,favChange:this.props.favChange,share:this.showShareHandler,nextMedia:this.changeMediaHandler,prevMedia:this.changeMediaHandler,mediaItms:this.state.mediaItms,removeAnim:this.removeAnimHandler,disableAnim:this.state.removeAnim,animateItm:this.state.animateItm,removePrevMedia:this.state.removePrevMedia,playVideo:this.playVideoHandler,videoErr:this.props.videoErr,video:this.props.postVideo,playerIcnId:this.state.playerIcnId,slidePlay:this.slidePlayHandler,moveSlidePlay:this.moveSlidePlayHandler,clearSlidePlay:this.clearSlidePlayhandler,changeCnt:this.changeCntHandler})),t}}]),e}(h.Component);e.default=Object(d.f)(Object(p.b)((function(t){return{status:t.auth.status,cnts:t.cnt.cnts,skipCnt:t.cnt.skipCnt,cntTotal:t.cnt.cntTotal,changedFav:t.cnt.changedFav,favChange:t.cnt.favChange,cntErr:t.cnt.cntErr,postVideo:t.cnt.postVideo,videoErr:t.cnt.videoErr,filterDet:t.cnt.filterDet}}),(function(t){return{onFetchShareActive:function(){return t(g.Z())},onFetchShareCntActive:function(){return t(g.Y())},onFetchCntActive:function(){return t(g.z())},onFetchNotifyActive:function(){return t(g.P())},onFetchPtActive:function(){return t(g.R())},onFetchQueActive:function(){return t(g.T())},onFetchReqActive:function(){return t(g.V())},onFetchCnt:function(e,n,i,r,o){return t(g.C(e,n,i,r,o))},onFetchCntReset:function(){return t(g.D())},onChangeFav:function(e,n,i,r,o,a){return t(g.h(e,n,i,r,o,a))},onChangeShareID:function(e,n){return t(g.Cb(e,n))},onChangeTag:function(e){return t(g.p(e))},onFetchVideo:function(e,n){return t(g.gb(e,n))},onChangeCnt:function(e,n,i,r,o){return t(g.d(e,n,i,r,o))}}}))(y))}}]);
//# sourceMappingURL=9.43b6dc6e.chunk.js.map