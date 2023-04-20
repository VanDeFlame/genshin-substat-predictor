import React, { useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/esm/Container';
import { ArtifactForm, FormData } from './components/ArtifactForm';
import { Artifact } from './model/artifact';
import { ArtifactShowcase } from './components/ArtifactShowcase';

function App () {
	const [artifact, setArtifact] = useState<Artifact>()

	const createArtifact = (data: FormData) => {
		setArtifact(
			new Artifact(
				data.type,
				data.mainStat,
				data.subStats,
			)
		)
	}

	
	return (
		<div className='App vh-100 d-flex align-items-center' style={{backgroundColor: 'rgb(40, 44, 52)'}}>
			<Container>
				<div className='row p-2 justify-content-center'>
					<ArtifactForm createArtifact={createArtifact} />
				</div>
			</Container>
		</div>
	);
}

export { App };
