import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition,TransitionGroup  } from 'react-transition-group';

import './Media.css';

class Carousel extends Component {
  	state = { 
      items: this.props.images, 
      currentIndex: 0, 
	  video: null,
      isNext: true 
    };
  
  prevMediaHandler = () => {
    let index = this.state.currentIndex,
        length = this.state.items.length;
    
    if( index < 1 ) {
      index = length;
    }
    
    index = index - 1;
  
    this.setState({
      currentIndex: index,
      isNext: false
    });
	// const currentIndex = (this.state.currentIndex - 1 + this.props.images.length) % this.props.images.length;
	// this.setState({ currentIndex });
  }
  
  nextMediaHandler = () => {
    let index = this.state.currentIndex,
        length = this.state.items.length - 1;
    
    if( index === length ) {
      index = -1;
    }
    
    index = index + 1;
    
    this.setState({
      currentIndex: index,
      isNext: true
    });

	// 	const currentIndex = (this.state.currentIndex + 1) % this.props.images.length;
	// 	this.setState({ currentIndex });
  }
  
  playVideoHandler = (cnt) => {
	  this.setState({video: {url: `https://www.slodge24.com/media/video/${cnt.videoCnt}`, id: cnt.id}})
  }

  render(){
    let index = this.state.currentIndex;
    let isnext = this.state.isNext;
    let media = this.state.items[index];
	let src = media.videoCnt ? {url: `https://www.slodge24.com/media/image/${media.id}`, ...media, mediaType: 'snapshot'} : 
        {url: `https://www.slodge24.com/media/image/${media.id}`, ...media, mediaType: 'image'};
    let playVideo = null;
	let control = null;
	if (src && src.mediaType === 'snapshot') {
		playVideo = (
			<div 
				className={this.props.playClass}
				onClick={this.playVideoHandler.bind(this, media)}>
				<FontAwesomeIcon 
					icon={['fas', 'play-circle']} 
					className={this.props.playIcnClass} /> 
			</div>
		);
	}
	if (this.state.items.length > 1 ) {
		control = (
			<>
				<div 
					className={this.props.nextClass}
					onClick={this.nextMediaHandler}>
					<FontAwesomeIcon 
						icon={['fas', 'angle-right']} 
						className={this.props.nextIcnClass} />  
				</div>
				<div 
					className={this.props.prevClass}
					onClick={this.prevMediaHandler}>
					<FontAwesomeIcon 
						icon={['fas', 'angle-left']} 
						className={this.props.prevIcnClass} /> 
				</div>
			</>
		)
	}

	let cnt = (
		<img  alt="" src={src.url} />
	)

	if (this.state.video && this.state.video.id === src.id && this.state.video.url) {
		playVideo = null;
		cnt = (
			<video 
				src={this.state.video.url} controls autoPlay>
				<p>our browser doesn't support embedded videos</p>
			</video>
		)
	}

	return (
			<>
				<div className={this.props.wrapperClass}>
					<TransitionGroup
						component={null}>
						<CSSTransition
							key={index}
							classNames={{
							enter: isnext ? 'enter-next' : 'enter-prev',
							enterActive: 'enter-active',
							exit: 'exit',
							exitActive: isnext ? 'exit-active-next' : 'exit-active-prev'
							}}
							timeout={500}>
							<div className="reuse-cnt__media--currentIndex" key={index}>
								{ playVideo }
								{ cnt }
							</div>
						</CSSTransition>
					</TransitionGroup>
				</div>
				{ control }
			</>
    	)
  	}
}


export default Carousel;