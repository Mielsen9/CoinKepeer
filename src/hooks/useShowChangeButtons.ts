import { useState, useRef, useCallback } from 'react';

export const useShowChangeButtons = () => {
	const [isShowChangeButtons, setIsShowChangeButtons] = useState(false); // Стан для відображення блоку
	const toggleShowChangeButtonsRef = useRef<boolean>(false);
	// Логіка для встановлення таймера та показу кнопок
	const handleShowChangeButtons = useCallback((boolean: boolean, func?: () => void) => {
		if (boolean) {
			toggleShowChangeButtonsRef.current = true; // Встановлюємо значення у true
			setTimeout(() => {
				if(func && toggleShowChangeButtonsRef.current) {
					func();
				}
			}, 1500);
			setTimeout(() => {
				if (toggleShowChangeButtonsRef.current) {
					setIsShowChangeButtons(true); // Показуємо кнопки
				}
			}, 2000);
		} else {
			setIsShowChangeButtons(false); // Ховаємо кнопки
		}
	}, []);

	// Логіка для скидання таймера при русі
	const handleMoveMouse = useCallback(() => {
		if (toggleShowChangeButtonsRef.current) {
			toggleShowChangeButtonsRef.current = false; // Вимикаємо таймер
		}
	}, []);

	// Логіка для прямого перемикання значення
	const toggleShowChangeButtons = useCallback((boolean: boolean) => {
		toggleShowChangeButtonsRef.current = boolean;
	}, []);

	// Повертаємо всі методи та стан
	return {
		isShowChangeButtons,
		handleShowChangeButtons,
		handleMoveMouse,
		toggleShowChangeButtons,
	};
};