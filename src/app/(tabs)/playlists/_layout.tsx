import { StackScreenWithSearchBar } from '@/constants/layout';
import { colors } from '@/constants/tokens';
import { defaultStyles } from '@/styles';
import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function playlistsScreenLayout() {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name='index'
          options={{ ...StackScreenWithSearchBar, headerTitle: 'Playlist' }}
        />

        <Stack.Screen
          name='[name]'
          options={{
            headerTitle: '',
            headerBackVisible: true,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.primary,
          }}
        />
      </Stack>
    </View>
  );
}
