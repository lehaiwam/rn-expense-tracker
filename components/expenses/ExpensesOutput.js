import { StyleSheet, View } from 'react-native'
import React from 'react'
import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import NoExpensesContent from './NoExpensesContent'
import { GlobalStyles } from '../../constants/styles'


const ExpensesOutput = ({ expenses, expensesPeriod }) => {

    const numberOfExpItems = expenses.length

    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} expensesPeriod={expensesPeriod} />
            { 
                (numberOfExpItems > 0 ) ? 
                    <ExpensesList expenses={expenses} /> :
                    <NoExpensesContent />
            }
        </View>
    )
}

export default ExpensesOutput

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: GlobalStyles.colors.primary700,
        padding: 16,
    }
})