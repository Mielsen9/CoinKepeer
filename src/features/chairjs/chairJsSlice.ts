import { createSlice } from '@reduxjs/toolkit'
import {RootState} from "@/state/store";
// initialState
const initialState: ChairJsState= {
	datasets: [
		{
			label: 'InCome',
			data: [
				{ x: '2023-01-31', y: 65 },
				{ x: '2023-02-28', y: 59 },
				{ x: '2023-03-31', y: 80 },
				{ x: '2023-04-30', y: 40 },
				{ x: '2023-05-31', y: 50 },
				{ x: '2023-06-30', y: 60 },
			],
			borderColor: 'green',
			backgroundColor: 'green',
			fill: false,
			tension: 0.3,
		},
		{
			label: 'Spent',
			data: [
				{ x: '2023-01-31', y: 80 },
				{ x: '2023-02-28', y: 50 },
				{ x: '2023-03-31', y: 70 },
				{ x: '2023-04-30', y: 60 },
				{ x: '2023-05-31', y: 85 },
				{ x: '2023-06-30', y: 75 },
			],
			borderColor: 'red',
			backgroundColor: 'red',
			fill: false,
			tension: 0.3,
		},
	],
}
// chairJsSlice
const chairJsSlice = createSlice({
	name: 'chairJs',
	initialState,
	reducers: {

	},
})
// Export
export const { } = chairJsSlice.actions
export default chairJsSlice.reducer
export const selectChartJsState = (state: RootState): ChairJsState => state.chairJs;
export const selectFirstData = (state: RootState): DataPoint => state.chairJs.datasets[0].data[0];
export const selectTargetData = (state: RootState): DataPoint => state.chairJs.datasets[0].data[state.chairJs.datasets[0].data.length - 1];
export const selectInComeMoney = (state: RootState): DataPoint[] => state.chairJs.datasets[0].data;
export const selectSpentMoney = (state: RootState): DataPoint[] => state.chairJs.datasets[1].data;