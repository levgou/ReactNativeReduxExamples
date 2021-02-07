import React from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'
import {AppState} from './store'
import {connect} from 'react-redux'
import {controller} from './controller'

/**
 *  This components renders the counter, while a regular class updates the store with its value.
 *  This use case is useful when we want to user Redux only as a data store, and dont want
 *  to introduce state producing business logic to it
 * */
export class _InteractWithController extends React.Component<{counter: number; increment: () => void}, any> {
  render() {
    return (
      <View style={styles.root}>
        <Text style={{fontSize: 30}}>Count: {this.props.counter}</Text>
        <Button title={'START'} onPress={controller.startCounting} />
        <Button title={'STOP'} onPress={controller.stopCounting} />
      </View>
    )
  }
}
const mapStateToProps = (state: AppState) => {
  return {
    counter: state.value,
  }
}

export const InteractWithController = connect(mapStateToProps)(_InteractWithController)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
})
