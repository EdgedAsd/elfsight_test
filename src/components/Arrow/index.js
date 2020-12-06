import React from 'react';

import "./arrow.css";

class Arrow extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		if (this.props.enable) {
			this.props.click();
		}
	}

	render() {
		return (
			<div 
				className={`arrow-${(this.props.left_side) ? "left" : "right"} arrow ${(!this.props.enable) ? "disabled" : ""}`} 
				onClick={this.handleClick}
			>
				<i className={`fa fa-chevron-${this.props.left_side ? 'left' : 'right'}`} aria-hidden="true"></i>
			</div>
		)
	}
}

export default Arrow;