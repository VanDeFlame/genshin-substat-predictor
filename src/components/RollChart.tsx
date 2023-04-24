import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { optionColors } from '../model/optionColors';
import { getSubstatName } from '../utils/getStat';

interface RollChartProps {
	rolls: number;
  data: any;
}

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

export function RollChart ({ rolls, data }: RollChartProps) {
  const labels = Object.keys(data).map((ss: string) => getSubstatName(ss));
  const quantities = Object.values<number>(data);

  const chartData = {
    labels: labels,
    datasets: [{
			label: 'Times rolled',
			data: quantities,				
			backgroundColor: optionColors.slice(0, data.length),
		}],
  };

	const chartOptions: any = {
    plugins: {
			legend: {
				display: false
			},
      datalabels: {				
				font: {
					color: '#000',
					size: '20px',
					weight: 'bold' 
				},
				display: (context: any) => {
					const value = context.dataset.data[context.dataIndex];
					return value !== 0 && !isNaN(value);
				},
				formatter: (value: number) => {
					if (value === 0) return '';
					return ((value / rolls) * 100).toFixed(2).replace(/[.,]00$/, "") + '%'
        }
      },
    },
  };

  return (
		<div className='d-flex flex-column align-items-center w-50' style={{ maxWidth: '375px' }}>
			<h2 className='text-center mt-2'>{rolls} rolls</h2>
			<div className='my-auto' style={{ width: '300px' }}>
				<Pie data={chartData} options={chartOptions}/>
			</div>
		</div>
  );
}