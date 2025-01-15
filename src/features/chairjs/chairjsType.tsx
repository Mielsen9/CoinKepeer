interface ChairJsState {
	datasets: Dataset[];
}
type Dataset = {
	label: string;
	data: DataPoint[];
	borderColor: string;
	backgroundColor: string;
	fill: boolean;
	tension: number;
}
type DataPoint = {
	x: string; // Дата у вигляді рядка
	y: number; // Числове значення
}





