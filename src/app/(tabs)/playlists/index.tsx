import { CustomHeaderForAndroid } from '@/components/CustomHeaderForAndroid';
import { PlaylistsList } from '@/components/PlaylistsList';
import { screenPadding } from '@/constants/tokens';
import { playlistNameFilter } from '@/helpers/filter';
import { Playlist } from '@/helpers/types';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { usePlaylists } from '@/store/library';
import { defaultStyles } from '@/styles';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Platform, ScrollView, Text, View } from 'react-native';

export default function PlaylistScreen() {
  const search = useNavigationSearch({ searchBarOptions: { placeholder: 'Find in playlist' } });
  const router = useRouter();
  const [androidSearchTerm, setAndroidSearchTerm] = useState('');

  const { playlists } = usePlaylists();

  const filteredPlaylists = useMemo(() => {
    return playlists.filter(playlistNameFilter(search || androidSearchTerm));
  }, [search, playlists]);

  const handlePlaylistPress = (playlist: Playlist) => {
    router.push(`/(tabs)/playlists/${playlist.name}`);
  };

  return (
    <View style={defaultStyles.container}>
      {Platform.OS === 'android' ? (
        <CustomHeaderForAndroid
          title='Playlist'
          value={androidSearchTerm}
          setValue={setAndroidSearchTerm}
        />
      ) : null}
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        style={{
          paddingHorizontal: screenPadding.horizontal,
        }}
      >
        <PlaylistsList
          scrollEnabled={false}
          playlists={filteredPlaylists}
          onPlaylistPress={handlePlaylistPress}
        />
      </ScrollView>
    </View>
  );
}
