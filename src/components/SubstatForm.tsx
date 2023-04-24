import React from 'react';
import Form from 'react-bootstrap/esm/Form';
import { statFormatter } from '../utils/statFormatter';
import { Ranges } from '../data/substats';
import { getSubstat, getSubstatName } from '../utils/getStat';

interface SubstatProps {
	index: number;
	substat: { stat: string, range: Ranges };
	subStatOptions: string[];
	onChangeSubstat: (index: number, value: string) => void;
	onChangeSubstatRange: (index: number, value: Ranges) => void;
}

export function SubstatForm (props: SubstatProps) {
	const {	index, substat, subStatOptions } = props;

	const getRange = (substat: string, range: string) => {
		const sub = getSubstat(substat);
		if (!sub) return 0;

		const rangeNumber = sub.getRange(range.toLowerCase());
		return statFormatter(rangeNumber, sub.isFlat);
	}

	return (
		<li className='mb-3 d-flex align-items-center' key={'artifactSubstat'+index}>
			{/* SUBSTAT KEY */}
			<Form.Select
				className='border border-white rounded-2'
				onChange={e => props.onChangeSubstat(index, e.target.value)}
				value={substat.stat}				
				required={index !== 3}
			>
				{(index === 3 && substat.stat !== 'none') && <option value='none'>none</option>}
				{[substat.stat, ...subStatOptions].map(ss => 
					<option key={'substat-1-'+ss} value={ss}>{
						getSubstatName(ss) ?? 'none'
					}</option>
				)}
			</Form.Select>
			
			<span className='fw-bold mx-2'>+</span>
			
			{/* SUBSTAT VALUE */}
			<Form.Select
				className='border border-white rounded-2 w-50'
				onChange={e => props.onChangeSubstatRange(index, e.target.value as Ranges)}
				value={substat.range}
				disabled={substat.stat === 'none'}
				required={index !== 3}
			>{
				Object.values(Ranges).map(range =>
					<option key={'artifactSubstat'+index+range} value={range}>{
						getRange(substat.stat, range)
					}</option>
				)
			}</Form.Select>
		</li>
	);
}