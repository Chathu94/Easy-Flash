import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from './controllers/home';
import PolicyScreen from './controllers/policy';

export default createAppContainer(createStackNavigator({
  home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Simple Torch'
    }
  },
  policy: {
    screen: PolicyScreen,
    navigationOptions: {
      title: 'Privacy Policy'
    }
  }
}));
