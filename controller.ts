import {appStore, delUsers, incrementCounter, setUsers, User} from './store'
import {Unsubscribe} from 'redux'

/**
 *
 * This class demonstrates how business logic could be orchestrated
 * in the context of a react app
 *
 * Note that as the app becomes larger, it could be reasonable to delegate
 * page specific logic, to sub controllers
 * */
class Controller {
  interval?: number
  unsub?: Unsubscribe

  // both bellow demonstrate interaction with store from regular classes
  startCounting = () => {
    this.stopCounting()
    this.interval = setInterval(() => appStore.dispatch(incrementCounter()), 1000)
  }

  stopCounting = () => {
    this.interval && clearInterval(this.interval)
  }

  // both bellow demonstrate sub to store from regular classes
  startListening = () => {
    this.stopListening()
    this.unsub = appStore.subscribe(() => this.onCounterChanged(appStore.getState().value))
  }

  stopListening = () => {
    this.unsub?.()
  }

  onCounterChanged = (count: number) => {
    console.log(`Counter changed to ${count}`)
  }

  callSpecialAPI = () => {
    appStore.dispatch(delUsers())

    setTimeout(
      () =>
        // free dummy api
        fetch('https://jsonplaceholder.typicode.com/users')
          .then((response) => response.json())
          .then((json) => appStore.dispatch(setUsers(json as User[]))),
      2000,
    )
  }
}

export const controller = new Controller()
