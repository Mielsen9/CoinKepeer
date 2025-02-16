import React from "react";
import * as s from "./InfiLine.module.scss"
// Type
type PropsType = {

};
// InfoLine
export const InfoLine: React.FC<PropsType> = React.memo((p) => {

	// Return
	return (
		<div className={s.infoLineConteiner}>
			<p>menu</p>
			<div>
				<p className={s.count}>Total</p>
			</div>
			<p>add</p>
		</div>
	)
});