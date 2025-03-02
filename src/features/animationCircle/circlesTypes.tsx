interface CircleState {
	yellowCircles: CirclePointX[],
	greenCircles: CirclePointY[],
	isPressed: boolean,
}
type CirclePointX = {
	id: number;
}
type CirclePointY = {
	id: number;
}