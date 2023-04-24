import React from 'react';
import FormCheck from 'react-bootstrap/esm/FormCheck';
import { optionColors } from '../model/optionColors';
import { getSubstatName } from '../utils/getStat';

export interface ListSelectProps {	
	substatList: string[];	
	selSubstat: string;
	setSelSubstat: React.Dispatch<React.SetStateAction<string>>;
}

export function StatListSelect ({ substatList, selSubstat, setSelSubstat }: ListSelectProps) {
  const handleCheckboxChange = (substat: string) => {
    setSelSubstat(substat);
  }

  return (
    <div 
			className='p-2 d-flex flex-column justify-content-between border border-white rounded-2'
			style={{	maxWidth: '375px', minHeight: '110px'	}}
		>{
			substatList.map((substat, i) => (
				<FormCheck 
					className='p-0'
					key={'StatListSelect'+substat}
				>
					<FormCheck.Input 
						id={'StatListSelect'+substat}
						type='checkbox'
						className='btn-check'
						checked={selSubstat === substat}
						onChange={() => handleCheckboxChange(substat)}
					/>
					<FormCheck.Label
						className='btn btn-outline-dark my-1 fw-bold w-100'
						htmlFor={'StatListSelect'+substat}
						style={{ 
							border: 'solid 2px' + optionColors[i],
							color: optionColors[i],
							backgroundColor: (selSubstat === substat) ? optionColors[i]+'44' : '#0000'
						}}
					>
						{getSubstatName(substat)}
					</FormCheck.Label>
				</FormCheck>
			))
		}</div>
  );
}
