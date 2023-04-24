import React, { ReactNode, useEffect, useState } from 'react';
import { RollChart } from './RollChart';
import Button from 'react-bootstrap/esm/Button';

interface Props {
	artRoll: number;
	children: ReactNode;
	substatList: string[];
	generate: () => string;
}

interface Rolls {
	data: any;
	rolls: number;
}

function SubstatChance ({ artRoll, children, substatList, generate }: Props) {
	const [rolls, setRolls] = useState<Rolls>({
		rolls: 0,
		data: {},
	})

	const doRolls = (quantity: number) => {
		const rolled: string[] = [];
    for (let index = 0; index < quantity; index++) {
      rolled.push(generate())
		}

		setRolls((prev: Rolls) => {
      const newData = { ...prev.data };
      rolled.forEach((substat) => {
        newData[substat] = (newData[substat] || 0) + 1;
      });

      return {
        rolls: prev.rolls + quantity,
        data: newData,
      };
    });
  };

	useEffect(() => {
		setRolls({
			rolls: 0,
			data: substatList.reduce((acc, substat) => ({ ...acc, [substat]: 0 }), {}),
		});
		doRolls(10);
	}, [artRoll])

	return (
		<div className='col-7 p-2 d-flex justify-content-between border border-white rounded-2'>
			<RollChart rolls={rolls.rolls} data={rolls.data} />
			
			<div 
				className='d-flex flex flex-column gap-3 w-50'
				style={{ maxWidth: '375px' }}
			>
				{	children }
				

				{/* MORE ROLLS BUTTON */}
				<Button 
					variant="primary"
					type="submit"
					className="w-100 mt-auto"
					onClick={() => doRolls(10)}
				>
					+10 Rolls
				</Button>
			</div>			
		</div>
	);
}

export { SubstatChance };
