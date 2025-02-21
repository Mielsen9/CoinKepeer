import React, {useEffect, useRef, useState} from 'react';
import * as s from "./genieForm.module.scss";
// Type
type GenieFormPropsType = {
	greenCircleLength?: number;
	addGreenCircle: () => void;
	scrollHeight: number;
};
//
export const GenieForm: React.FC<GenieFormPropsType> = React.memo((p) => {
	const [isClicked, setIsClicked] = useState(false);
	const [scrollHeight, setScrollHeight] = useState<number>(260);

	useEffect(() => {
		if (p.scrollHeight) {
			setScrollHeight(p.scrollHeight - 95);
		}
	}, [p.scrollHeight]);

	const handleClick = () => {
		setIsClicked(!isClicked); // Змінюємо стан
		p.addGreenCircle()
	};
	// Return
	// ${isClicked ? s.active : ""}
	return (
		<div className={`${s.genieFormButton}`}
			 style={{top: `${scrollHeight}px`}}
			 onClick={handleClick}>
			{/*<span className={s.close}></span>*/}
		</div>
	)
});