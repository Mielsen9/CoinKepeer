import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "@/state/store";
// initialState
const initialState: CircleState= {
	yellowCircles: [],
	greenCircles: [],
	isPressed: false,
	isOverlapping: { boolean: false, position:{x: null , y: null}}
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
		isPressedHandler(state, action: PayloadAction<{ position: boolean }>) {
			const { position } = action.payload;
			state.isPressed = position;
		},
		isOverlappingHandler(state, action: PayloadAction<{ boolean: boolean, position:{x: number | null , y: number | null}}>) {
			const { boolean, position } = action.payload;
			state.isOverlapping = { boolean: boolean, position:{x: position.x , y: position.y}};

		},
	},
})
// Export
export const {
	yellowCircleAdded,
	yellowCircleRemoved,
	greenCircleAdded,
	greenCircleRemoved,
	isPressedHandler,
	isOverlappingHandler,
} = circlesSlice.actions
export default circlesSlice.reducer

export const selectYellowCircles = (state: RootState) => state.circles.yellowCircles;
export const selectGreenCircles = (state: RootState) => state.circles.greenCircles;
export const selectIsPressed = (state: RootState) => state.circles.isPressed;
export const selectIsOverlapping = (state: RootState) => state.circles.isOverlapping;
// export const selectTargetData = createSelector(
// 	[selectDatasets],
// 	(datasets) => {
// 		const firstDataset = datasets[0];
// 		return firstDataset.data[firstDataset.data.length - 1];
// 	}
// );