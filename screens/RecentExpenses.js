import { useContext, useEffect, useState } from "react"
import { Text } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import ErrorOverlay from "../components/UI/ErrorOverlay"
import LoadingOverlay from "../components/UI/LoadingOverlay"
import { ExpenseContext } from "../store/expense-context"
import { getDateinusDays } from "../util/date"
import { fetchExpenses } from "../util/http"

function RecentExpenses(){
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState()
    const expensesCtx = useContext(ExpenseContext)
    // const [fetchedExpenses, setFetchedExpenses] = useState([])
    useEffect(()=>{
        async function getExpenses(){
          setIsFetching(true)
          try {
            const expenses = await fetchExpenses();
            expensesCtx.setExpenses(expenses)
          } catch (error) {
            setError('Could not fetch Expesens!')
          }
          setIsFetching(false)
        }

        getExpenses()
    },[])



    if(error && !isFetching){
        return <ErrorOverlay message={error} />
    }

    if(isFetching){
        return <LoadingOverlay/>
    }

    const recentExpenses = expensesCtx.expenses.filter((expense)=>{
        const today = new Date()
        const date7DaysAgo = getDateinusDays(today, 7)

        return (expense.date >= date7DaysAgo) && (expense.date <= today)
    })
    return <ExpensesOutput expenses={recentExpenses} expensesPeriod='Last 7 Days' fallBackText= 'No expenses For the last 7 days' />
}
export default RecentExpenses