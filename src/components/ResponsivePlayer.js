import React, { Component } from 'react';
import VideoPlayerWrap from './VideoPlayerWrap';
import ReactPlayer from 'react-player';

class ResponsivePlayer extends Component {
	playerInstance = React.createRef();
	getPlayer = () => this.playerInstance.current;

	state = {
		fraction: 0,
		timestamps: []
	};

	render() {
		const { url } = this.props;

		if (ReactPlayer.canPlay(url)) {
			return (
				<VideoPlayerWrap>
					<ReactPlayer url={url} ref={this.playerInstance} playing controls onPlay={this.handlePlay} onPause={this.handlePause} width='1245px' height='700px' />
					<button className='btn red white-text' onClick={this.skipToFraction}>
						skip to
					</button>
					<button className='btn blue white-text' onClick={this.createTimestamp}>
						Create timestamp
					</button>
					<input type='text' placeholder='0 - 1' id='fraction' onChange={this.handleChange} />
					<br />
					{this.state.timestamps.map((ts, i) => (
						<button
							key={i}
							className='btn green white-text'
							onClick={() => {
								this.skipToSeconds(ts, 'seconds');
							}}
						>
							Skip to {Math.round(ts, 2)}
						</button>
					))}
				</VideoPlayerWrap>
			);
		} else {
			return <h1>The provided url is invalid and cannot be played.</h1>;
		}
	}

	handlePlay = e => {
		console.log(`Player started playing at: ${this.getPlayer().getCurrentTime()}`);
	};

	handlePause = e => {
		console.log(`Player has been paused at: ${this.getPlayer().getCurrentTime()}`);
	};

	handleChange = e => {
		let fraction = parseFloat(e.target.value) || 0;
		this.setState({ fraction });
	};

	skipToFraction = () => {
		this.getPlayer().seekTo(this.state.fraction, 'fraction');
	};

	createTimestamp = () => {
		let timestamp = this.getPlayer().getCurrentTime();
		console.log(`Timestamp created at: ${timestamp}`);
		this.setState({ timestamps: [...this.state.timestamps, timestamp] });
	};

	skipToSeconds = seconds => {
		this.getPlayer().seekTo(seconds, 'seconds');
	};
}

export default ResponsivePlayer;
