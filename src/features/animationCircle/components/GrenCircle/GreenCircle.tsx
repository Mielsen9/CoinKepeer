import React, {forwardRef} from "react";
import * as s from "./GreenCircle.module.scss"
import {DeleteButton} from "@/components/DeleteButton/DeleteButton";
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
	const handleStart = () => {
		p.handleShowChangeButtons(true)
	};
	const removeCircleHandler = () => {
		p.removeCircle(p.id);
	}
	// Return
	return (
		<div className={`${s.relativeConteiner} ${p.isShowChangeButtons ? p.changeAnimation : ""}`}>
			<p>name</p>

			<div className={s.greenCircleBack}
				 ref={ref}
			>
				<div className={s.greenCircle}
					 onMouseDown={!('ontouchstart' in window) ? handleStart : undefined}
					 onTouchStart={'ontouchstart' in window ? handleStart : undefined}>
					O
				</div>

				<span className={s.yellowInGreen}></span>

			</div>
			{p.isShowChangeButtons && (
				<div>
					<DeleteButton top={25} right={0} onRemove={removeCircleHandler}/>
					<button className={s.change}>
						i
					</button>
				</div>
			)}

			<p>count</p>
		</div>
	)
});