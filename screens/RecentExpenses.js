import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ExpensesOutput from '../components/expenses/ExpensesOutput'
import { ExpensesContext }  from '../store/expenses-context'
import { getDateMinusDays } from '../util/date'

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext)

  const MINUS_DAYS = 7
  const today = new Date()
  const dateSevenDaysAgo = getDateMinusDays(today, MINUS_DAYS)

  const recentExpenses = expensesCtx.expenses.filter ((expense) => {
    return expense.date > dateSevenDaysAgo
  })

  return (
    <View style={styles.container}>
      <ExpensesOutput expenses={ recentExpenses } expensesPeriod={ "Last 7 days" } />
    </View>
  )
}

export default RecentExpenses

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent:'center',
        alignItems: 'center',
    }
})