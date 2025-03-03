import React, {useCallback} from "react";
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
import {shallowEqual} from "react-redux";

// Animation
export const Animation: React.FC = React.memo(() => {
	console.log("Animation")
	// Redux
	const dispatch = useAppDispatch();
	const yellowCircles= useAppSelector(selectYellowCircles, shallowEqual);
	const greenCircles = useAppSelector(selectGreenCircles, shallowEqual);
	// Handler YellowCircle --------------------------------------------------------------------------------------------
	const addYellowCircle = useCallback(() => {
		dispatch(yellowCircleAdded());
	}, [dispatch]);
	const removeYellowCircle = useCallback((id: number) => {
		dispatch(yellowCircleRemoved({id}));
	}, [dispatch]);
	// Handler GreenCircle----------------------------------------------------------------------------------------------
	const addGreenCircle = useCallback(() => {
		const id = Date.now()
		dispatch(greenCircleAdded({id}));
	}, [dispatch]);
	const removeGreenCircle = useCallback((id: number) => {
		dispatch(greenCircleRemoved({id}));
	}, [dispatch]);
	// Hook ------------------------------------------------------------------------------------------------------------
	const {scrollContainerRef, scrollHeight} = useScroll({ content: greenCircles });
	const {isShowChangeButtons, handleShowChangeButtons, handleMoveMouse, toggleShowChangeButtons} = useShowChangeButtons();
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
								  toggleShowChangeButtons={toggleShowChangeButtons}
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
