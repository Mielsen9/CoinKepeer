import React from "react";
import * as s from "./ExpensesButton.module.scss";

type ExpensesButtonProps = {

};
export const ExpensesButton = (props: ExpensesButtonProps) => {

	return (
		<div className={s.expensesButton}>
			<p>Expenses</p>
		</div>
	)
};