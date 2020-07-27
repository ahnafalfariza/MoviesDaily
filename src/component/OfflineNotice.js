import React, { PureComponent } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const { width } = Dimensions.get("window");
function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}
class OfflineNotice extends PureComponent {
  state = {
    isConnected: true,
  };

  componentDidMount() {
    this.subscription = NetInfo.addEventListener(this.handleConnectivityChange);
  }

  componentWillUnmount() {
    this.subscription();
  }

  handleConnectivityChange = (network) => {
    this.setState({ isConnected: network.isConnected });
  };

  render() {
    if (!this.state.isConnected) return <MiniOfflineSign />;
    return null;
  }
}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: "#b52424",
    flexDirection: "row",
    height: 80,
    width,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: "absolute",
    bottom: 0,
  },
  offlineText: {
    color: "#fff",
    marginBottom: 16,
    fontFamily: "Montserrat-Regular",
  },
});
export default OfflineNotice;
