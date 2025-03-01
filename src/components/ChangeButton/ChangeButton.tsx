import React from "react";
import * as s from "./ChangeButton.module.scss"
// Type
type PropsType = {
	top?: number,
	left?: number,
	right?: number,
	bottom?: number,
	onChange?: () => void;
};
// ChangeButton
export const ChangeButton: React.FC<PropsType> = React.memo((p) => {

	// Return
	return (
		<button className={s.change}
				onMouseUp={p.onChange}
				style={{
					top: p.top !== undefined ? `${p.top}px` : undefined,
					left: p.left !== undefined ? `${p.left}px` : undefined,
					right: p.right !== undefined ? `${p.right}px` : undefined,
					bottom: p.bottom !== undefined ? `${p.bottom}px` : undefined,
				}}
		>
			i
		</button>
	)
});