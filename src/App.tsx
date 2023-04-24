import React, { useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/esm/Container';
import { ArtifactForm, FormData } from './components/ArtifactForm';
import { Artifact } from './model/artifact';
import { ArtifactShowcase } from './components/ArtifactShowcase';
import { Substats } from './data/substats';
import { FourStatChance } from './components/FourStatChance';

function App () {
	const [artifact, setArtifact] = useState<Artifact>();
	const [availableSubstats, setAvailableSubstats] = useState<string[]>( Object.keys(Substats) );

	const createArtifact = (data: FormData, availableSubs: string[]) => {
		setAvailableSubstats(availableSubs);
		setArtifact(
			new Artifact(
				data.type,
				data.mainStat,
				data.subStats,
			)
		);
	}

	return (
		<div className='App vh-100 d-flex align-items-center' style={{backgroundColor: 'rgb(40, 44, 52)'}}>
			<Container>
				<div className='row p-2 justify-content-center'>
					
					{
						(artifact)
						? (
							<ArtifactShowcase artifact={artifact} />
						) : (
							<ArtifactForm 
								createArtifact={createArtifact}
							/>
						)
					}
				</div>
			</Container>
		</div>
	);
}

export { App };
