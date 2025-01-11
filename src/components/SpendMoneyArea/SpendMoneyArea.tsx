import React from "react";
import * as s from "./SpendMoneyArea.module.scss";
import {SpendMoney} from "@/components/SpendMoney/SpendMoney";

type SpendMoneyAreaProps = {

};
export const SpendMoneyArea = (props: SpendMoneyAreaProps) => {

	return (
		<div className={s.spendMoneyConteiner}>
			<SpendMoney/>
			<SpendMoney/>
			<SpendMoney/>
			<SpendMoney/>
		</div>
	)
};