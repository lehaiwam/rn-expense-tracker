import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ExpensesSummary = ({expenses, expensesPeriod }) => {
    // console.log('ExpensesSummary() expensesPeriod: ', expensesPeriod)
    // console.log('expenses: ', expenses)

    const expensesSum = expenses.reduce(( sum, expenseItem )=> {
        return sum + expenseItem.amount
    }, 0)

    return (
        <View style={ styles.summaryContainer }>
            <Text style={ styles.periodDescription }>{ expensesPeriod }</Text>
            <Text  style={ styles.totalAmount }>R { expensesSum.toFixed(2) }</Text>
        </View>
    )
}

export default ExpensesSummary

const styles = StyleSheet.create({
    summaryContainer: {
        backgroundColor: '#b4b4ed',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    periodDescription: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    }
})