import TracksList from '@/components/TracksList';
import { screenPadding } from '@/constants/tokens';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { defaultStyles } from '@/styles';
import React, { useMemo, useState } from 'react';
import { Platform, ScrollView, StatusBar, View } from 'react-native';
import { trackTitleFilter } from '@/helpers/filter';
import { useTracks } from '@/store/library';
import { generateTracksListId } from '@/helpers/miscellaneous';
import { CustomHeaderForAndroid } from '@/components/CustomHeaderForAndroid';

export default function SongsScreen() {
  const search = useNavigationSearch({ searchBarOptions: { placeholder: 'Find in Songs' } });
  const [androidSearchTerm, setAndroidSearchTerm] = useState('');

  const tracks = useTracks();

  const filteredTracks = useMemo(() => {
    if (Platform.OS === 'android') {
      if (!androidSearchTerm) return tracks;

      return tracks.filter(trackTitleFilter(androidSearchTerm));
    }

    if (!search) return tracks;

    return tracks.filter(trackTitleFilter(search));
  }, [search, androidSearchTerm]);

  return (
    <View style={[defaultStyles.container]}>
      {Platform.OS === 'android' ? (
        <CustomHeaderForAndroid
          title='Songs'
          value={androidSearchTerm}
          setValue={setAndroidSearchTerm}
        />
      ) : null}

      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <TracksList
          id={generateTracksListId('songs', search)}
          tracks={filteredTracks}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
}
