import React from "react";
import { Camera, Permissions, AdMobBanner } from "expo";
import { StyleSheet, Text, View } from "react-native";

import Touchable from "../../components/touchable";

export default class HomeController extends React.Component {
  state = {
    hasCameraPermission: null,
    isOn: false
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  handleFlashToggle = () => this.setState(state => ({ isOn: !state.isOn }));

  render() {
    const { isOn, hasCameraPermission } = this.state;
    const { handleFlashToggle } = this;
    if (!hasCameraPermission)
      return <Text>Please give camera permission.</Text>;
    return (
      <View style={styles.container}>
        <Touchable
          onPress={handleFlashToggle}
          accessibilityLabel={
            isOn ? "Turn off flashlight" : "Turn on flashlight"
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>{isOn ? "Off" : "On"}</Text>
        </Touchable>
        {isOn ? (
          <Camera
            style={{ height: 1, width: 1, opacity: 0 }}
            flashMode="torch"
          />
        ) : null}
        <AdMobBanner
          style={styles.add}
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-7044619401861407/2345653083"
          testDeviceID="EMULATOR"
          onDidFailToReceiveAdWithError={e => console.log(e)}
        />
        <Touchable
          style={styles.fixed}
          onPress={() => this.props.navigation.navigate("policy")}
        >
          <Text>* Privacy Policy</Text>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20
  },
  button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#841584",
    paddingVertical: 40,
    paddingHorizontal: 70
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 30
  },
  fixed: {
    position: "absolute",
    top: 10,
    right: 10
  },
  add: {
    position: "absolute",
    top: 30,
    left: 0,
    right: 0
  }
});
