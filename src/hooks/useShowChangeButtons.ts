import { useState, useRef, useCallback } from 'react';

export const useShowChangeButtons = () => {
	const [isShowChangeButtons, setIsShowChangeButtons] = useState(false); // Стан для відображення блоку
	const showChangeButtonsToggleRef = useRef<boolean>(false);

	// Логіка для встановлення таймера та показу кнопок
	const handleShowChangeButtons = useCallback((boolean: boolean) => {
		if (boolean) {
			showChangeButtonsToggleRef.current = true; // Встановлюємо значення у true
			setTimeout(() => {
				if (showChangeButtonsToggleRef.current) {
					setIsShowChangeButtons(true); // Показуємо кнопки
				}
			}, 2000);
		} else {
			setIsShowChangeButtons(false); // Ховаємо кнопки
		}
	}, []);

	// Логіка для скидання таймера при русі
	const handleMoveMouse = useCallback(() => {
		if (showChangeButtonsToggleRef.current) {
			showChangeButtonsToggleRef.current = false; // Вимикаємо таймер
		}
	}, []);

	// Логіка для прямого перемикання значення
	const showChangeButtonsToggle = useCallback((boolean: boolean) => {
		showChangeButtonsToggleRef.current = boolean;
	}, []);

	// Повертаємо всі методи та стан
	return {
		isShowChangeButtons,
		handleShowChangeButtons,
		handleMoveMouse,
		showChangeButtonsToggle,
	};
};