import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "@/state/store";
// initialState
const initialState: CircleState= {
	yellowCircles: [],
	greenCircles: [],
}
// circlesSlice
const circlesSlice = createSlice({
	name: 'circles',
	initialState,
	reducers: {
		yellowCircleAdded(state) {
			const newCircle = {
				id: Date.now(),
			};
			state.yellowCircles.push(newCircle);
		},
		yellowCircleRemoved(state, action: PayloadAction<{ id: number }>) {
			const { id } = action.payload;
			state.yellowCircles = state.yellowCircles.filter((circle) => circle.id !== id);
		},
		greenCircleAdded(state, action: PayloadAction<{ id: number }>) {
			const { id } = action.payload;
			const newCircle = {
				id: id,
			};
			state.greenCircles.push(newCircle);
		},
		greenCircleRemoved(state, action: PayloadAction<{ id: number }>) {
			const { id } = action.payload;
			state.greenCircles = state.greenCircles.filter((circle) => circle.id !== id);
		},
	},
})
// Export
export const {yellowCircleAdded, yellowCircleRemoved, greenCircleAdded, greenCircleRemoved} = circlesSlice.actions
export default circlesSlice.reducer

export const selectYellowCircles = (state: RootState) => state.circles.yellowCircles;
export const selectGreenCircles = (state: RootState) => state.circles.greenCircles;
// export const selectTargetData = createSelector(
// 	[selectDatasets],
// 	(datasets) => {
// 		const firstDataset = datasets[0];
// 		return firstDataset.data[firstDataset.data.length - 1];
// 	}
// );