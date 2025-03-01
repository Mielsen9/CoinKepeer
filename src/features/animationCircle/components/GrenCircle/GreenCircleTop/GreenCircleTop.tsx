import React from "react";
import * as s from "./GreenCircleTop.module.scss"
// Type
type PropsType = {
	handleShowChangeButtons: (boolean: boolean) => void,
};
// GreenCircleTop
export const GreenCircleTop: React.FC<PropsType> = React.memo((p) => {
	// Logic
	const handleStart = () => {
		p.handleShowChangeButtons(true)
	};
	// Return
	return (
		<div className={s.greenCircle}
		     onMouseDown={!('ontouchstart' in window) ? handleStart : undefined}
		     onTouchStart={'ontouchstart' in window ? handleStart : undefined}>
			O
		</div>
	)
});