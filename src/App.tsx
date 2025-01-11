import React from "react";
import {SavedMoneyArea} from "@/components/SavedMoneyArea/SavedMoneyArea";
import {SpendMoneyArea} from "@/components/SpendMoneyArea/SpendMoneyArea";
import {ExpensesButton} from "@/components/ExpensesButton/ExpensesButton";


// Type

// App
export const App = () => {
    // State

    // Logic

    // Return
    return (
        <div>
            <SavedMoneyArea/>

            <SpendMoneyArea/>
            <SpendMoneyArea/>
            <SpendMoneyArea/>
            <SpendMoneyArea/>

            <ExpensesButton/>
        </div>
    );
};
