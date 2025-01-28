import React from "react";
import {SavedMoneyArea} from "@/components/SavedMoneyArea/SavedMoneyArea";
import {SpendMoneyArea} from "@/components/SpendMoneyArea/SpendMoneyArea";
import {ExpensesButton} from "@/components/ExpensesButton/ExpensesButton";
import {ChairJs} from "@/features/chairjs/ChairJs";
import {Animation} from "@/features/animationCircle/Animation";


// Type

// App
export const App = () => {
    // State

    // Logic

    // Return
    return (
        <div>
            <Animation/>
            <ChairJs/>
            <ExpensesButton/>
        </div>
    );
};
