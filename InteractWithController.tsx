import React from 'react'
import {Button, StyleSheet, Text, View} from 'react-native'
import {AppState, incrementCounter} from './store'
import {connect} from 'react-redux'
import { controller } from "./controller";

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
