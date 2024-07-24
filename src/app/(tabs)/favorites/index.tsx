import TracksList from '@/components/TracksList';
import { screenPadding } from '@/constants/tokens';
import { defaultStyles } from '@/styles';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { useFavorites } from '@/store/library';
import { trackTitleFilter } from '@/helpers/filter';
import { generateTracksListId } from '@/helpers/miscellaneous';

export default function FavouritesScreen() {
  const search = useNavigationSearch({ searchBarOptions: { placeholder: 'Find in songs' } });

  const favoriteTracks = useFavorites().favorites;

  const filteredFavoriteTracks = useMemo(() => {
    if (!search) return favoriteTracks;

    return favoriteTracks.filter(trackTitleFilter(search));
  }, [search, favoriteTracks]);

  return (
    <View style={defaultStyles.container}>
      <ScrollView
        style={{ paddingHorizontal: screenPadding.horizontal }}
        contentInsetAdjustmentBehavior='automatic'
      >
        <TracksList
          id={generateTracksListId('favorites', search)}
          scrollEnabled={false}
          tracks={filteredFavoriteTracks || []}
        />
      </ScrollView>
    </View>
  );
}
