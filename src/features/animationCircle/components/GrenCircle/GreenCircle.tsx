import React, {forwardRef} from "react";
import * as s from "./GreenCircle.module.scss"
import {DeleteButton} from "@/components/DeleteButton/DeleteButton";
import {ChangeButton} from "@/components/ChangeButton/ChangeButton";
import {CircleName} from "@/components/CircleName/CircleName";
import {CircleCount} from "@/components/CircleCount/CircleCount";
import {GreenCircleTop} from "@/features/animationCircle/components/GrenCircle/GreenCircleTop/GreenCircleTop";
// Type
type PropsType = {
	id: number
	changeAnimation: string
	isShowChangeButtons: boolean
	handleShowChangeButtons: (boolean: boolean) => void
	removeCircle: (id: number) => void
};
// GreenCircle
export const GreenCircle = forwardRef<HTMLDivElement, PropsType>((p, ref) => {
	// Logic
	const removeCircleHandler = () => {
		p.removeCircle(p.id);
	}
	// Return
	return (
		<div className={`${s.relativeConteiner} ${p.isShowChangeButtons ? p.changeAnimation : ""}`}>
			<CircleName/>
			<div className={s.greenCircleBack}
				 ref={ref}
				>
				<GreenCircleTop handleShowChangeButtons={p.handleShowChangeButtons}/>
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
