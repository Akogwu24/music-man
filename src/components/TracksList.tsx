import React from 'react';
import { FlatList, FlatListProps, Text, View } from 'react-native';
import { TrackListItem } from './TrackListItem';
import { utilsStyles } from '@/styles';
import TrackPlayer, { Track } from 'react-native-track-player';
import FastImage from 'react-native-fast-image';
import { unknownTrackImageUri } from '@/constants/images';

export type TracksListProps = Partial<FlatListProps<Track>> & {
  id?: string;
  tracks: Track[];
  hideQueueControls?: boolean;
};

export default function TracksList({ tracks, ...flatlistProps }: TracksListProps) {
  const handleTrackSelect = async (track: Track) => {
    await TrackPlayer.load(track);
    await TrackPlayer.play();
  };
  return (
    <FlatList
      data={tracks}
      renderItem={({ item: track }) => (
        <TrackListItem track={track} onTrackSelect={handleTrackSelect} />
      )}
      ItemSeparatorComponent={ItemDivider}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      ListFooterComponent={ItemDivider}
      ListEmptyComponent={SongListEmpty}
      {...flatlistProps}
    />
  );
}

const ItemDivider = () => (
  <View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
);

const SongListEmpty = () => {
  return (
    <View>
      <Text style={utilsStyles.emptyContentText}>No Song Found</Text>
      <FastImage
        source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
        style={utilsStyles.emptyContentImage}
      />
    </View>
  );
};
