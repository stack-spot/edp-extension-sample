
import { useCallback, useEffect, useRef, useState } from 'react'
import { Route, CitronNavigator, AnyRouteWithParams } from '@stack-spot/citron-navigator'
import { ContextualizedRoute, NavigationClauses, VoidOrPromise } from '@stack-spot/citron-navigator/dist/types'
import { LinkedList } from '@stack-spot/citron-navigator/dist/LinkedList'
import { compareRouteKeysDesc } from '@stack-spot/citron-navigator/dist/utils'



interface RouteParams {
    'root': void,
    'root.component': { id: string },
    'root.modal': void
}



class RootRoute extends Route<undefined, RouteParams['root']> {
    constructor() {
        super(
            'root',
            '/', undefined,
            {},
        )
    }

    component = new ComponentRoute(this)
    modal = new ModalRoute(this)
}



class ComponentRoute extends Route<RootRoute, RouteParams['root.component']> {
    constructor(parent: RootRoute) {
        super(
            'root.component',
            '/component/{id}', parent,
            { id: 'string' },
        )
    }


}



class ModalRoute extends Route<RootRoute, RouteParams['root.modal']> {
    constructor(parent: RootRoute) {
        super(
            'root.modal',
            '/modal', parent,
            {},
        )
    }


}


export const root = new RootRoute()
export const navigator = CitronNavigator.create(root as unknown as Route, true)


const routeByKey: RouteByKey = {
    'root': root,
    'root.component': root.component,
    'root.modal': root.modal
}



interface RouteByKey {
    'root': RootRoute,
    'root.component': ComponentRoute,
    'root.modal': ModalRoute
}


export type ViewPropsOf<T extends keyof RouteParams> = RouteParams[T] extends void
    ? { route: RouteByKey[T] }
    : { route: ContextualizedRoute<RouteByKey[T], RouteParams[T]>, params: RouteParams[T] }

interface NavigationContext {
    when: <T extends keyof RouteParams>(key: T | T[], handler: (props: ViewPropsOf<T>) => VoidOrPromise) => NavigationContext,
    whenSubrouteOf: <T extends keyof RouteParams>(key: T | T[], handler: (props: ViewPropsOf<T>) => VoidOrPromise) => NavigationContext,
    otherwise: (handler: () => VoidOrPromise) => NavigationContext,
    whenNotFound: (handler: (path: string) => VoidOrPromise) => NavigationContext,
}

function buildContext(clauses: NavigationClauses) {
    const context: NavigationContext = {
        when: (key, handler) => {
            const keys = Array.isArray(key) ? key : [key]
            keys.forEach(k => clauses.when[k] = handler)
            return context
        },
        whenSubrouteOf: (key, handler) => {
            const keys = Array.isArray(key) ? key : [key]
            keys.forEach(k => clauses.whenSubrouteOf.push({ key: k, handler }))
            return context
        },
        otherwise: (handler) => {
            if (clauses.otherwise) {
                console.warn('Navigation: "otherwise" has been set more than once for the hook "useNavigationContext". Only the last handler will take effect.')
            }
            clauses.otherwise = handler
            return context
        },
        whenNotFound: (handler) => {
            if (clauses.otherwise) {
                console.warn('Navigation: "whenNotFound" has been set more than once for the hook "useNavigationContext". Only the last handler will take effect.')
            }
            clauses.whenNotFound = handler
            return context
        },
    }
    return context
}

export function useNavigationContext(navigationHandler: (context: NavigationContext) => void, deps?: any[]) {
    const queue = useRef<(() => VoidOrPromise)[]>([])
    const consumer = useRef<Promise<void> | undefined>()

    const runEveryHandlerInQueue = useCallback(async () => {
        while (queue.current.length) {
            const handler = queue.current.shift()
            await handler?.()
        }
        consumer.current = undefined
    }, [])

    const consume = useCallback(() => {
        consumer.current ??= runEveryHandlerInQueue()
        return consumer.current
    }, [])

    useEffect(() => {
        const clauses: NavigationClauses = { when: {}, whenSubrouteOf: new LinkedList(compareRouteKeysDesc) }
        navigationHandler(buildContext(clauses))
        const stopListeningToRouteChanges = navigator.onRouteChangeAsync(async (route, params) => {
            const when = Object.keys(clauses.when).find(
                key => route.$is(key),
            )
            if (when) queue.current.push(() => clauses.when[when]({ route, params }))
            else {
                const whenSubroute = clauses.whenSubrouteOf.find(
                    ({ key }) => route.$isSubrouteOf(key),
                )
                if (whenSubroute) {
                    queue.current.push(() => whenSubroute.handler({ route: routeByKey[whenSubroute.key as keyof RouteByKey], params }))
                }
                else if (clauses.otherwise) queue.current.push(clauses.otherwise)
            }
            await consume()
        })
        const stopListeningToNotFoundEvents = clauses.whenNotFound ? navigator.onNotFound(clauses.whenNotFound) : undefined
        return () => {
            stopListeningToRouteChanges()
            stopListeningToNotFoundEvents?.()
        }
    }, [])

    useEffect(() => {
        navigator.updateRoute()
    }, deps ?? [])

    return navigationHandler
}

interface RouteData<T extends keyof RouteParams> {
    route: AnyRouteWithParams<Partial<RouteParams[T]>>,
    params: Partial<RouteParams[T]>,
}

export function useRouteData<T extends keyof RouteParams>(_key?: T): RouteData<T> {
    const [data, setData] = useState<RouteData<any>>({ route: navigator.currentRoute ?? root as any, params: navigator.currentParams })
    useEffect(() => navigator.onRouteChange((route, params) => setData({ route, params })), [])
    return data as RouteData<T>
}
