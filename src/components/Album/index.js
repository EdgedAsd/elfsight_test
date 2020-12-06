import React from 'react';

import "./album.css";

class Album extends React.Component {
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
			<div className="album" onClick={() => this.props.click(this.props.id_num)}>
				<img src={this.props.bg} alt="" className="album__img" onLoad={this.isLoad}/>
				<h6 className="album__title">
					{this.props.title}<span className="album__title_number">&nbsp;-&nbsp;{this.props.number}</span>
				</h6>
			</div>
		)
	}
}



export default Album;