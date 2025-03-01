import React, {useRef} from "react";
import * as s from "./YellowCircleTop.module.scss"
import {DeleteButton} from "@/components/DeleteButton/DeleteButton";
import {ChangeButton} from "@/components/ChangeButton/ChangeButton";
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
	// State
	const yellowCircleRef = useRef<HTMLDivElement | null>(null);
	// Logic
	const handleStart = () => {
		if (!p.isShowChangeButtons) {
			p.handleShowChangeButtons(true)
		}
	};
	const handleEnd = () => {
		p.toggleShowChangeButtons(false);
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