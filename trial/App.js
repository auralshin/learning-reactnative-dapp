/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import './global';
import './shims';
import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import ReadString from "./components/ReadString";
import SetString from "./components/SetString";

// const Web3 = require('web3');
// componentWillMount() {
//   const web3 = new Web3(
//     new Web3.providers.HttpProvider('https://mainnet.infura.io/')
//   );

//   web3.eth.getBlock('latest').then(console.log)
// }
type Props = {};
export default class App extends Component<Props> {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();

      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            <ReadString
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
            />
           <SetString
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
