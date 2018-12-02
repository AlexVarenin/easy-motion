import React from 'react';

export default class Spinner extends React.Component {
	render() {
		return (
			<div className='popup-layer popup-layer--spinner'>
				<div className='spinner'></div>
			</div>
			);
	}
}