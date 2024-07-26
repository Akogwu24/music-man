import { FloatingPlayer } from '@/components/FloatingPlayer';
import { colors, fontSize } from '@/constants/tokens';
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

export default function TabsNavigationLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: { fontSize: fontSize.xs, fontWeight: 500 },
          tabBarStyle: {
            backgroundColor: '#000',
            borderTopColor: colors.primary,
          },
          tabBarHideOnKeyboard: true,
          tabBarBackground: () => (
            <BlurView
              intensity={85}
              style={{
                ...StyleSheet.absoluteFillObject,
                overflow: 'hidden',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderTopWidth: 0,
                paddingTop: 8,
              }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name='favorites'
          options={{
            title: 'Favorites',
            tabBarIcon: ({ color }) => <FontAwesome name='heart' size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name='playlists'
          options={{
            title: 'Playlists',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='playlist-play' size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='(songs)'
          options={{
            title: 'Songs',
            tabBarIcon: ({ color }) => (
              <Ionicons name='musical-notes-sharp' size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='artists'
          options={{
            title: 'Artists',
            tabBarIcon: ({ color }) => <FontAwesome6 name='users-line' size={20} color={color} />,
          }}
        />
      </Tabs>

      <FloatingPlayer
        style={{
          position: 'absolute',
          left: 8,
          right: 8,
          bottom: Platform.OS === 'ios' ? 78 : 50,
        }}
      />
    </>
  );
}
