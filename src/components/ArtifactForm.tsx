import React, { useEffect, useState } from 'react';
// import './form.css';
import { Types, allowedMainStats } from '../data/artifacts';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import { Stats } from '../data/stats';
import { Ranges, Substats } from '../data/substats';
import { SubstatForm } from './SubstatForm';
import { getSubstatName } from '../utils/getStat';

interface FormProps {
	createArtifact: (data: FormData, availableSubs: string[]) => void;
}

export interface FormData {
  type: Types;
  mainStat: string;
  subStats: {stat: string, range: Ranges}[];
}

const DEFAULT_SUBSTATS = [
	{stat: 'none', range: Ranges.LOW},
	{stat: 'none', range: Ranges.LOW},
	{stat: 'none', range: Ranges.LOW},
	{stat: 'none', range: Ranges.LOW},
];

export function ArtifactForm (props: FormProps) {
	const [formData, setFormData] = useState<FormData>({
		type: Types.Flower,
		mainStat: allowedMainStats[Types.Flower][0],
		subStats: DEFAULT_SUBSTATS
	});
	const mainStatOptions = allowedMainStats[formData.type];
	
	const subStatList = Object.keys(Substats).filter(key => getSubstatName(key) !== formData.mainStat);
	const subStatOptions = subStatList.filter((subStat) => !formData.subStats.find(s => s?.stat === subStat));

	const onChangeType = (event: any) => {
		const value: Types = event.target.value;
		setFormData((form) => ({
			...form,
			type: value,
			mainStat: allowedMainStats[value][0],
			subStats: DEFAULT_SUBSTATS
		}))
	}

	const onChangeMainstat = (event: any) => {
		const value: Stats = event.target.value;
		setFormData((form) => ({
			...form,
			mainStat: value,
			subStats: DEFAULT_SUBSTATS
		}));
	}

	const onChangeSubstat = (index: number, value: string) => {
		setFormData((form) => {
			const subs = form.subStats.map((ss, i) => {
				if (i !== index) return ss;
				return { stat: value, range: Ranges.LOW }
			});
			
			return { ...form, subStats: subs }
		})
	}

	const onChangeSubstatRange = (index: number, value: Ranges) => {
		setFormData((form) => ({
			...form,
			subStats: formData.subStats.map((ss, i) => i === index ? { stat: ss!.stat, range: value } : ss),
		}))
	}

	const onSubmit = (event: any) => {
    event.preventDefault();

		// 1st, 2nd, and 3rd substats can't be 'none'. 4th substat is optional.
		if (
			formData.subStats[0].stat === 'none' ||
			formData.subStats[1].stat === 'none' ||
			formData.subStats[2].stat === 'none'
		) return alert('Incomplete artifact');

    props.createArtifact(formData, subStatOptions);
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
					required
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
					required
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
			<Button variant="primary" type="submit" className="mt-auto">
        Create
      </Button>
		</Form>
	);
}