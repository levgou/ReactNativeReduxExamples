import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {AppState, incrementCounter} from './store'
import {connect} from 'react-redux'
import { controller } from "./controller";

export class _BasicReduxPage extends React.Component<{counter: number; increment: () => void}, any> {

  componentDidMount() {
    this.props.navigation.addListener('focus', () => controller.startListening())
    this.props.navigation.addListener('blur', () => controller.stopListening())
  }


  render() {
    return (
      <View style={styles.root}>
        <Text style={{fontSize: 30}}>Count: {this.props.counter}</Text>
        <Button title={'INC'} onPress={this.props.increment} />
      </View>
    )
  }
}
const mapStateToProps = (state: AppState) => {
  return {
    counter: state.value,
  }
}

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
