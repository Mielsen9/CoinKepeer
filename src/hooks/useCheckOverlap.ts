import {useEffect, useRef, useState} from "react";
// Тип для результату
export interface CheckOverlapResult {
	isOverlapping: boolean;
	checkOverlap: (greenX: number, greenY: number) => void;
}
// useCheckOverlap
export const useCheckOverlap = (): CheckOverlapResult => {
	const [isOverlapping, setIsOverlapping] = useState<boolean>(false);
	const mousePositionRef= useRef<{ x:number, y:number } | null>(null);
	const objectPositionRef= useRef<{ x:number, y:number } | null>(null);
	// Logic
	const checkOverlap = (greenX: number, greenY: number) => {
		objectPositionRef.current = {x: greenX, y: greenY}
	}
	// useEffect
	useEffect(() => {
		// Рух миші
		const handleMouseMove = (e: MouseEvent | TouchEvent) => {
			if (e instanceof MouseEvent) {
				const x = e.clientX;
				const y = e.clientY;
				mousePositionRef.current = { x: x, y: y }
			} else if (e instanceof TouchEvent) {
				// Отримуємо координати першого дотику
				const x = e.touches[0].clientX;
				const y = e.touches[0].clientY;
				mousePositionRef.current = { x: x, y: y }
			}
			if (mousePositionRef.current?.x  && mousePositionRef.current?.y && objectPositionRef.current?.x && objectPositionRef.current?.y) {
				const radius = 30;

				const greenCenterX = objectPositionRef.current?.x + radius;
				const greenCenterY = objectPositionRef.current?.y + radius;

				const dx = mousePositionRef.current?.x - greenCenterX;
				const dy = mousePositionRef.current?.y - greenCenterY;
				const distance = Math.sqrt(dx * dx + dy * dy);
				// Знайшли перетин
				if (distance < 60) {
					setIsOverlapping(true);
				} else {
					setIsOverlapping(false)
				}
			}
		};
		// Додаємо обробники подій для миші та сенсорних екранів
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('touchmove', handleMouseMove);
		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('touchmove', handleMouseMove);
		};
	}, []);
	// Return
	return {
		isOverlapping,
		checkOverlap
	}
};