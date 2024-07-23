import TracksList from '@/components/TracksList';
import { screenPadding } from '@/constants/tokens';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { defaultStyles } from '@/styles';
import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import library from '../../../../assets/data/library.json';
import { trackTitleFilter } from '@/helpers/filter';

export default function SongsScreen() {
  const search = useNavigationSearch({ searchBarOptions: { placeholder: 'Find in Songs' } });

  const filteredTracks = useMemo(() => {
    if (!search) return library;

    return library.filter(trackTitleFilter(search));
  }, [search]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        style={{ paddingHorizontal: screenPadding.horizontal }}
      >
        <TracksList tracks={filteredTracks} scrollEnabled={false} />
      </ScrollView>
    </View>
  );
}
