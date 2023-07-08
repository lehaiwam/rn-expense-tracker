import { StyleSheet, Text, View } from 'react-native'
import React, {useContext} from 'react'
import ExpensesOutput from '../components/expenses/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext)

  return (
    <View style={styles.container}>
      <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total"/>
    </View>
  )
}

export default AllExpenses

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent:'center',
        alignItems: 'center',
    }
})