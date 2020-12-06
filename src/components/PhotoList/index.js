import React from 'react';

import Photo from "../Photo";
import PhotoWindow from "../PhotoWindow";

import "./photo_list.css";

class PhotoList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			allLoad: false,				// Флажок загрузки всех фото
			imageIsLoad: 0,				// Количество успешно загруженных фото
			active_photo: undefined		// id выбранного фото
		}

		this.loadImage = this.loadImage.bind(this);
		this.setActivePhoto = this.setActivePhoto.bind(this);
	}

	loadImage() {
		this.setState(prevState => {
			if (prevState.imageIsLoad+1 === this.props.photos.length) {
				return {
					imageIsLoad: 0,
					allLoad: true
				}
			}
			return {
				imageIsLoad: prevState.imageIsLoad+1,
				allLoad: false
			}
		})
	}

	setActivePhoto(id) {
		this.setState({
			active_photo: id
		})
	}

	findPhoto(photo=this.state.active_photo) {
		return this.props.photos.find(photo_obj => (photo_obj.id === photo))
	}

	render() {
		let photos = this.props.photos.map(photo => {
			return (
				<li key={photo.id} className="item photo-wrapper">
					<Photo photo={photo} isLoad={this.loadImage} click={this.setActivePhoto} />
				</li>
			)
		})

		document.body.style.overflow = (this.state.active_photo) ? ('hidden') : ('scroll');		// Отключение прокрутки

		return (
			<div className="photo-content">
				{(this.state.allLoad) ? null : <p className="loading">Loading photos...</p>}
				<ul className="photo-list list" style={{"display": (this.state.allLoad) ? 'flex' : 'none'}}>{photos}</ul>
				{(this.state.active_photo) ? <PhotoWindow setActivePhoto={this.setActivePhoto} number={this.props.photos.length} active_photo={this.findPhoto()}/> : null}
			</div>
		)
	}
}

export default PhotoList;