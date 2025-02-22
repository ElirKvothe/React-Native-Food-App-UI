import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ShoppingBagIcon } from 'react-native-heroicons/solid'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'

export default function FoodCard({ item, index }) {
  const navigation = useNavigation();
  return (
    <Animatable.View
      delay={index*120}
      animation="slideInRight"
      className="w-56 h-70 mr-6 p-3 py-5 rounded-3xl"
      style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
      <View
        className="flex-row justify-center">
        <Image source={item.image} className="h-32 w-32" />
      </View>
      <View className="flex-1 px-3 py-2 space-y-2">
        <Text className="text-black text-xl font-medium tracking-wider">{item.name}</Text>
        <Text className="text-black">{item.ingredients}</Text>
      </View>
      <View className="flex-row justify-between items-center px-1">
        <Text className="text-2xl font-semibold text-white">${item.price}</Text>
        <TouchableOpacity 
          className="bg-white p-3 rounded-full"
          onPress={()=> navigation.navigate('FoodDetails', {...item})}>
          <ShoppingBagIcon size={25} color="black" />
        </TouchableOpacity>
      </View>
    </Animatable.View>
  )
}