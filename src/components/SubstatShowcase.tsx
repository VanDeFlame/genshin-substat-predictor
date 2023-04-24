import React from 'react';
import { Substats } from '../data/substats';
import { statFormatter } from '../formatters/statFormatter';
import { Artifact } from '../model/artifact';
 
interface Props {
	substat: {
		stat: string;
		levels: string[];
	};
}
 
function SubstatShowcase ({substat}: Props) {
	const sub = Substats[substat.stat as keyof typeof Substats];
	return (
		<li 
			className="d-flex justify-content-between align-items-center pe-3"
			style={{ height: '38px' }}
		>
			<span>
				{ sub.name }
			</span>
			<span className="fw-bold mx-2 w-25">+&nbsp;
				{ 
					statFormatter(
						Artifact.getSubstatValue(substat),
						sub.isFlat
					)
				}
			</span>
		</li>
	);
}
 
export { SubstatShowcase };
 