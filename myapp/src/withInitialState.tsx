import { useEffect, useState } from "react"
import { AppState } from "./state/appStateReducer"
import { load } from "./api"

// HOC
// injected props in hoc
type InjectedProps = {
    initialState: AppState
}

// without injected porps
type PropsWithoutInjected<TBaseProps> = Omit<
    TBaseProps,
    keyof InjectedProps
>

export function withInitialState<TProps>(
    // wrapped component has fully props
    // InjectedProps is necessary to let TypeScript know that the wrapped component will accept the InjectedProps.
    WrappedComponent: React.ComponentType<
        PropsWithoutInjected<TProps> & InjectedProps
    >
) {
    return (props: PropsWithoutInjected<TProps>) => {
        const [initialState, setInitialState] = useState<AppState>({
            lists: [],
            draggedItem: null
        })
        const [isLoading, setIsLoading] = useState(true)
        const [error, setError] = useState<Error | undefined>()

        useEffect(() => {
            const fetchInitialState = async () => {
                try {
                    const data = await load()
                    setInitialState(data)
                } catch (e) {
                    if (e instanceof Error) {
                        setError(e)
                    }
                }
                setIsLoading(false)
            }
            fetchInitialState()
        }, [])

        if (isLoading) {
            return <div>Loading</div>
        }
        if (error) {
            return <div>{error.message}</div>
        }

        // InjectedProps take effect here, WrappedComponent know it can accpet initialState props
        return <WrappedComponent {...props} initialState={initialState} />

    }
}