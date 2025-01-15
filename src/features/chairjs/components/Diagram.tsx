import React, {useRef} from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns'; // Підключення адаптера для роботи з датами
import {
	Chart as ChartJS,
	Title,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	TimeScale, // Додано шкалу часу
	PointElement,
	LineElement,
	ArcElement,
	Filler,
	ChartOptions, Chart,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import {useAppSelector} from "@/state/hook";
import {
	selectChartJsState,
	selectFirstData,
	selectTargetData
} from "@/chairjs/chairJsSlice";
ChartJS.register(
	Title,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	TimeScale, // Зареєстровано шкалу часу
	PointElement,
	LineElement,
	ArcElement,
	Filler,
	zoomPlugin,
);
// Type
type DiagramType = {
	getValue: (value: string) => void,
}
// ChairJs
export const Diagram = React.memo((props: DiagramType) => {
	const chartRef = useRef<Chart<"line", { x: string | number; y: number }[], unknown> | null>(null);
	const chartJsState = useAppSelector(selectChartJsState);
	const firstDate = useAppSelector(selectFirstData);
	const targetDate = useAppSelector(selectTargetData);
	// Date at seconds
	const firstDateXInSeconds: number = new Date(firstDate.x).getTime();
	const targetDateXInSeconds: number = new Date(targetDate.x).getTime();
	// Отримуємо максимальне значення для осі Y з останніх даних
	const lastDataY = chartJsState.datasets.reduce((max, dataset) => {
		const lastPoint = dataset.data[dataset.data.length - 1];
		return Math.max(max, lastPoint.y);
	}, 0);
	// Options
	let previousCurrentValueX: string = '';
	const options: ChartOptions<'line'> = {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				type: 'time',
				time: {
					unit: 'month',
					displayFormats: {
						month: 'MMM yyyy',
					},
				},
				ticks: {
					color: 'grey',
					align: 'inner',
					callback: function(value) {
						let date = new Date(value);
						date.setMonth(date.getMonth() - 1); // Додаємо 1 місяць
						let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // Масив для місяців
						let month = months[date.getMonth()]; // Отримуємо назву місяця
						let year = date.getFullYear().toString().slice(-2); // Отримуємо останні дві цифри року (наприклад, "25" для 2025)
						return `${month}'${year}`; // Виводимо місяць і рік у форматі "MMM YY"
					}
				},
				grid: {
					display: false, // Прибираємо вертикальні лінії сітки
				},
				min: targetDateXInSeconds - (1000 * 60 * 60 * 24 * 76), // 30 днів до цільової дати
				max: targetDateXInSeconds + (1000 * 60 * 60 * 24 * 76), // 30 днів після цільової дати
			},
			y: {
				position: 'center', // Вісь Y розташована зліва
				beginAtZero: true,
				offset: true, // Зміщує лінії сітки між мітками
				suggestedMax: lastDataY + 10, // Збільшуємо максимум
				ticks: {
				 	align: "end",
					stepSize: 20,       // Крок між підписами
					callback: function (value) {
						return value + '  грн'; // додаємо суфікс до значень осі y
					},
				}

			},
		},
		plugins: {
			legend: {
				display: false,
				position: 'top',
			},
			zoom: {
				pan: {
					enabled: true,
					mode: 'x', // Перетягування по обох осях (x і y)
					onPan: (event: any) => {
						// Const
						const chart = event.chart;
						const ticksX = chart.scales.x.getTicks(); // Отримуємо мітки на осі X
						const currentValueX = ticksX[2]?.value;
						const currentValueXString: string = new Date(currentValueX).toISOString().split('T')[0];
						// Перевіряємо, чи змінився currentValueX
						if (previousCurrentValueX !== currentValueXString) {
							previousCurrentValueX = currentValueXString; // Оновлюємо попереднє значення
							const currentValueColor = () => {
								chart.options.scales.x.ticks.color = (context: any) =>
									context.tick.value === currentValueX ? "black" : "gray";
							};
							// Run
							currentValueColor();
							props.getValue(currentValueXString)
							console.log('hi');
						}
					},
				},
				limits: {
					x: {
						min: firstDateXInSeconds - (1000 * 60 * 60 * 24 * 76),
						max: targetDateXInSeconds + (1000 * 60 * 60 * 24 * 76),
					},
					y: {
						min: 0,
						max: lastDataY + 100,
					},
				},
			},

		},
	};
	// Return
	return (
		<div>
			<div style={{width: '100%', height: '300px'}}>
				<Line ref={chartRef} data={chartJsState} options={options}/>
			</div>
		</div>
	);
});