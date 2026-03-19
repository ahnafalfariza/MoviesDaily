import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const { width } = Dimensions.get("window");

const MiniOfflineSign = () => {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
};

const OfflineNotice = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((network) => {
      setIsConnected(network.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (!isConnected) return <MiniOfflineSign />;
  return null;
};

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
