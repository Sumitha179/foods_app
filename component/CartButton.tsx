import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const CartButton = () => {
  const totalItems = 10;

  return (
    <TouchableOpacity className="items-center" onPress={() => {}}>
      <Icon name="shopping-bag" size={20} color="#000" />
    </TouchableOpacity>
  );
};

export default CartButton;
