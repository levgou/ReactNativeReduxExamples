import {createStore} from 'redux'

export interface User {
  id: number
  name: string
  username: string
}

export enum CounterActionTypes {
  INCREMENTED = 'counter/incremented',
  DECREMENTED = 'counter/decremented',
  SET_USERS = 'users/set',
  DEL_USERS = 'users/del',
}

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

export type CounterActions = IncrementCounterAction | DecrementCounterAction | SetUsersAction | DelUsersAction

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

export interface AppState {
  value: number
  users: User[]
}

const initialState: AppState = {value: 0, users: []}

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
