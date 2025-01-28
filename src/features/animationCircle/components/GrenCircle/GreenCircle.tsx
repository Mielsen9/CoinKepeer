import React, {forwardRef,} from "react";
import * as s from "./GreenCircle.module.scss"
// Type
type PropsType = {
	id: number
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
		<div className={s.relativeConteiner}>
			<div className={s.greenCircleBack}
				 ref={ref}
			>
				<div className={s.greenCircle}
				>O
				</div>

				<span className={s.yellowInGreen}></span>

				<button className={s.delete}
						onMouseDown={removeCircleHandler}
				>x
				</button>

			</div>
		</div>
	)
});