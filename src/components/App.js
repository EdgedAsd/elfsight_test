import React from 'react';

import SelectAuthor from "./SelectAuthor";
import AlbumsList from "./AlbumsList";
import PhotoList from "./PhotoList";

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			authors: undefined,			// Список всех авторов (массив) с альбомами и фото внутри
			active_author: undefined,	// id выбранного автора
			active_album: undefined,	// id выбранного альбома
			ready: false				// Флажок успешнои загрузки всех ресурсов
		}

		this.changeAuthor = this.changeAuthor.bind(this);
		this.changeAlbum = this.changeAlbum.bind(this);
		this.findAuthor = this.findAuthor.bind(this);
		this.findAlbum = this.findAlbum.bind(this);
	}

	componentDidMount() {

		fetch("https://jsonplaceholder.typicode.com/photos")
			.then(response => response.json())
			.then(photos => new Promise((resolve, reject) => {
				fetch('https://jsonplaceholder.typicode.com/albums')
					.then(response => response.json())
					.then(albums => {
						albums.forEach(album => {
							let current_photos = photos.filter(photo => (photo.albumId === album.id))
							album.photos = current_photos;
						})
						resolve(albums)
					})
			}))
			.then(albums => new Promise((resolve,reject) => {
				fetch('https://jsonplaceholder.typicode.com/users')
					.then(response => response.json())
					.then(authors => {
						authors.forEach(author => {
							let current_albums = albums.filter(album => (album.userId === author.id))
							author.albums = current_albums;
						})
						resolve(authors);
					})
			}))
			.then(authors => this.setState({
				ready: true,
				active_author: authors[0].id,
				authors: authors
			}))
	}


	// Ф-я смены выбранного автора
	changeAuthor(id) {
		this.setState({
			active_author: id
		});
	}


	// Ф-я смены выбранного альбома
	changeAlbum(id) {
		this.setState({active_album: id});
	}

	// Ф-я поиска объекта автора по id
	findAuthor(author = this.state.active_author) {
		return this.state.authors.find(author_obj => author_obj.id === author)
	}

	// Ф-я поиска объекта альбома по id
	findAlbum(author = this.state.active_author, album = this.state.active_album) {
		let albums = this.findAuthor(author).albums;
		return albums.find(album_obj => album_obj.id === album)
	}

	render() {
		let {ready, authors, active_author, active_album} = this.state;

		if (ready) {
			let content = 	<div className="choose-album">
								<SelectAuthor authors={authors} active_author={active_author} click={this.changeAuthor} />
								<AlbumsList albums={this.findAuthor().albums} changeAlbum={this.changeAlbum} />
							</div>

			if (active_album) {
				content = 	<div className="photo-list-wrapper">
								<div className="button-back" onClick={() => this.changeAlbum()}>
									<i className="fa fa-chevron-left" aria-hidden="true"></i>
								</div>
								<PhotoList photos={this.findAlbum().photos}/>
							</div>
			}

			return (
				<div className="app">{content}</div>
			)
		}
		else {
			return (
				<p className="loading">Loading...</p>
			)
		}
	}
}

export default App;