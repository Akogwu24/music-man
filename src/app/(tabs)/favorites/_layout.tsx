import { StackScreenWithSearchBar } from '@/constants/layout';
import { defaultStyles } from '@/styles';
import { Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function favoritesScreenLayout() {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name='index'
          options={{ ...StackScreenWithSearchBar, headerTitle: 'Favorites' }}
        />
      </Stack>
    </View>
  );
}
