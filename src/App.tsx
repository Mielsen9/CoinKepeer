import React from "react";
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
            <Animation/>
            <ChairJs/>
            <ExpensesButton/>
        </div>
    );
};
