/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import {StyleSheet, View, Text, Button} from 'react-native'

import {Colors} from 'react-native/Libraries/NewAppScreen'

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {BasicReduxPage} from './BasicReduxPage'
import {Provider} from 'react-redux'
import {appStore} from './store'
import { InteractWithController } from "./InteractWithController";
import { APICallExample } from "./APICallExample";

const Stack = createStackNavigator()

class Home extends React.Component<{}, {}> {
  render() {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Step One</Text>
        <Text style={styles.sectionDescription}>
          Edit <Text style={styles.highlight}>App.tsx</Text> hi change this screen and then come back to see your edits.
        </Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate('Basic')
          }}
          title={'Basic reduc'}
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate('Cont')
          }}
          title={'With controller'}
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate('API')
          }}
          title={'With API Call'}
        />
      </View>
    )
  }
}

function App() {
  return (
    <Provider store={appStore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Basic" component={BasicReduxPage} />
          <Stack.Screen name="Cont" component={InteractWithController} />
          <Stack.Screen name="API" component={APICallExample} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})

export default App
