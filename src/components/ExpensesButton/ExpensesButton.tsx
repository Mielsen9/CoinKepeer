import React, {useState} from "react";
import * as s from "./ExpensesButton.module.scss";

type ExpensesButtonProps = {};
export const ExpensesButton = (props: ExpensesButtonProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const toggleHeight = () => {
		setIsExpanded((prev) => !prev); // Перемикання висоти
	};
	return (
		<div className={`${s.expensesConteiner} ${isExpanded ? s.expanded : ""}`}
			 onClick={toggleHeight}>
			<p className={s.expensesButton}>Expenses</p>
			<div>
				<div className={s.data}>
					<p>4 лютого 2025</p>
				</div>
				<div className={s.expenses}>
					<div >
						<p>From</p>
						<p>To</p>
					</div>
					<div >
						<p>count</p>
					</div>
				</div>
				<div className={s.calculation}>
					<div >
						<p>balance</p>
						<p>suma</p>
					</div>
					<div>
						<p>Total</p>
						<p>suma</p>
					</div>
				</div>
			</div>
		</div>
	);
};
// <div className={s.expenses}>
// 	<div className={s.from}>
// 		<p>From</p>
// 		<p>To</p>
// 	</div>
// 	<div className={s.count}>
// 		<p>count</p>
// 	</div>
// </div>
// <div className={s.calculation}>
// 	<div className={s.balance}>
// 		<p>balance</p>
// 		<p>suma</p>
// 	</div>
// 	<div className={s.total}>
// 		<p>Total</p>
// 		<p>suma</p>
// 	</div>