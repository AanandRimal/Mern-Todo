import { TodosContext } from "../context/TodosContext"
import { useContext } from "react"

export const useTodosContext = () => {
  const context = useContext(TodosContext)

  if(!context) {
    throw Error('useTodosContext must be used inside a TodosContextProvider')
  }

  return context
}