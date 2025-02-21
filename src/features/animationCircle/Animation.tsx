import React, {useCallback, useEffect, useRef} from "react";
import * as s from "./Animation.module.scss"
import {YellowCircle} from "@/features/animationCircle/components/YellowCircle/YellowCircle";
import {GreenCircle} from "@/features/animationCircle/components/GrenCircle/GreenCircle";
import {useAppDispatch, useAppSelector} from "@/state/hook";

import {
	greenCircleAdded,
	greenCircleRemoved, selectGreenCircles,
	selectYellowCircles,
	yellowCircleAdded,
	yellowCircleRemoved
} from "@/features/animationCircle/circlesSlice";

import {useShowChangeButtons} from "@/hooks/useShowChangeButtons";
import {GenieForm} from "@/features/animationCircle/components/GenieForm/GenieForm";
import {useScroll} from "@/hooks/useScroll";

// Animation
export const Animation: React.FC = React.memo(() => {
	// Redux
	const dispatch = useAppDispatch();
	const yellowCircles= useAppSelector(selectYellowCircles);
	const greenCircles = useAppSelector(selectGreenCircles);
	// CircleRef-------------------------------------------------------------------------------------------
	const activeYellowCircleRef = useRef<HTMLDivElement | null>(null);
	const activeGreenCircleRef = useRef<HTMLDivElement | null>(null);
	// State
	const isPressed = useRef<boolean>(false);
	const isOverlapping = useRef<{ boolean: boolean; id: number }>({boolean: false, id: 0,});
	const greenCircleRefs = useRef<Map<number, React.RefObject<HTMLDivElement>>>(new Map());
	// State activeYellowCircleRef
	const scaleYellowCircle = useRef(1);
	const opacityYellowCircle = useRef(1);
	const positionYellowCircle = useRef<{ x: number | null ; y: number | null }>({ x: null, y: null });
	const firstPositionYellowCircle = useRef<{ x: number | null; y: number | null}>({ x: null, y:  null });
	// State activeGreenCircleRef
	const scaleGreenCircle = useRef(1);
	const translateYGreenCircle = useRef(0);
	const positionGreenCircle = useRef<{ x: number | null ; y: number | null }>({ x: null, y: null });

	// Handle isPress, isOverlapping
	const handlePress = useCallback((boolean: boolean) => {
		isPressed.current = boolean
	}, []);
	const handleIsOverlapping = useCallback((boolean: boolean, id: number) => {
		isOverlapping.current = {boolean: boolean, id: id}
	}, []);
	// Handler YellowCircle
	const handleActiveYellowCircleStart = () => {
		handlePress(true)
		if (activeYellowCircleRef.current) {
			const circlePos = activeYellowCircleRef.current.getBoundingClientRect();
			firstPositionYellowCircle.current = { x: circlePos.x + 30, y: circlePos.y + 30 };
			positionYellowCircle.current = { x: circlePos.x + 30, y: circlePos.y + 30 };
			const circle = activeYellowCircleRef.current;
			circle.style.position = `absolute`;
		}
		scaleYellowCircle.current = 1.2; // Збільшуємо масштаб
		updateActiveYellowCirclePosition()
	};
	const handleActiveYellowCircleEnd = () => {
		handlePress(false);
		animationLogic();
	};
	const addYellowCircle = useCallback(() => {
		dispatch(yellowCircleAdded());
	}, [dispatch]);
	const removeYellowCircle = useCallback((id: number) => {
		dispatch(yellowCircleRemoved({id}));
	}, [dispatch]);
	const handleSetActiveYellowCircle = useCallback((circleRef: HTMLDivElement | null) => {
		activeYellowCircleRef.current = circleRef;
	}, []);
	// Handler GreenCircle
	const addGreenCircle = useCallback(() => {
		const id = Date.now()
		dispatch(greenCircleAdded({id}));
		addActiveGreenCircleRef(id)
	}, [dispatch]);
	const addActiveGreenCircleRef = (id: number) => {
		if (!greenCircleRefs.current.has(id)) {
			greenCircleRefs.current.set(id, React.createRef());
		}
	};
	const handleSetActiveGreenCircles = (id: number) => {
		const activeRef = greenCircleRefs.current.get(id);
		if (activeGreenCircleRef.current) {
			const circleGreen = activeGreenCircleRef.current;
			const childCircleGreen = activeGreenCircleRef.current.querySelector<HTMLElement>(`.GreenCircle-module__greenCircle`);
			if (childCircleGreen) {
				translateYGreenCircle.current = 0;
				childCircleGreen.style.transform = `translateY(${translateYGreenCircle.current}px)`;
				childCircleGreen.style.transition =  'transform 0.3s ease-out';
			}
			scaleGreenCircle.current = 1;
			circleGreen.style.transform = `scale(${scaleGreenCircle.current})`;
			circleGreen.style.transition =  'transform 0.2s ease-out';
		}
		if (activeRef?.current) {
			activeGreenCircleRef.current = activeRef.current;
		}
	};
	const removeGreenCircle = useCallback((id: number) => {
		dispatch(greenCircleRemoved({id}));
	}, [dispatch]);
	// Logic
	useEffect(() => {
		// Рух миші
		const handleMouseMove = (e: MouseEvent | TouchEvent) => {
			if (isPressed.current) {
				positionYellowCircle.current = 'touches' in e
					? { x: e.touches[0].clientX, y: e.touches[0].clientY }
					: { x: e.clientX , y: e.clientY };
				updateActiveYellowCirclePosition();
				if (positionYellowCircle.current.x !== null && positionYellowCircle.current.y !== null) {
					checkOverlap(positionYellowCircle.current.x, positionYellowCircle.current.y)
				}
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
	// Відстеження перетину
	const checkOverlap = (yellowX: number, yellowY: number) => {
		if (greenCircleRefs.current.size > 0) {
			let overlappingGreenId: number | null = null;
			// Ітеруємо по Map
			const entries = Array.from(greenCircleRefs.current.entries());
			for (const [id, ref] of entries) {
				if (ref.current) {
					// Отримуємо координати зеленого кільця
					const greenX = ref.current.offsetLeft + 30;
					const greenY = ref.current.offsetTop + 220;

					const dx = yellowX - greenX;
					const dy = yellowY - greenY;
					const distance = Math.sqrt(dx * dx + dy * dy);

					// Знайшли перетин
					if (distance < 60) {
						overlappingGreenId = id;
						positionGreenCircle.current = {x: greenX, y: greenY};
						break; // Зупиняємо цикл
					}
				}
			}
			// Якщо є перетин і стан змінюється
			if (overlappingGreenId !== null) {
				if (!isOverlapping.current.boolean || isOverlapping.current.id !== overlappingGreenId) {
					handleIsOverlapping(true, overlappingGreenId);
					handleSetActiveGreenCircles(overlappingGreenId)
					animationLogic()
				}
			} else {
				// Якщо немає перетину і стан змінюється
				if (isOverlapping.current.boolean) {
					handleIsOverlapping(false, isOverlapping.current.id);
					animationLogic()
				}
			}
		} else {
			console.log("greenCircles is empty or not an array");
		}
	}
	// Оновлення позиції activeYellowCircle
	const updateActiveYellowCirclePosition = useCallback(() => {
		if (activeYellowCircleRef.current) {
			const circle = activeYellowCircleRef.current;
			circle.style.left = `${positionYellowCircle.current.x}px`;
			circle.style.top = `${positionYellowCircle.current.y}px`;
			circle.style.transform = `translate(-50%, -50%) scale(${scaleYellowCircle.current})`;
		}
	}, []);
	// Logic Animation
	const animationLogic = () => {
		const optionFirstPositionYellowCircle = () => {
			if (activeYellowCircleRef.current) {
				const circleYellow = activeYellowCircleRef.current;
				positionYellowCircle.current = firstPositionYellowCircle.current;
				updateActiveYellowCirclePosition()
				opacityYellowCircle.current = 1;
				scaleYellowCircle.current = 1;
				circleYellow.style.opacity = `${opacityYellowCircle.current}`;
				circleYellow.style.transform = `translate(-50%, -50%) scale(${scaleYellowCircle.current})`;
				setTimeout(() => {
					circleYellow.style.transition =  'transform 0.3s ease-out';
					circleYellow.style.position = `inherit`;
				}, 500);
			}
		}
		if (activeGreenCircleRef.current && activeYellowCircleRef.current) {
			// State
			const circleYellow = activeYellowCircleRef.current;
			const circleGreen = activeGreenCircleRef.current;
			const childCircleGreen = activeGreenCircleRef.current?.querySelector<HTMLElement>(`.GreenCircle-module__greenCircle`);
			// Logic
			const translateYGreenCircleFunc = (Y: number) => {
				translateYGreenCircle.current = Y;
				if (childCircleGreen) {
					childCircleGreen.style.transform = `translateY(${translateYGreenCircle.current}px)`;
					childCircleGreen.style.transition =  'transform 0.3s ease-out';
				}
			}
			const scaleGreenCircleFunc = (N: number) => {
				scaleGreenCircle.current = N;
				if (childCircleGreen) {
					circleGreen.style.transform = `scale(${scaleGreenCircle.current})`;
					circleGreen.style.transition =  'transform 0.2s ease-out';
				}
			}
			const scaleYellowCircleFunc = (N: number) => {
				scaleYellowCircle.current  = N;
				circleYellow.style.transform = `translate(-50%, -50%) scale(${scaleYellowCircle.current})`;
			}
			const opacityYellowCircleFunc = (N: number) => {
				opacityYellowCircle.current = N;
				circleYellow.style.opacity = `${opacityYellowCircle.current}`;
			}
			// Якщо перетин є і відпускаємо кільце
			if (!isPressed.current && isOverlapping.current.boolean) {
				positionYellowCircle.current = {x: positionGreenCircle.current.x, y: positionGreenCircle.current.y};
				updateActiveYellowCirclePosition()
				scaleYellowCircleFunc(0.9)
				circleYellow.style.transition =  'transform 0.3s ease-out,scale 3.0s ease-out, left 0.4s ease-out, top 0.4s ease-out';
				setTimeout(() => {
					opacityYellowCircleFunc(0)
					circleYellow.style.transition =  'transform 0.3s ease-out';
					translateYGreenCircleFunc(0)
				}, 650);
				setTimeout(() => {
					scaleGreenCircleFunc(1)
					handleIsOverlapping(false, isOverlapping.current.id);
				}, 1000);
				setTimeout(() => {
					optionFirstPositionYellowCircle()
				}, 1500);
			}
			// Якщо перетин немає і відпускаємо кільце
			if (!isPressed.current && !isOverlapping.current.boolean) {
				optionFirstPositionYellowCircle()
				circleYellow.style.transition = 'transform 0.3s ease-out, left 0.5s ease-out, top 0.5s';
			}
			// Якщо перетину немає
			if (!isOverlapping.current.boolean) {
				translateYGreenCircleFunc(0)
				scaleGreenCircleFunc(1)
			}
			// Якщо перетину є
			if (isOverlapping.current.boolean && isPressed.current) {
				translateYGreenCircleFunc(72)
				scaleGreenCircleFunc(1.2)
			}
		}else {
			optionFirstPositionYellowCircle()
		}
	}
	// try
	const {isShowChangeButtons, handleShowChangeButtons, handleMoveMouse, showChangeButtonsToggle} = useShowChangeButtons();
	const {scrollContainerRef, scrollHeight} = useScroll({ content: greenCircles });
	// Return
	return (
		<div className={s.animationContainer}>
			<div className={s.yellowCircleConteiner}>
				{yellowCircles.map((circle: { id: number }) => (
					<YellowCircle key={circle.id}
								  id={circle.id}
								  changeAnimation={s.rotate}
								  isShowChangeButtons={isShowChangeButtons}
								  handleShowChangeButtons={handleShowChangeButtons}
								  handleMoveMouse={handleMoveMouse}
								  showChangeButtonsToggle={showChangeButtonsToggle}
								  handleSetActiveYellowCircle={handleSetActiveYellowCircle}
								  handleActiveYellowCircleStart={handleActiveYellowCircleStart}
								  handleActiveYellowCircleEnd={handleActiveYellowCircleEnd}
								  removeCircle={removeYellowCircle}
					/>
				))}
				<button className={s.bug} onClick={addYellowCircle}>
					Add
				</button>
			</div>
			<div className={s.greenCircleConteiner}
				 ref={scrollContainerRef}>
				{greenCircles.map((circle: {id: number}) => (
					<GreenCircle key={circle.id}
								 id={circle.id}
								 changeAnimation={s.rotate}
								 isShowChangeButtons={isShowChangeButtons}
								 handleShowChangeButtons={handleShowChangeButtons}
								 ref={greenCircleRefs.current.get(circle.id)}
								 removeCircle={removeGreenCircle}
					/>
				))}
				<div className={s.bug}></div>
					<GenieForm greenCircleLength={greenCircles.length}
							   addGreenCircle={addGreenCircle}
							   scrollHeight={scrollHeight}
					/>
			</div>
			<button className={`${s.completeButton} ${isShowChangeButtons ? s.changeAnimation : ""}`}
					onClick={!('ontouchstart' in window) ? () => handleShowChangeButtons(false) : undefined}
					onTouchEnd={'ontouchstart' in window ? () => handleShowChangeButtons(false) : undefined}
			>
				Complete
			</button>
		</div>
	);
});
