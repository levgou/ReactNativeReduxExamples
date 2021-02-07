import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {AppState, incrementCounter} from './store'
import {connect} from 'react-redux'
import {controller} from './controller'
import {createSelector} from '@reduxjs/toolkit'

export class _BasicReduxPage extends React.Component<{counter: number; increment: () => void}, any> {
  componentDidMount() {
    // here we show how the controller can react to change in store events
    this.props.navigation.addListener('focus', () => controller.startListening())
    this.props.navigation.addListener('blur', () => controller.stopListening())
  }

  render() {
    return (
      <View style={styles.root}>
        <Text style={{fontSize: 30}}>Count / 3 = {this.props.counter}</Text>
        <Button title={'INC'} onPress={this.props.increment} />
        <Button title={'GOTO Cont'} onPress={controller.navigateToCont} />
      </View>
    )
  }
}

const getCounterDiv3 = (state: AppState) => Math.round(state.value / 3)

// this shows that it runs only when getCounterDiv3 produces a new value
const expensiveToComputeStateTransform = (counter: number) => {
  console.log(`Calculating derived state for counter = ${counter}`)
  return counter
}

/**
 *
 * the selector memoizes the transform function value, and runs it again
 * only if the output of the selectors has changes (in this case getCounterDiv3)
 * in case the computation of the props from state takes long time - this is a viable optimization
 * */
export const deriveCounter = createSelector([getCounterDiv3], expensiveToComputeStateTransform)

// this derives the props from the global redux state
const mapStateToProps = (state: AppState) => {
  return {
    counter: deriveCounter(state),
  }
}

// If you want to update the store from the component,
// an action should be mapped to one of the callback props
const mapDispatchToProps = {increment: incrementCounter}

export const BasicReduxPage = connect(mapStateToProps, mapDispatchToProps)(_BasicReduxPage)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
})
