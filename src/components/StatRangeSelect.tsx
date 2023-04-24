import React from 'react';
import FormCheck from 'react-bootstrap/esm/FormCheck';
import { Ranges } from '../data/substats';

interface RangeSelectProps {
	selRange: string;
	setSelRange: React.Dispatch<React.SetStateAction<string>>;
}

export function StatRangeSelect ({ selRange, setSelRange }: RangeSelectProps) {
  const handleCheckboxChange = (range: string) => {
    setSelRange(range);
  }

	return (
    <div 
			className='p-2 d-flex flex-column justify-content-between border border-white rounded-2'
			style={{	maxWidth: '375px', minHeight: '110px'	}}
		>{
			Object.keys(Ranges).map((range) => (
				<FormCheck
					key={'StatRangeSelect'+range}
					id={'StatRangeSelect'+range}
					type='checkbox'
					checked={selRange === range}
					onChange={() => handleCheckboxChange(range)}
					label={range}
				/>
			))
		}</div>
  );
}