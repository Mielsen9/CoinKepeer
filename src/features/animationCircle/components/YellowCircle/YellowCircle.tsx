import React, {useRef} from "react";
import * as s from "./YellowCircle.module.scss";
// Type
type PropsType = {
	id: number,
	handleSetActiveYellowCircle: (circleRef: HTMLDivElement | null) => void,
	handleActiveYellowCircleStart: () => void,
	handleActiveYellowCircleEnd: () => void,
	removeCircle: (id: number) => void,
}
// YellowCircle
export const YellowCircle: React.FC<PropsType> = React.memo((p) => {
	// State
	const yellowCircleRef = useRef<HTMLDivElement | null>(null);
	// Logic
	const handleStart = () => {
		p.handleSetActiveYellowCircle(yellowCircleRef.current)
		p.handleActiveYellowCircleStart();
	};
	const handleEnd = () => {
		p.handleActiveYellowCircleEnd()
	};
	const removeCircleHandler = () => {
		p.removeCircle(p.id);
	}
	// Return
	return (
			<div className={s.yellowCircleConteiner}>
				<p className={s.yellowCircleName}>name</p>
				<div className={s.relativeConteiner}>
					<div
						className={s.circle}
						ref={yellowCircleRef}
						onMouseDown={!('ontouchstart' in window) ? handleStart : undefined}
						onMouseUp={!('ontouchstart' in window) ? handleEnd : undefined}
						onTouchStart={'ontouchstart' in window ? handleStart : undefined}
						onTouchEnd={'ontouchstart' in window ? handleEnd : undefined}
					>
						<button className={s.delete}
								onMouseDown={removeCircleHandler}
						>x</button>
					</div>
				</div>
				<p className={s.yellowCircleCount}>count</p>
			</div>
	);
});