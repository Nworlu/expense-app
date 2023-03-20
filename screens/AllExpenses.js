import { useContext } from "react"
import { Text } from "react-native"
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { ExpenseContext } from "../store/expense-context"

function AllExpenses(){
    const expensesCtx = useContext(ExpenseContext)
    return <ExpensesOutput fallBackText='No expenses found' expenses={expensesCtx.expenses} expensesPeriod='Total' />
}
export default AllExpenses
