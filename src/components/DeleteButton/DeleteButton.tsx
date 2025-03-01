import React from "react";
import * as s from "./DeleteButton.module.scss"
// Type
type PropsType = {
	top?: number,
	left?: number,
	right?: number,
	bottom?: number,
	onRemove: () => void;
};
//
export const DeleteButton: React.FC<PropsType> = React.memo((p) => {
	// Return
	return (
		<button className={s.delete}
				onMouseUp={p.onRemove}
				style={{
					top: p.top !== undefined ? `${p.top}px` : undefined,
					left: p.left !== undefined ? `${p.left}px` : undefined,
					right: p.right !== undefined ? `${p.right}px` : undefined,
					bottom: p.bottom !== undefined ? `${p.bottom}px` : undefined,
				}}
		>
			x
		</button>
	)
});