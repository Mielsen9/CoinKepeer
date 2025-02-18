import React, {forwardRef} from "react";
import * as s from "./GreenCircle.module.scss"
import {useLongPress} from "@/hooks/useLongPress";
// Type
type PropsType = {
	id: number
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
		<div className={s.relativeConteiner}>
			<p>name</p>

			<div className={s.greenCircleBack}
				 ref={ref}
			>
				<div className={s.greenCircle}
					 onMouseDown={!('ontouchstart' in window) ? handleStart : undefined}
					 onTouchStart={'ontouchstart' in window ? handleStart : undefined}>
					O
					{p.isShowChangeButtons && (
						<button className={s.delete}
								onMouseDown={removeCircleHandler}
						>x
						</button>
					)}
				</div>

				<span className={s.yellowInGreen}></span>

			</div>

			<p>count</p>
		</div>
	)
});