import React from "react";
import {SavedMoney} from "@/components/SavedMoney/SavedMoney";
import * as s from "./SavedMoneyArea.module.scss";

type SavedMoneyAreaProps = {

};
export const SavedMoneyArea = (props: SavedMoneyAreaProps) => {

	return (
		<div className={s.savedMoneyConteiner}>
			<SavedMoney/>
			<SavedMoney/>
			<SavedMoney/>
			<SavedMoney/>
		</div>
	)
};