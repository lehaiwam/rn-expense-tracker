import { StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ExpensesOutput from '../components/expenses/ExpensesOutput'
import { ExpensesContext }  from '../store/expenses-context'
import { getDateMinusDays } from '../util/date'
import { hostGetExpenses } from '../util/http'
import LoadingOverlay from '../UI/loadingoverlay/LoadingOverlay'
import ErrorOverlay from '../UI/erroroverlay/ErrorOverlay'

const RecentExpenses = () => {
  const [systemError, setSystemError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const expensesCtx = useContext(ExpensesContext)

  useEffect(() => {
    const getExpenses = async () => {
      setIsLoading(true)
      try {
        const expenses = await hostGetExpenses()
        setIsLoading(false)
        expensesCtx.fetchExpenses(expenses)
      } catch(err) {
        setSystemError('Failed attempt to fetch data from the host!\n\n' + err.name + ': ' + err.message)
      }
      setIsLoading(false)
    }

    setTimeout(getExpenses, 2000);
    //getExpenses()
  
  }, [])

  const MINUS_DAYS = 7
  const today = new Date()
  const dateSevenDaysAgo = getDateMinusDays(today, MINUS_DAYS)

  const recentExpenses = expensesCtx.expenses.filter ((expense) => {
    return expense.date > dateSevenDaysAgo
  })

  const errorHandler = () => {
    setSystemError(null)
  }

  if (isLoading) {
    return (
      <LoadingOverlay msg={'Please be patient. Getting your data ...'}/> 
    )
  }

  if (systemError) {
    return (
      <ErrorOverlay msg={systemError} onAcknowledgeError={errorHandler}/> 
    )
  }

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