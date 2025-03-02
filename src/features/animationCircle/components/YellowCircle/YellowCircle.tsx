import React, {MutableRefObject} from "react";
import * as s from "./YellowCircle.module.scss";
import {CircleName} from "@/components/CircleName/CircleName";
import {CircleCount} from "@/components/CircleCount/CircleCount";
import {YellowCircleTop} from "@/features/animationCircle/components/YellowCircle/YellowCircleTop/YellowCircleTop";

// Type
type PropsType = {
	id: number,
	changeAnimation: string
	isPressedRef: MutableRefObject<boolean>,
	handlePress: (boolean: boolean) => void,
	isShowChangeButtons: boolean
	handleShowChangeButtons: (boolean: boolean) => void;
	handleMoveMouse: () => void
	toggleShowChangeButtons: (boolean: boolean) => void
	removeCircle: (id: number) => void,
}
// YellowCircleTop
export const YellowCircle: React.FC<PropsType> = React.memo((p) => {
	// Logic
	const handleMoveDelete = () => {
		p.handleMoveMouse()
	};
	// Return
	return (
		<div className={`${s.yellowCircleConteiner} ${p.isShowChangeButtons ? p.changeAnimation : ""}`}
			 onMouseMove={handleMoveDelete}
			 onTouchMove={handleMoveDelete}
			>
			<CircleName/>
			<div className={s.relativeConteiner}>
				<YellowCircleTop id={p.id}
				                 isPressedRef={p.isPressedRef}
				                 handlePress={p.handlePress}
								 isShowChangeButtons={p.isShowChangeButtons}
								 handleShowChangeButtons={p.handleShowChangeButtons}
								 toggleShowChangeButtons={p.toggleShowChangeButtons}
								 removeCircle={p.removeCircle}/>
			</div>
			<CircleCount/>
		</div>
	);
});