import React, {useState} from 'react';
import * as s from "./genieForm.module.scss";
// Type
type GenieFormPropsType = {
	greenCircleLength?: number;
};
//
export const GenieForm: React.FC<GenieFormPropsType> = React.memo((p) => {
	const [isClicked, setIsClicked] = useState(false);
	let bottom = "10px";

	const handleClick = () => {
		setIsClicked(!isClicked); // Змінюємо стан
	};

	// Return
	return (
		<div className={`${s.genieFormButton} ${isClicked ? s.active : ""}`}
			 style={{bottom: bottom}}
			 onClick={handleClick}>
			{/*<span className={s.close}></span>*/}
		</div>
	)
});