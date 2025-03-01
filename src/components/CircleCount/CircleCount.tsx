import React from "react";
import * as s from "./CircleCount.module.scss"
// Type
type PropsType = {

};
// CircleCount
export const CircleCount: React.FC<PropsType> = React.memo((p) => {

	// Return
	return (
		<p className={s.circleCount}>count</p>
	)
});