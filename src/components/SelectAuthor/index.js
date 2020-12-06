import React from 'react';

import "./select_author.css";

class SelectAuthor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.active_author
		}

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		let value = +event.target.value;
		
		this.setState({value: value});
		this.props.click(value);
	}


	render() {
		let options = this.props.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>);

		return (
			<select value={this.state.value} onChange={this.handleChange} className="select-author">
				{options}
			</select>
		)
	}
}



export default SelectAuthor;

