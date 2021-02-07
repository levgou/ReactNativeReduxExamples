import {appStore, delUsers, incrementCounter, setUsers, User} from './store'
import {Unsubscribe} from 'redux'

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
        fetch('https://jsonplaceholder.typicode.com/users')
          .then((response) => response.json())
          .then((json) => appStore.dispatch(setUsers(json as User[]))),
      2000,
    )
  }
}

export const controller = new Controller()
