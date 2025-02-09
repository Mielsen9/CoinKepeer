import React from "react";
import * as s from "./InfiLine.module.scss"
// Type
type PropsType = {

};
// InfoLine
export const InfoLine: React.FC<PropsType> = React.memo((p) => {

	// Return
	return (
		<div>
			<p>menu</p>
			<div>
				<p>Total</p>
			</div>
			<p>add</p>
		</div>
	)
});