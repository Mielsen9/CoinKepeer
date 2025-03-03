import React, {MutableRefObject, useCallback, useEffect, useRef} from "react";
import * as s from "./YellowCircleTop.module.scss"
import {DeleteButton} from "@/components/DeleteButton/DeleteButton";
import {ChangeButton} from "@/components/ChangeButton/ChangeButton";
import {useAppDispatch, useAppSelector} from "@/state/hook";
import {isOverlappingHandler, isPressedHandler, selectIsOverlapping} from "@/features/animationCircle/circlesSlice";
import {logDOM} from "@testing-library/react";
// Type
type PropsType = {
	id: number,
	isShowChangeButtons: boolean,
	handleShowChangeButtons: (boolean: boolean) => void,
	toggleShowChangeButtons: (boolean: boolean) => void,
	removeCircle: (id: number) => void,
};
// YellowCircleTop
export const YellowCircleTop: React.FC<PropsType> = React.memo((p) => {
	// Redux
	const dispatch = useAppDispatch();
	const isOverlapping= useAppSelector(selectIsOverlapping);
	// State
	const targetCircleRef = useRef<boolean>(false);
	const yellowCircleRef = useRef<HTMLDivElement | null>(null);
	const positionCircleRef: MutableRefObject<{x: number | null ; y: number | null}> = useRef({ x: null, y: null });
	const positionGreenCircleRef: MutableRefObject<{x: number | null ; y: number | null}> = useRef({ x: null, y: null });
	const firstPositionCircleRef: MutableRefObject<{x: number | null ; y: number | null}> = useRef({ x: null, y: null });
	// Update position
	const updateCirclePosition = useCallback((
		use: "up" | "down" | "overlap",
		coordinate: MutableRefObject<{x: number | null ; y: number | null}>,
	) => {
		if (yellowCircleRef.current) {
			let timeout1, timeout2;
			const circle = yellowCircleRef.current;
			if (use === "up") {
				circle.style.position = "absolute";
				circle.style.opacity = "1"
				circle.style.transform = `translate(-50%, -50%) scale(1.2)`;
				circle.style.transition = "transform 0.4s ease-out"
			}
			if (use === "down") {
				circle.style.opacity = "1"
				circle.style.transform = `translate(-50%, -50%) scale(1)`;
				circle.style.transition = "transform 0.5s ease-out, left 0.5s ease-out, top 0.5s ease-out";
				clearTimeout(timeout1);
				clearTimeout(timeout2);

				timeout1 = setTimeout(() => {
					circle.style.position = "inherit";
				}, 650);
			}
			if (use === "overlap") {
				circle.style.transform = `translate(-50%, -50%) scale(0.89)`;
				circle.style.transition = "transform 0.5s ease-out, left 0.5s ease-out, top 0.5s ease-out";
				clearTimeout(timeout1);
				clearTimeout(timeout2);

				timeout1 = setTimeout(() => {
					circle.style.opacity = "0";
					circle.style.position = "inherit";
				}, 500);

				timeout2 = setTimeout(() => {
					circle.style.opacity = "1";
					circle.style.transform = `translate(-50%, -50%) scale(1)`;
					circle.style.transition = "transform 0.5s ease-out, opacity 0.5s ease-out";
				}, 1200);
			}
			circle.style.left = `${coordinate.current.x}px`;
			circle.style.top = `${coordinate.current.y}px`;
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
			e.preventDefault();
			if (targetCircleRef.current) {
				positionCircleRef.current = 'touches' in e
					? { x: e.touches[0].clientX, y: e.touches[0].clientY }
					: { x: e.clientX , y: e.clientY };
				updateCirclePosition("up", positionCircleRef);
			}
		};
		// Додаємо обробники подій для миші та сенсорних екранів
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('touchmove', handleMouseMove);
		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('touchmove', handleMouseMove);
		};
	}, []);
	const handleStartAnimation = () => {
		targetCircleRef.current = true;
		if(yellowCircleRef.current) {
			yellowCircleRef.current.style.transform = `translate(-50%, -50%) scale(1.2)`;
		}
	};
	const handleEndAnimation = () => {
		targetCircleRef.current = false;
		if(isOverlapping.boolean) {
			if(isOverlapping.position.x !== null && isOverlapping.position.y !== null) {
				positionGreenCircleRef.current = {x: isOverlapping.position.x + 30, y: isOverlapping.position.y + 30}
			}
			updateCirclePosition("overlap", positionGreenCircleRef);
		}
		if(!isOverlapping.boolean) {
			updateCirclePosition("down", firstPositionCircleRef);
		}
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
		setTimeout(() => {
			dispatch(isOverlappingHandler({
				boolean: false,
				position: {x: null, y: null}
			}))
		},600)
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
			 // onTouchMove={(e) => {e.preventDefault();}}
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