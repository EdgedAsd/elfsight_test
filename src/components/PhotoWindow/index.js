import React from 'react';

import Arrow from "../Arrow";

import "./photo_window.css";

class PhotoWindow extends React.Component {
	constructor(props) {
		super(props);

		this.setNextPhoto = this.setNextPhoto.bind(this);
		this.setPrevPhoto = this.setPrevPhoto.bind(this);
	}

	setNextPhoto() {
		this.props.setActivePhoto(this.props.active_photo.id + 1);
	}

	setPrevPhoto() {
		this.props.setActivePhoto(this.props.active_photo.id - 1);
	}

	render() {
		return (
			<div className="photo-window">
				<div className="close-btn" onClick={() => this.props.setActivePhoto()}><i className="fa fa-times" aria-hidden="true"></i></div>
				<div className="photo-window__image" style={{'backgroundImage': `url("${this.props.active_photo.url}")`}}></div>
				<Arrow left_side={true} enable={this.props.active_photo.id !== 1} click={this.setPrevPhoto} />
				<Arrow left_side={false} enable={this.props.active_photo.id !== this.props.number} click={this.setNextPhoto} />
			</div>
		)
	}
}



export default PhotoWindow;