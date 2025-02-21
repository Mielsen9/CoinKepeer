import { useRef } from "react";

type LongPressHandlers = {
	onMouseDown?: () => void;
	onMouseUp?: () => void;
	onMouseLeave?: () => void;
	onTouchStart?: () => void;
	onTouchEnd?: () => void;
};
export const useLongPress = (callback: () => void, delay: number = 2000): LongPressHandlers => {
	const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const startPress = () => {
		holdTimer.current = setTimeout(callback, delay);
	};

	const cancelPress = () => {
		if (holdTimer.current) {
			clearTimeout(holdTimer.current);
			holdTimer.current = null;
		}
	};

	return {
		onMouseDown: !("ontouchstart" in window) ? startPress : undefined,
		onMouseUp: !("ontouchstart" in window) ? cancelPress : undefined,
		onMouseLeave: !("ontouchstart" in window) ? cancelPress : undefined,
		onTouchStart: "ontouchstart" in window ? startPress : undefined,
		onTouchEnd: "ontouchstart" in window ? cancelPress : undefined,
	}
};