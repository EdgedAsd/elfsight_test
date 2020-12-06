import React from 'react';

import "./photo.css";

class Photo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			load: false		// Состояние завершенности загрузки, не участвует в коде, но с точки зрения логики необходимо для дальнеиших изменении
		}

		this.isLoad = this.isLoad.bind(this);
	}

	isLoad() {
		this.props.isLoad();
		this.setState({
			load: true
		})
	}

	render() {
		return (
			<div className="photo" onClick={() => this.props.click(this.props.photo.id)}>
				<img src={this.props.photo.thumbnailUrl} alt="" className="photo__image" onLoad={this.isLoad} />
			</div>
		)
	}
}



export default Photo;