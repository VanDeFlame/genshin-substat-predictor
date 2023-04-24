import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Artifact } from '../model/artifact';
import { SubstatShowcase } from './SubstatShowcase';

interface ShowcaseProps {
	artifact: Artifact;
	disabled: boolean;
	nextRoll: () => void;
}

export function ArtifactShowcase ({ artifact, disabled, nextRoll }: ShowcaseProps) {
	return (
		<div 
			className='p-2 d-flex flex-column justify-content-between border border-white rounded-2'
			style={{	maxWidth: '375px', minHeight: '110px'	}}
		>
			{/* ARTIFACT TYPE */}
			<div className="mb-3">
				<div className="d-flex justify-content-between align-items-center">
					<label>
						<img src={`/Icon_${artifact.type}.webp`} />
					</label>
					
					{/* ARTIFACT LEVEL */}
					<p 
						className="fw-bold fs-3 me-2 mb-0 border border-white rounded-2 text-center"
						style={{	width: '64px'	}}
					>+{artifact.rolls * 4}</p>
				</div>
							
				<p className="fw-bold mb-2 fs-4 text-center">{artifact.type}</p>
			</div>

			{/* MAIN STAT */}
			<div className="mx-2 mb-3" style={{	minHeight: '70px' }}>
				<label className="fw-bold mb-2">Main Stat</label>
				<p className="ps-2 my-2">{artifact.mainStat}</p>
			</div>
			
			{/* SUB STATS */}
			<div className="mx-2 mb-3">
				<label className="fw-bold mb-2">Sub Stats</label>
				<ol 
					className="px-2 d-flex flex-column"
					style={{ height: '200px', listStyle: 'none'	}}
				>{

					artifact.subStats.map((substat, i) => (
						<React.Fragment key={'substat-showcase'+i}>
							<SubstatShowcase substat={substat} key={'substat-showcase'+i+substat} />
							{	(i !== 3) && <hr className="mt-2" style={{ marginBottom: '7px' }} /> }
						</React.Fragment>
					))

				}</ol>
			</div>

			{/* SUBMIT BUTTON */}
			<Button 
				variant="primary"
				type="submit"
				className="mt-auto"
				onClick={nextRoll}
				disabled={disabled}
			>
				Next Roll
			</Button>
		</div>
	);
}