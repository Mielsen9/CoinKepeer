interface CircleState {
	yellowCircles: CirclePointX[],
	greenCircles: CirclePointY[],
	isPressed: boolean,
	isOverlapping: { boolean: boolean, position:{x: number | null , y: number | null}},
}
type CirclePointX = {
	id: number;
}
type CirclePointY = {
	id: number;
}