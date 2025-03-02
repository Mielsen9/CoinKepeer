import React, {MutableRefObject, useCallback, useEffect, useRef} from "react";
import * as s from "./YellowCircleTop.module.scss"
import {DeleteButton} from "@/components/DeleteButton/DeleteButton";
import {ChangeButton} from "@/components/ChangeButton/ChangeButton";
import {useAppDispatch, useAppSelector} from "@/state/hook";
import {isPressedHandler, selectIsPressed} from "@/features/animationCircle/circlesSlice";
// Type
type PropsType = {
	id: number,
	isPressedRef: MutableRefObject<boolean>,
	handlePress: (boolean: boolean) => void,
	isShowChangeButtons: boolean,
	handleShowChangeButtons: (boolean: boolean) => void,
	toggleShowChangeButtons: (boolean: boolean) => void,
	removeCircle: (id: number) => void,
};
// YellowCircleTop
export const YellowCircleTop: React.FC<PropsType> = React.memo((p) => {
	// Redux
	const dispatch = useAppDispatch();
	const isPressed= useAppSelector(selectIsPressed);
	// State
	const scaleCircle = useRef(1);
	const targetCircleRef = useRef<boolean>(false);
	const yellowCircleRef = useRef<HTMLDivElement | null>(null);
	const positionCircleRef: MutableRefObject<{x: number | null ; y: number | null}> = useRef({ x: null, y: null });
	const firstPositionCircleRef: MutableRefObject<{x: number | null ; y: number | null}> = useRef({ x: null, y: null });
	// Update position
	const updateCirclePosition = useCallback((
		position: string,
		scale: MutableRefObject<number>,
		coordinate: MutableRefObject<{x: number | null ; y: number | null}>,
		time: number,
	) => {
		if (yellowCircleRef.current) {
			const circle = yellowCircleRef.current;
			setTimeout(() => {
					circle.style.position = position;
				}, time
			)
			circle.style.left = `${coordinate.current.x}px`;
			circle.style.top = `${coordinate.current.y}px`;
			circle.style.transform = `translate(-50%, -50%) scale(${scale.current})`;
			circle.style.transition = 'transform 0.4s ease-out'
		}
	}, []);
	// useEffect to add firstPositionCircleRef
	useEffect(() => {
		if (yellowCircleRef.current) {
			const rect = yellowCircleRef.current.getBoundingClientRect();
			firstPositionCircleRef.current = { x: rect.left + 30, y: rect.top + 30}
		}
	}, []);
	useEffect(() => {
		// Рух миші
		const handleMouseMove = (e: MouseEvent | TouchEvent) => {
			if (targetCircleRef.current) {
				positionCircleRef.current = 'touches' in e
					? { x: e.touches[0].clientX, y: e.touches[0].clientY }
					: { x: e.clientX , y: e.clientY };
				updateCirclePosition("absolute", scaleCircle, positionCircleRef, 0);
			}
		};
		// Додаємо обробники подій для миші та сенсорних екранів
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('touchmove', handleMouseMove);
		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('touchmove', handleMouseMove);
		};
	}, [isPressed]);
	const handleStartAnimation = () => {
		targetCircleRef.current = true;
		scaleCircle.current = 1.2;
		if (yellowCircleRef.current !== null) {
			yellowCircleRef.current.style.transform = `translate(-50%, -50%) scale(${scaleCircle.current})`;
		}
	};
	const handleEndAnimation = () => {
		targetCircleRef.current = false;
		scaleCircle.current = 1;
		updateCirclePosition("inherit", scaleCircle, firstPositionCircleRef, 2000);
	};
	// Logic
	const handleStart = () => {
		//it don't work when change button visual
		if (!p.isShowChangeButtons) {
			p.handleShowChangeButtons(true);
			dispatch(isPressedHandler({position: true}));
			handleStartAnimation()
		}
	};
	const handleEnd = () => {
		p.toggleShowChangeButtons(false);
		dispatch(isPressedHandler({position: false}));
		handleEndAnimation()
	};
	const removeCircleHandler = () => {
		p.removeCircle(p.id);
	}
	// Return
	return (
		<div className={s.circle}
			 ref={yellowCircleRef}
			 onMouseDown={!('ontouchstart' in window) ? handleStart : undefined}
			 onMouseUp={!('ontouchstart' in window) ? handleEnd : undefined}
			 onTouchStart={'ontouchstart' in window ? handleStart : undefined}
			 onTouchEnd={'ontouchstart' in window ? handleEnd : undefined}
			 onTouchMove={(e) => {e.preventDefault();}}
		>
			{p.isShowChangeButtons && (
				<div>
					<DeleteButton top={0} right={0} onRemove={removeCircleHandler}/>
					<ChangeButton bottom={0} left={0}/>
				</div>
			)}
		</div>
	)
});