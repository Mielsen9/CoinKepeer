import { useState, useRef, useCallback } from 'react';

export const useShowChangeButtons = () => {
	const [isShowChangeButtons, setIsShowChangeButtons] = useState(false); // Стан для відображення блоку
	const toggleShowChangeButtonsRef = useRef<boolean>(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	// Логіка для встановлення таймера та показу кнопок
	const handleShowChangeButtons = useCallback((boolean: boolean) => {
		if (boolean) {
			toggleShowChangeButtonsRef.current = true;

			// Якщо вже є активний таймер — очищаємо його перед новим запуском
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				if (toggleShowChangeButtonsRef.current) {
					setIsShowChangeButtons(true);
				}
			}, 2000);
		} else {
			setIsShowChangeButtons(false);
			toggleShowChangeButtonsRef.current = false;
			// Очищуємо таймер, якщо він ще не виконався
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		}
	}, []);

	// Логіка для скидання таймера при русі
	const handleMoveMouse = useCallback(() => {
		if (toggleShowChangeButtonsRef.current) {
			toggleShowChangeButtonsRef.current = false; // Вимикаємо таймер
			// Очищуємо таймер при русі миші
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
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