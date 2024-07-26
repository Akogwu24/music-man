import TracksList from '@/components/TracksList';
import { screenPadding } from '@/constants/tokens';
import { defaultStyles } from '@/styles';
import React, { useMemo, useState } from 'react';
import { Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigationSearch } from '@/hooks/useNavigationSearch';
import { useFavorites } from '@/store/library';
import { trackTitleFilter } from '@/helpers/filter';
import { generateTracksListId } from '@/helpers/miscellaneous';
import { CustomHeaderForAndroid } from '@/components/CustomHeaderForAndroid';

export default function FavoritesScreen() {
  const search = useNavigationSearch({ searchBarOptions: { placeholder: 'Find in songs' } });
  const [androidSearchTerm, setAndroidSearchTerm] = useState('');

  const favoriteTracks = useFavorites().favorites;

  const filteredFavoriteTracks = useMemo(() => {
    if (Platform.OS === 'android') {
      if (!androidSearchTerm) return favoriteTracks;

      return favoriteTracks.filter(trackTitleFilter(androidSearchTerm));
    }

    if (!search) return favoriteTracks;

    return favoriteTracks.filter(trackTitleFilter(search));
  }, [search, favoriteTracks, androidSearchTerm]);

  return (
    <View style={defaultStyles.container}>
      {Platform.OS === 'android' ? (
        <CustomHeaderForAndroid
          title='Favorites'
          value={androidSearchTerm}
          setValue={setAndroidSearchTerm}
        />
      ) : null}
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
