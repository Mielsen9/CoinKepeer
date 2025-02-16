import React from "react";
import * as s from "./App.module.scss";


import {ExpensesButton} from "@/components/ExpensesButton/ExpensesButton";
import {ChairJs} from "@/features/chairjs/ChairJs";
import {Animation} from "@/features/animationCircle/Animation";
import {InfoLine} from "@/features/infoLine/InfoLine";
// Type

// App
export const App = () => {
    // State

    // Logic

    // Return
    return (
        <div>
            <InfoLine/>
            <div className={s.mainBlock}>
                <Animation/>
                <ChairJs/>
            </div>
            <ExpensesButton/>
        </div>
    );
};
