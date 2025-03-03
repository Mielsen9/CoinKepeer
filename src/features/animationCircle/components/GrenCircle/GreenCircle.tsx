import React, {MutableRefObject, useEffect, useRef} from "react";
import * as s from "./GreenCircle.module.scss"
import {DeleteButton} from "@/components/DeleteButton/DeleteButton";
import {ChangeButton} from "@/components/ChangeButton/ChangeButton";
import {CircleName} from "@/components/CircleName/CircleName";
import {CircleCount} from "@/components/CircleCount/CircleCount";
import {GreenCircleTop} from "@/features/animationCircle/components/GrenCircle/GreenCircleTop/GreenCircleTop";
import {useCheckOverlap} from "@/hooks/useCheckOverlap";
import {useAppDispatch, useAppSelector} from "@/state/hook";
import {isOverlappingHandler, selectIsOverlapping, selectIsPressed} from "@/features/animationCircle/circlesSlice";
// Type
type PropsType = {
	id: number,
	changeAnimation: string,
	isShowChangeButtons: boolean,
	handleShowChangeButtons: (boolean: boolean) => void,
	removeCircle: (id: number) => void,
};
// GreenCircle
export const GreenCircle: React.FC<PropsType> = React.memo((p) => {
	// Redux
	const dispatch = useAppDispatch();
	const isPressed= useAppSelector(selectIsPressed);
	const isOverlapping= useAppSelector(selectIsOverlapping);
	// Ref
	const scaleGreenCircleRef = useRef<number>(1);
	const greenCircleRef = useRef<HTMLDivElement | null>(null);
	const positionCircleRef: MutableRefObject<{x: number | null ; y: number | null}> = useRef({ x: null, y: null });
	// Hook ------------------------------------------------------------------------------------------------------------
	const {isOverlap, checkOverlap} = useCheckOverlap();
	// useEffect checkOverlap
	useEffect(() => {
		if (greenCircleRef.current && isPressed) {
			const rect = greenCircleRef.current.getBoundingClientRect();
			const x = rect.left;
			const y = rect.top;
			checkOverlap(x, y)
			positionCircleRef.current = { x: x, y: y }
		}
	}, [isPressed]);
	useEffect(() => {
		if (isOverlap) {
			dispatch(isOverlappingHandler({
				boolean: true,
				position: {x: positionCircleRef.current.x, y: positionCircleRef.current.y}
			}))
		}
		if (!isOverlap) {
			dispatch(isOverlappingHandler({
				boolean: false,
				position: {x: null, y: null}
			}))
		}
	}, [isOverlap]);
	// useEffect change animation
	useEffect(() => {
		if (greenCircleRef.current ) {
			const circleGreen = greenCircleRef.current;
			if (isOverlapping.boolean && isOverlap) {
				scaleGreenCircleRef.current = 1.2;
				circleGreen.style.transform = `scale(${scaleGreenCircleRef.current})`;
				circleGreen.style.transition = 'transform 0.4s ease-out';
			}
			if (!isOverlapping.boolean) {
				scaleGreenCircleRef.current = 1;
				if(isPressed) {
					circleGreen.style.transform = `scale(${scaleGreenCircleRef.current})`;
					circleGreen.style.transition = 'transform 0.4s ease-out';
				}else {
					setTimeout(() => {
						circleGreen.style.transform = `scale(${scaleGreenCircleRef.current})`;
						circleGreen.style.transition = 'transform 0.4s ease-out';
					},400)
				}
			}
		}
	}, [isOverlapping.boolean, isOverlap, isPressed]);
	// Logic
	const removeCircleHandler = () => {
		p.removeCircle(p.id);
	}
	// Return
	return (
		<div className={`${s.relativeConteiner} ${p.isShowChangeButtons ? p.changeAnimation : ""}`}>
			<CircleName/>
			<div className={s.greenCircleBack}
			     ref={greenCircleRef}
				>
				<GreenCircleTop handleShowChangeButtons={p.handleShowChangeButtons}
				                isOverlap={isOverlap}/>
				<span className={s.yellowInGreen}></span>
			</div>
			{p.isShowChangeButtons && (
				<div>
					<DeleteButton top={25} right={0} onRemove={removeCircleHandler}/>
					<ChangeButton bottom={25} left={0}/>
				</div>
			)}
			<CircleCount/>
		</div>
	)
});
