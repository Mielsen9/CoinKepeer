import React, {useRef} from "react";
import * as s from "./YellowCircle.module.scss";
import {useLongPress} from "@/hooks/useLongPress";
// Type
type PropsType = {
	id: number,
	isShowChangeButtons: boolean
	handleShowChangeButtons: (boolean: boolean) => void;
	handleMoveMouse: () => void
	showChangeButtonsToggle: (boolean: boolean) => void
	handleSetActiveYellowCircle: (circleRef: HTMLDivElement | null) => void,
	handleActiveYellowCircleStart: () => void,
	handleActiveYellowCircleEnd: () => void,
	removeCircle: (id: number) => void,
}
// YellowCircle
export const YellowCircle: React.FC<PropsType> = React.memo((p) => {
	// State
	const yellowCircleRef = useRef<HTMLDivElement | null>(null);
	// Logic
	const handleStart = () => {
		p.handleSetActiveYellowCircle(yellowCircleRef.current)
		p.handleActiveYellowCircleStart();
		p.handleShowChangeButtons(true)
	};
	const handleEnd = () => {
		p.handleActiveYellowCircleEnd()
		p.showChangeButtonsToggle(true);
	};
	const handleMoveDelete = () => {
		p.handleMoveMouse()
	};
	const removeCircleHandler = () => {
		p.removeCircle(p.id);
	}
		// Return
		return (
		<div className={s.yellowCircleConteiner}
			 onMouseMove={handleMoveDelete}
			 onTouchMove={handleMoveDelete}>
			<p className={s.yellowCircleName}>name</p>
			<div className={s.relativeConteiner}>
				<div className={s.circle}
					 ref={yellowCircleRef}
					 onMouseDown={!('ontouchstart' in window) ? handleStart : undefined}
					 onMouseUp={!('ontouchstart' in window) ? handleEnd : undefined}
					 onTouchStart={'ontouchstart' in window ? handleStart : undefined}
					 onTouchEnd={'ontouchstart' in window ? handleEnd : undefined}>
					{p.isShowChangeButtons && (
						<button className={s.delete}
								onMouseDown={removeCircleHandler}>
							x
						</button>
					)}
				</div>
			</div>
			<p className={s.yellowCircleCount}>count</p>
		</div>
		);
		});