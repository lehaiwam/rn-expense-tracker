import { createContext, useReducer } from 'react'

export const ExpensesContext = createContext({
    expenses: [],
    fetchExpenses: ([])=>{},
    addExpense: ({date, description, amount}) => {},
    deleteExpense: (id) => {},
    updateExpense: ( id, {date, description, amount} ) => {},
})

function expensesReducer(state, action) {

    switch(action.type) {

        case 'ADD': {
            // const newId = new Date().toString() + Math.random().toString()
            return [ { ...action.payload }, ...state ]  
        }
        
        case 'UPDATE': {
            const targetIndex = state.findIndex( (expense) => {
                return expense.id === action.payload.id
            })
            const targetExpense = state[targetIndex]
            const updatedExpense = { ...targetExpense, ...action.payload.data }
            const newExpensesState = [...state]
            newExpensesState[targetIndex] = updatedExpense
            return newExpensesState
        }
        case 'DELETE': {
            return state.filter( (expense) => {
                return expense.id !== action.payload
            })           
        }
        case 'FETCH': {
            const inverted = action.payload.reverse()
            return inverted
        }
        default: {
            return state
        }
    }
}

function ExpensesContextProvider({children}) {
    
    const [expensesState, dispatch] = useReducer(expensesReducer, [])

    const fetchExpenses = (expensesData) => {
        dispatch({ type: 'FETCH', payload: expensesData})
    }

    const addExpense = (expenseData) => {
        dispatch({ type: 'ADD', payload: expenseData})
    }

    const deleteExpense = (id) => {
        dispatch({type:'DELETE', payload: id})
    }
    
    const updateExpense = (tranId, expenseData) => {
        dispatch({ type: 'UPDATE', payload: { id: tranId, data: expenseData } })
    }
    
    const value = {
        expenses: expensesState,
        fetchExpenses: fetchExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    }

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )   
}

export default ExpensesContextProvider
