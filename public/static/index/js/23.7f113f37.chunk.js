(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{784:function(t,e,n){"use strict";n.r(e);var i=n(93),r=n(37),o=n(16),a=n(17),s=n(18),c=n(19),l=n(0),p=n.n(l),h=n(24),d=n(86),u=(n(664),n(704)),f=n(40),m=n(78),v=n(3),g=n(5),C=!0,w=function(t){Object(c.a)(n,t);var e=Object(s.a)(n);function n(t){var a;Object(o.a)(this,n),(a=e.call(this,t)).onScroll=function(){window.innerHeight+Math.ceil(window.pageYOffset+1)>=document.body.offsetHeight&&a.props.onFetchCnt(a.props.userID,"question"!==a.state.filterTag?"filter"===a.state.filterTag?"filter=="+a.props.filterDet:"question-".concat(a.state.filterTag):"question",a.state.fetchLimit,a.props.skipCnt+a.state.fetchLimit,a.props.cntTotal)},a.showUserOptHandler=function(t){if(a.state.cntOpt&&a.state.cntOpt.id===t)a.setState(function(t,e){return{cntOpt:Object(v.f)(t.cntOpt,{visible:!t.cntOpt.visible})}});else{var e={visible:!0,id:t};a.setState({cntOpt:e})}},a.changeFavoriteHandler=function(t,e,n,i){a.props.onChangeFav(t,e,n,a.props.changedFav,a.props.userID,i)},a.showShareHandler=function(t){a.props.onChangeShareID(t,"question"),a.props.history.push("/index/question/share")},a.changeMediaHandler=function(t,e,n){a.setState({removePrevMedia:{id:t,type:n},removeAnim:!1}),a.animateSlider(t,e,n,900)},a.removeAnimHandler=function(t){a.state.removePrevMedia||a.setState({removeAnim:!0})},a.playVideoHandler=function(t){a.props.onFetchVideo(t.id,"".concat(window.location.protocol+"//"+window.location.host,"/media/video/").concat(t.videoCnt))},a.slidePlayHandler=function(t,e,n){n.target.setPointerCapture(n.pointerId),a.setState({playerIcnId:t})},a.clearSlidePlayhandler=function(t){var e=t.target;e.releasePointerCapture(t.pointerId),e.style.left="0px";var n=document.querySelector(".reuse-que__media--wrapper__icn-move");n&&(n.style.left="42%")},a.moveSlidePlayHandler=function(t,e,n){var i=n.target;if(i.hasPointerCapture&&i.hasPointerCapture(n.pointerId)){var r=n.clientX-i.parentElement.offsetLeft-i.offsetWidth/2;r<-(i.offsetWidth/2+i.offsetWidth/4)?C&&(C=!1,a.animateSlider(t,e,"next",0)):r>i.offsetWidth/2+i.offsetWidth/4&&C&&(C=!1,a.animateSlider(t,e,"prev",0));var o=document.querySelector(".reuse-que__media--wrapper__icn-move");if(o){var s=r/i.offsetWidth*100;o.style.left=s+42+"%"}i.style.left=r+"px"}},a.animateSlider=function(t,e,n,o){setTimeout(function(){var o=Object(r.a)(a.state.mediaItms),s=o.filter(function(e){return e.id===t}),c={id:t,position:"next"===n?e>1?1:0:e-1};if(s.length>0){var l,p=Object(i.a)(s);try{for(p.s();!(l=p.n()).done;){var h=l.value;(c={id:h.id,position:"next"===n?h.position+=1:h.position-=1}).position>e-1&&(c=Object(v.f)(c,{position:0})),c.position<0&&(c=Object(v.f)(c,{position:e-1}));var d=o.filter(function(e){return e.id!==t});d.push(c),a.setState({mediaItms:d,removeAnim:!1,removePrevMedia:null,animateItm:{id:t,direction:n}})}}catch(u){p.e(u)}finally{p.f()}}else o.push(c),a.setState({mediaItms:o,removeAnim:!1,removePrevMedia:null,animateItm:{id:t,direction:n}})},o),setTimeout(function(){C=!0},500)},a.changeCntHandler=function(t,e,n,i){var r=String(e).length>50?String(e).substr(0,50)+"...":e;a.props.onChangeCnt(t,r,n,!1,i)},a.props.onFetchCntReset();var s=0;return s=window.innerHeight>=1200?18:window.innerHeight>=900?12:window.innerHeight>=500?9:6,a.state={cntOpt:null,fetchLimit:s,filterTag:"question",mediaItms:[],animateItm:null,removeAnim:!1,removePrevMedia:null,playerIcnId:null,animationComplete:!0,scrollEnable:!1},a}return Object(a.a)(n,[{key:"componentDidMount",value:function(){this.props.onFetchCnt(this.props.userID,this.state.filterTag,this.state.fetchLimit,0,0),this.props.onChangeTag("/question")}},{key:"componentDidUpdate",value:function(){this.props.cnts&&this.props.cnts.length>0&&!this.state.scrollEnable&&(window.addEventListener("scroll",this.onScroll,!1),this.setState({scrollEnable:!0})),this.props.match.params.id&&this.state.filterTag!==this.props.match.params.id&&"share"!==this.props.match.params.id&&"filter"!==this.props.match.params.id&&"startfilter"!==this.props.match.params.id&&(this.props.onFetchCntReset(),this.props.onFetchCnt(this.props.userID,"question-".concat(this.props.match.params.id),this.state.fetchLimit,0,0),this.setState({filterTag:this.props.match.params.id}))}},{key:"componentWillUnmount",value:function(){this.props.onFetchCntReset(),window.removeEventListener("scroll",this.onScroll,!1)}},{key:"render",value:function(){var t=p.a.createElement(f.a,null);return this.props.cntErr&&(t=null),this.props.cnts&&0===this.props.cnts.length&&(t=p.a.createElement(m.a,{isAuth:null!==this.props.userID,det:"No content found!",icn:"clone",filter:!0})),this.props.cnts&&0===this.props.cnts.length&&(t=p.a.createElement(m.a,{isAuth:null!==this.props.userID,det:"No content found!",icn:"clone",filter:!0})),this.props.cnts&&this.props.cnts.length>0&&(t=p.a.createElement(u.a,{content:this.props.cnts,media:this.props.media,userOpt:this.showUserOptHandler,showCntOpt:this.state.cntOpt,fav:this.changeFavoriteHandler,changedFav:this.props.changedFav,favChange:this.props.favChange,share:this.showShareHandler,nextMedia:this.changeMediaHandler,prevMedia:this.changeMediaHandler,mediaItms:this.state.mediaItms,removeAnim:this.removeAnimHandler,disableAnim:this.state.removeAnim,animateItm:this.state.animateItm,removePrevMedia:this.state.removePrevMedia,playVideo:this.playVideoHandler,videoErr:this.props.videoErr,video:this.props.postVideo,playerIcnId:this.state.playerIcnId,slidePlay:this.slidePlayHandler,moveSlidePlay:this.moveSlidePlayHandler,clearSlidePlay:this.clearSlidePlayhandler,changeCnt:this.changeCntHandler})),t}}]),n}(l.Component);e.default=Object(d.f)(Object(h.b)(function(t){return{userID:t.auth.userID,cnts:t.cnt.cnts,skipCnt:t.cnt.skipCnt,cntTotal:t.cnt.cntTotal,changedFav:t.cnt.changedFav,favChange:t.cnt.favChange,cntErr:t.cnt.cntErr,postVideo:t.cnt.postVideo,videoErr:t.cnt.videoErr,filterDet:t.cnt.filterDet}},function(t){return{onFetchShareActive:function(){return t(g.sb())},onFetchShareCntActive:function(){return t(g.rb())},onFetchCntActive:function(){return t(g.K())},onFetchNotifyActive:function(){return t(g.ib())},onFetchPtActive:function(){return t(g.kb())},onFetchQueActive:function(){return t(g.mb())},onFetchReqActive:function(){return t(g.ob())},onFetchCnt:function(e,n,i,r,o){return t(g.N(e,n,i,r,o))},onFetchCntReset:function(){return t(g.O())},onChangeFav:function(e,n,i,r,o,a){return t(g.h(e,n,i,r,o,a))},onChangeShareID:function(e,n){return t(g.ic(e,n))},onChangeTag:function(e){return t(g.w(e))},onFetchVideo:function(e,n){return t(g.Cb(e,n))},onChangeCnt:function(e,n,i,r,o){return t(g.d(e,n,i,r,o))}}})(w))}}]);
//# sourceMappingURL=23.7f113f37.chunk.js.map