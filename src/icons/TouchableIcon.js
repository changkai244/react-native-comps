import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  StyleSheet,
  View
} from 'react-native';
import Icon from "./Icon";

const TouchableIcon = ({size, onPress, disabled, style, iconStyle, ...others}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[styles.root, size && {width: size, height: size}, style]}>
        <Icon {...others} style={iconStyle} />
      </View>
    </TouchableOpacity>
  );
};


TouchableIcon.propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.number,
  style: View.propTypes.style,
  iconStyle: View.propTypes.style,
};

TouchableIcon.defaultProps = {
  onPress: () => {
  
  },
  disabled: false,
  size: null
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default TouchableIcon;