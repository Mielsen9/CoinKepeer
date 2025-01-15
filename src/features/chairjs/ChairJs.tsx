import React, {useCallback, useState} from 'react';
import {Diagram} from "@/chairjs/components/Diagram";
import {useAppSelector} from "@/state/hook";
import {selectInComeMoney, selectSpentMoney} from "@/chairjs/chairJsSlice";
import {DataOutPut} from "@/chairjs/components/DataOutPut/DataOutPut";

export const  ChairJs= () => {
	const inComeMoney = useAppSelector(selectInComeMoney);
	const spentMoney = useAppSelector(selectSpentMoney);
	const [income, setIncome] = useState<number | string | undefined>("Немає даних");
	const [spent, setSpent] = useState<number | string | undefined>("Немає даних");
	// Logic
	const getValue = useCallback((value: string) => {
		// inComeMoney
		const currentInComeMoney = inComeMoney.find((point: DataPoint) => {
			return point.x === value;
		});
		const inComeValue: number | undefined = currentInComeMoney?.y;
		setIncome(inComeValue !== undefined ? inComeValue : "Немає даних");
		// spentMoney
		const currentSpentMoney = spentMoney.find((point: DataPoint) => {
			return point.x === value;
		});
		const spentValue: number | undefined = currentSpentMoney?.y;
		setSpent(spentValue !== undefined ? spentValue : "Немає даних");
	}, []);
	// Return
	return (
		<div>
			<Diagram getValue={getValue}/>
			<DataOutPut inCome={income} spent={spent}/>
		</div>
	)
};