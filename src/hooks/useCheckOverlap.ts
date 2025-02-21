import {MutableRefObject, RefObject, useRef} from "react";
// Type
type PropsType = {
	greenCircleRefs: MutableRefObject<Map<number, RefObject<HTMLDivElement>>>,
};
// useCheckOverlap
export const useCheckOverlap = (p:PropsType) => {
	// Ref
	const positionGreenCircle = useRef<{ x: number | null ; y: number | null }>({ x: null, y: null });
	const overlappingGreenId = useRef<number | null>(null);
	// Logic
	const checkOverlap = (yellowX: number, yellowY: number) => {
		// Відстеження перетину
		if (p.greenCircleRefs.current.size > 0) {
			// Ітеруємо по Map
			const entries = Array.from(p.greenCircleRefs.current.entries());
			for (const [id, ref] of entries) {
				if (ref.current) {
					// Отримуємо координати зеленого кільця
					const greenX = ref.current.offsetLeft + 30;
					const greenY = ref.current.offsetTop + 220;

					const dx = yellowX - greenX;
					const dy = yellowY - greenY;
					const distance = Math.sqrt(dx * dx + dy * dy);
					// Знайшли перетин
					if (distance < 60) {
						overlappingGreenId.current = id;
						positionGreenCircle.current = {x: greenX, y: greenY};
						break;
					}
				}
			}
		} else {
			console.log("greenCircles is empty or not an array");
		}

	}
	// Return
	return {
		positionGreenCircle,
		overlappingGreenId,
		checkOverlap
	}

};