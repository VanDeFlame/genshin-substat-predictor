import React, { useState } from 'react';
// import './form.css';
import { Types, allowedMainStats } from '../data/artifacts';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import { Stats } from '../data/stats';
import { Ranges, Substats } from '../data/substats';
import { SubstatForm } from './SubstatForm';

interface FormProps {
	createArtifact: (data: FormData) => void
}

export interface FormData {
  type: Types;
  mainStat: string;
  subStats: {stat: string, range: Ranges}[];
}


export function ArtifactForm (props: FormProps) {
	const [formData, setFormData] = useState<FormData>({
		type: Types.Flower,
		mainStat: allowedMainStats[Types.Flower][0],
		subStats: [
			{stat: 'none', range: Ranges.LOW},
			{stat: 'none', range: Ranges.LOW},
			{stat: 'none', range: Ranges.LOW},
			{stat: 'none', range: Ranges.LOW},
		]
	});
	const mainStatOptions = allowedMainStats[formData.type];	
	const subStatList = Object.values(Substats).map(ss => ss.name).filter(ss => ss !== formData.mainStat)
	const subStatOptions = subStatList.filter((subStat) => !formData.subStats.find(s => s?.stat === subStat));

	const onChangeType = (event: any) => {
		const value: Types = event.target.value;
		setFormData((form) => ({
			...form,
			type: value,
			mainStat: allowedMainStats[value][0],
			subStats: [
				{stat: 'none', range: Ranges.LOW},
				{stat: 'none', range: Ranges.LOW},
				{stat: 'none', range: Ranges.LOW},
				{stat: 'none', range: Ranges.LOW},
			]
		}))
	}

	const onChangeMainstat = (event: any) => {
		const value: Stats = event.target.value;
		setFormData((form) => ({
			...form,
			mainStat: value,
		}));
	}

	const onChangeSubstat = (index: number, value: string) => {
		setFormData((form) => ({
			...form,
			subStats: formData.subStats.map((ss, i) => {
				if (i !== index) return ss;
				return { stat: value, range: Ranges.LOW }
			}),
		}))
	}

	const onChangeSubstatRange = (index: number, value: Ranges) => {
		setFormData((form) => ({
			...form,
			subStats: formData.subStats.map((ss, i) => i === index ? { stat: ss!.stat, range: value } : ss),
		}))
	}

	const onSubmit = (event: any) => {
    event.preventDefault();
    props.createArtifact(formData);
  }

	return (
		<Form 
			className='p-2 d-flex flex-column border border-white rounded-2'
			style={{maxWidth: '375px'}}
			onSubmit={onSubmit}	
		>
			{/* ARTIFACT TYPE */}
			<Form.Group className="mb-3" controlId="artifactType">
				<Form.Label>
					<img src={`/Icon_${formData.type}.webp`} />
				</Form.Label>
				<Form.Select
					className='border border-white rounded-2'
					onChange={onChangeType}
					value={formData.type}
				>{
					Object.values(Types).map(type =>
						<option key={'type-'+type} value={type}>{type}</option>
					)
				}</Form.Select>
			</Form.Group>

			{/* MAIN STAT */}
			<Form.Group className='mb-3' controlId='artifactMainstat'>
				<Form.Label className="fw-bold">Main Stat</Form.Label>
				<Form.Select
					className='border border-white rounded-2'
					onChange={onChangeMainstat}
					value={formData.mainStat}
				>{
					mainStatOptions.map(ms => 
						<option key={'mainstat-'+ms} value={ms}>{ms}</option>
					)
				}</Form.Select>
			</Form.Group>
			
			{/* SUB STATS */}
			<Form.Group className="mb-3" controlId="artifactSubstats">
				<Form.Label className="fw-bold">Sub Stats</Form.Label>
				<ol className='p-0'>{
					formData.subStats.map((substat, i) => (
						<SubstatForm 
							key={'SubstatForm'+i}
							index={i}
							substat={substat}
							subStatOptions={subStatOptions}
							onChangeSubstat={onChangeSubstat}
							onChangeSubstatRange={onChangeSubstatRange}
						/>
					))
				}</ol>
			</Form.Group>

			{/* SUBMIT BUTTON */}
			<Button variant="primary" type="submit">
        Submit
      </Button>
		</Form>
	);
}