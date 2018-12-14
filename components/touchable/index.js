import * as React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';

const ANDROID_VERSION_LOLLIPOP = 21;

export default class TouchableItem extends React.Component {
  static defaultProps = {
    borderless: false,
    pressColor: 'rgba(0, 0, 0, .32)',
  };

  render() {
    if (
      Platform.OS === 'android' &&
      Platform.Version >= ANDROID_VERSION_LOLLIPOP
    ) {
      const { style, ...rest } = this.props;
      return (
        <TouchableNativeFeedback
          {...rest}
          style={null}
          background={TouchableNativeFeedback.Ripple(
            this.props.pressColor || '',
            this.props.borderless || false,
          )}
        >
          <View style={style}>{React.Children.only(this.props.children)}</View>
        </TouchableNativeFeedback>
      );
    }

    if (this.props.highlight) {
      return (
        <TouchableHighlight {...this.props}>{this.props.children}</TouchableHighlight>
      );
    }

    return (
      <TouchableOpacity {...this.props}>{this.props.children}</TouchableOpacity>
    );
  }
}
