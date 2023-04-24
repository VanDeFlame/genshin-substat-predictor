import React, { useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/esm/Container';
import { ArtifactForm, FormData } from './components/ArtifactForm';
import { Artifact } from './model/artifact';
import { ArtifactShowcase } from './components/ArtifactShowcase';
import { Substats } from './data/substats';
import { SubstatChance } from './components/SubstatChance';
import { generateFourStat } from './logic/generateFourSubstat';
import { calcSubstatToLvl } from './logic/calcSubstatToLvl';
import { StatListSelect } from './components/StatListSelect';
import { StatRangeSelect } from './components/StatRangeSelect';

function App () {
	const [artifact, setArtifact] = useState<Artifact>();
	const [availableSubstats, setAvailableSubstats] = useState<string[]>( Object.keys(Substats) );
	const [selectedSubstat, setSelectedSubstat] = useState<string>('');
	const [selectedRange, setSelectedRange] = useState<string>('');

	const is3Sub: boolean = (!artifact?.isFull && artifact?.rolls === 0);

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

	const generate4Stat = () => {
		if (!artifact) return '';

		return generateFourStat(
			artifact.subStats,
			artifact.mainStat
		);
	}

	const generateLvlStat = () => {
		if (!artifact) return '';
		
		const lastRange = artifact.getLastRangeUpgrade();
		const index = calcSubstatToLvl(
			artifact.rolls,
			artifact.prevSubstat,
			lastRange
		);

		return artifact.subStats[index].stat;
	}

	const nextRoll = () => {
		if (!artifact) return;

		artifact.nextRoll(
			selectedSubstat,
			selectedRange
		)

		setSelectedSubstat('');
		setSelectedRange('');
	}

	return (
		<div className='App vh-100 d-flex align-items-center' style={{ backgroundColor: 'rgb(40, 44, 52)'	}}>
			<Container>
				<div className='row p-2 justify-content-center gap-3'>
					{/* ARTIFACT FORM */
						(!artifact) && (
						<ArtifactForm createArtifact={createArtifact}/>
					)}
					{/* ARTIFACT SHOWCASE */
						(artifact) && (
						<ArtifactShowcase 
							key={"showcase-"+artifact}
							artifact={artifact}
							nextRoll={nextRoll}
							disabled={selectedSubstat === '' || selectedRange === ''}
						/>
					)}
					{/* ARTIFACT CHANCES */
						(artifact && artifact.rolls < 5) && (
						<SubstatChance
							artRoll={artifact.rolls}
							substatList={is3Sub ? availableSubstats : artifact.substatList}
							generate={is3Sub ? generate4Stat : generateLvlStat}
						>
							<StatListSelect 
								substatList={is3Sub ? availableSubstats : artifact.substatList}
								selSubstat={selectedSubstat}
								setSelSubstat={setSelectedSubstat}
							/>
							<StatRangeSelect												
								selRange={selectedRange}
								setSelRange={setSelectedRange}
							/>
						</SubstatChance>
					)}
				</div>
			</Container>
		</div>
	);
}

export { App };
