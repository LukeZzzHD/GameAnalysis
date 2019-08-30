import React from 'react';
import ResponsivePlayer from './components/ResponsivePlayer';

function App() {
	return (
		<div className='App'>
			<div className='row'>
				<div className='col s12 m12 l12'>
					<ResponsivePlayer url='https://www.youtube.com/watch?v=ScMzIvxBSi4' />
				</div>
			</div>
		</div>
	);
}

export default App;
