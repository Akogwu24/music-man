import TracksList from '@/components/TracksList';
import { screenPadding } from '@/constants/tokens';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { defaultStyles } from '@/styles';
import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { trackTitleFilter } from '@/helpers/filter';
import { useTracks } from '@/store/library';
import { generateTracksListId } from '@/helpers/miscellaneous';

export default function SongsScreen() {
  const search = useNavigationSearch({ searchBarOptions: { placeholder: 'Find in Songs' } });

  const tracks = useTracks();

  const filteredTracks = useMemo(() => {
    if (!search) return tracks;

    return tracks.filter(trackTitleFilter(search));
  }, [search]);

  return (
    <View style={defaultStyles.container}>
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
