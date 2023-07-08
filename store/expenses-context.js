import { createContext, useReducer } from 'react'

const DUMMY_DATA = [
    {
        id: 'e1',
        date: new Date("2023-05-22"),
        description: 'Groceries',
        amount: 3899.88,
    },
    {
        id: 'e2',
        date: new Date("2023-05-25"),
        description: 'Estate Levy',
        amount: 1408.00,
    },
    {
        id: 'e3',
        date: new Date("2023-05-29"),
        description: 'Rases Soccer',
        amount: 980.00,
    },  
    {
        id: 'e4',
        date: new Date("2023-05-26"),
        description: 'Petrol',
        amount: 5577.25,
    },
    {
        id: 'e5',
        date: new Date("2023-05-25"),
        description: 'Gym Subscription',
        amount: 988.25,
    },
    {
        id: 'e6',
        date: new Date("2023-05-28"),
        description: 'Fentse',
        amount: 2500.00,
    },
    {
        id: 'e7',
        date: new Date("2023-05-22"),
        description: 'Groceries',
        amount: 3899.88,
    },
    {
        id: 'e8',
        date: new Date("2023-05-25"),
        description: 'Estate Levy',
        amount: 1408.00,
    },
    {
        id: 'e9',
        date: new Date("2023-05-29"),
        description: 'Rases Soccer',
        amount: 980.00,
    },  
    {
        id: 'e10',
        date: new Date("2023-06-29"),
        description: 'Petrol',
        amount: 5577.25,
    },
    {
        id: 'e11',
        date: new Date("2023-07-03"),
        description: 'Gym Subscription',
        amount: 988.25,
    },
    {
        id: 'e12',
        date: new Date("2023-07-05"),
        description: 'Fentse',
        amount: 2500.00,
    },
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({date, description, amount}) => {},
    deleteExpense: (id) => {},
    updateExpense: ( id, {date, description, amount} ) => {},
})

function expensesReducer(state, action) {

    switch(action.type) {

        case 'ADD': {
            const newId = new Date().toString() + Math.random().toString()
            return [ { ...action.payload, id: newId }, ...state ]  
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
        default: {
            return state
        }
    }
}

function ExpensesContextProvider({children}) {
    
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_DATA)

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
