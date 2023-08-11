import { useReducer } from "react"

type CalcState = {
    count: number
}

type CalcAction = {
    type: "increment" | "decrement"
}
const countReducers = (state: CalcState, action: CalcAction) => {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 }
        case "decrement":
            return { count: state.count - 1 }
        default:
            throw new Error()
    }
}

const increment = (): CalcAction => ({ type: "increment" })
const decrement = (): CalcAction => ({ type: "decrement" })

export const Calc = () => {
    const [initState, dispatch] = useReducer(countReducers, { count: 0 })
    return (
        <>
            <span>{initState.count}</span>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </>
    )
}