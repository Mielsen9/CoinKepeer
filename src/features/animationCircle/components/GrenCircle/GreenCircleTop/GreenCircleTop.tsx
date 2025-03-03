import React, {useEffect, useRef} from "react";
import * as s from "./GreenCircleTop.module.scss"
import {useAppSelector} from "@/state/hook";
import {selectIsOverlapping} from "@/features/animationCircle/circlesSlice";
// Type
type PropsType = {
	handleShowChangeButtons: (boolean: boolean) => void,
	isOverlap: boolean,
};
// GreenCircleTop
export const GreenCircleTop: React.FC<PropsType> = React.memo((p) => {
	// Redux
	const isOverlapping= useAppSelector(selectIsOverlapping);
	// Ref
	const translateGreenCircleRef = useRef<number>(0);
	const greenCircleTopRef = useRef<HTMLDivElement | null>(null);
	// Logic
	useEffect(() => {
		const circleGreenTop = greenCircleTopRef.current;
		if (circleGreenTop) {
			if (isOverlapping.boolean && p.isOverlap) {
				translateGreenCircleRef.current = 72;
				circleGreenTop.style.transform = `translateY(${translateGreenCircleRef.current}px)`;
				circleGreenTop.style.transition =  'transform 0.4s ease-out';
			}
			if (!isOverlapping.boolean) {
				translateGreenCircleRef.current = 0;
				circleGreenTop.style.transform = `translateY(${translateGreenCircleRef.current}px)`;
				circleGreenTop.style.transition =  'transform 0.4s ease-out';
			}
		}
	}, [isOverlapping.boolean]);
	const handleStart = () => {
		p.handleShowChangeButtons(true)
	};
	// Return
	return (
		<div className={s.greenCircle}
		     ref={greenCircleTopRef}
		     onMouseDown={!('ontouchstart' in window) ? handleStart : undefined}
		     onTouchStart={'ontouchstart' in window ? handleStart : undefined}>
			O
		</div>
	)
});