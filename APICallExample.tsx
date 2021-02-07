import React from 'react'
import {Text, ActivityIndicator, Button, StyleSheet, View, ListView, FlatList} from 'react-native'
import {AppState, User} from './store'
import {connect} from 'react-redux'
import {controller} from './controller'

/**
 *  This show cases a simple example of rendering api fetched data
 *  The dumb component is not aware of where the users come from, or what the onPush does.
 *
 *  This example also demonstrates how to decouple API fetch logic, from data store, from UI rendering
 * */
class _APICallExample extends React.Component<{users: User[]}, {waiting: boolean}> {
  state = {waiting: false}

  componentDidUpdate() {
    if (this.props.users.length > 0 && this.state.waiting) {
      this.setState({waiting: false})
    }
  }

  callAPI = () => {
    this.setState({waiting: true})
    controller.callSpecialAPI()
  }

  render() {
    return <_APICallExampleDumb waiting={this.state.waiting} onPress={this.callAPI} users={this.props.users} />
  }
}

const Users = ({users}: {users: User[]}) => (
  <FlatList data={users} renderItem={(userObj) => <Text key={userObj.index}>{userObj.item.name}</Text>} />
)

class _APICallExampleDumb extends React.PureComponent<{waiting: boolean; onPress: () => void; users: User[]}> {
  render() {
    return (
      <View style={styles.root}>
        <Button title={'FETCH'} onPress={this.props.onPress} />
        {this.props.waiting ? <ActivityIndicator size="large" /> : <Users users={this.props.users} />}
      </View>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  console.log(`new props ${state.users.length}`)
  return {
    users: state.users,
  }
}

export const APICallExample = connect(mapStateToProps)(_APICallExample)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
  },
})
