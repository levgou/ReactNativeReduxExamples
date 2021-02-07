import {createStore} from 'redux'

// Interface for the dummy api we use for fetching some data in this app
export interface User {
  id: number
  name: string
  username: string
}


/**
 *  The Redux boilerplate is consisted of:
 *
 *  1. action names enum - strings of acton names
 *  2. action types - interface that combine name and payload
 *  3. action factories - used in combination with dispatch, these create the actions
 *     and set all the defaults / derive the action from the factory inputs
 *  4. Action Type join - all action types joint - for easier type annotation
 *  5. Store state interface - this declares the structure of the state
 *  6. initial state =)
 *  7. reducer - this is the function that maps (action, old State) => new state
 *
 * */


/**
 *  Ways to interface with the store:
 *
 *  Components (See BasicReduxPage.tsx):
 *
 *  In order to read some part of the store state, you map state to props of the component
 *  In order to update the store, you add an action factory as a callable prop to your component
 *
 *
 *  Classes see controller.ts:
 *
 *  In order to read new state, you want to subscribe to the store, and fetch the fresh state upon update
 *  In order to update the store, one can use store.dispatch(actionFactory(p1, p2))
 *
 * */

// 1
export enum CounterActionTypes {
  INCREMENTED = 'counter/incremented',
  DECREMENTED = 'counter/decremented',
  SET_USERS = 'users/set',
  DEL_USERS = 'users/del',
}

// 2
interface IncrementCounterAction {
  type: typeof CounterActionTypes.INCREMENTED
}

interface DecrementCounterAction {
  type: typeof CounterActionTypes.DECREMENTED
}

interface SetUsersAction {
  type: CounterActionTypes.SET_USERS
  users: User[]
}

interface DelUsersAction {
  type: CounterActionTypes.DEL_USERS
}
// 2 --------

// 4
export type CounterActions = IncrementCounterAction | DecrementCounterAction | SetUsersAction | DelUsersAction

// 3
export function incrementCounter(): CounterActions {
  return {
    type: CounterActionTypes.INCREMENTED,
  }
}

export function decrementCounter(): CounterActions {
  return {
    type: CounterActionTypes.DECREMENTED,
  }
}

export function setUsers(users: User[]): CounterActions {
  console.log(`New users: ${users.length}`)
  return {
    type: CounterActionTypes.SET_USERS,
    users,
  }
}

export function delUsers(): CounterActions {
  return {
    type: CounterActionTypes.DEL_USERS,
  }
}
// 3 --------------

// 5
export interface AppState {
  value: number
  users: User[]
}

// 6
const initialState: AppState = {value: 0, users: []}

// 7
function counterReducer(state: AppState = initialState, action: CounterActions) {
  switch (action.type) {
    case CounterActionTypes.INCREMENTED:
      return {value: state.value + 1}
    case CounterActionTypes.DECREMENTED:
      return {value: state.value - 1}
    case CounterActionTypes.SET_USERS:
      return {value: state.value, users: action.users}
    case CounterActionTypes.DEL_USERS:
      return {...state, users: []}
    default:
      return state
  }
}

export const appStore = createStore(counterReducer)
