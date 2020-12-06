import React from 'react';

import Album from "../Album";
import "./album_list.css";

class AlbumsList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			imageIsLoad: 0,		// Количество успешно загруженных фото
			allLoad: false		// Флажок загрузки всех фото
		}

		this.loadImage = this.loadImage.bind(this);
	}


	// Ф-я вызывается компонентом Album, когда еще его фото загружено
	loadImage() {
		this.setState(prevState => {
			if (prevState.imageIsLoad+1 === this.props.albums.length) {
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

	render() {
		
		let albums = this.props.albums.map(album => {
			return (
				<li key={album.id} className="album-wrapper item">
					<Album 
						title={album.title} 				// Название альбома
						number={album.photos.length} 		// Фото внутри альбома
						click={this.props.changeAlbum} 		// Ф-я связка, меняет значение активного альбома в компоненте App
						bg={album.photos[0].thumbnailUrl} 	// Фон альбома - его первое фото
						isLoad={this.loadImage}				// Ф-я связка, передает рез-т загрузки фото
						id_num={album.id}					// id альбома
					/>
				</li>
			)
		})
		
		return (
			<div className="album-list-wrapper">
				{(this.state.allLoad) ? null : <p className="loading">Loading albums...</p>}
				<ul className="album-list list" style={{"display": (this.state.allLoad) ? 'flex' : 'none'}}>{albums}</ul>
			</div>
		)
	}
}



export default AlbumsList;