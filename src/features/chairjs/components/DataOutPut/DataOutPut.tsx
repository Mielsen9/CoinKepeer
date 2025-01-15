import React from "react";
import * as s from "./DataOutPut.module.scss";

// Type
type DataOutPutProps = {
	inCome: number | string | undefined;
	spent: number | string | undefined;
};
// DataOutPut
export const DataOutPut = React.memo((props: DataOutPutProps) => {
	const {inCome, spent} = props;
	// Return
	return (
		<div className={s.conteinerGrey}>
			<p>Доходи - {inCome}</p>
			<p>Розходи - {spent}</p>
		</div>
	)
});
