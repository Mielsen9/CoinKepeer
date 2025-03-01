import React from "react";
import * as s from "./CircleName.module.scss"
// Type
type PropsType = {

};
// CircleName
export const CircleName: React.FC<PropsType> = React.memo((p) => {

	// Return
	return (
		<p className={s.circleName}>name</p>
	)
});