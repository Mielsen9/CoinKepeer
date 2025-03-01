import React, {useRef} from "react";
import * as s from "./YellowCircle.module.scss";
import {DeleteButton} from "@/components/DeleteButton/DeleteButton";
import {ChangeButton} from "@/components/ChangeButton/ChangeButton";

// Type
type PropsType = {
	id: number,
	changeAnimation: string
	isShowChangeButtons: boolean
	handleShowChangeButtons: (boolean: boolean, func: () => void) => void;
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
		if (!p.isShowChangeButtons) {
			p.handleSetActiveYellowCircle(yellowCircleRef.current)
			p.handleActiveYellowCircleStart();
			p.handleShowChangeButtons(true, p.handleActiveYellowCircleEnd)
		}
	};
	const handleEnd = () => {
		p.handleActiveYellowCircleEnd()
		p.showChangeButtonsToggle(false);
	};
	const handleMoveDelete = () => {
		p.handleMoveMouse()
	};
	const removeCircleHandler = () => {
		p.removeCircle(p.id);
	}
		// Return
		return (
		<div className={`${s.yellowCircleConteiner} ${p.isShowChangeButtons ? p.changeAnimation : ""}`}
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
						<div>
							<DeleteButton top={0} right={0} onRemove={removeCircleHandler}/>
							<ChangeButton bottom={0} left={0}/>
						</div>
					)}
				</div>
			</div>
			<p className={s.yellowCircleCount}>count</p>
		</div>
		);
		});