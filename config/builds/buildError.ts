import webpack, { Configuration } from "webpack";

export function buildError(config: Configuration): void {
	webpack(config, (err, stats) => {
		// Обробка фатальних помилок Webpack
		if (err) {
			console.error('Фатальна помилка:', err.stack || err);
			if ((err as any).details) {
				console.error('Деталі:', (err as any).details);
			}
			return;
		}

		if (!stats) {
			console.error('Статистика недоступна');
			return;
		}

		const info = stats.toJson();

		// Обробка помилок компіляції
		if (stats.hasErrors()) {
			console.error('Помилки компіляції:', info.errors);
		}

		// Обробка попереджень компіляції
		if (stats.hasWarnings()) {
			console.warn('Попередження компіляції:', info.warnings);
		}

		// Логування результатів компіляції
		console.log('Компіляція завершена успішно!');
	});
}
