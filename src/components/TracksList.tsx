import React, { useRef } from 'react';
import { FlatList, FlatListProps, Text, View } from 'react-native';
import { TrackListItem } from './TrackListItem';
import { utilsStyles } from '@/styles';
import TrackPlayer, { Track } from 'react-native-track-player';
import FastImage from 'react-native-fast-image';
import { unknownTrackImageUri } from '@/constants/images';
import { useQueue } from '@/store/queue';
import { QueueControls } from './QueueControls';

export type TracksListProps = Partial<FlatListProps<Track>> & {
  id: string;
  tracks: Track[];
  hideQueueControls?: boolean;
};

export default function TracksList({
  id,
  tracks,
  hideQueueControls = false,
  ...flatlistProps
}: TracksListProps) {
  const queueOffset = useRef(0);
  const { activeQueueId, setActiveQueueId } = useQueue();

  const handleTrackSelect = async (selectedTrack: Track) => {
    const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url);

    if (trackIndex == -1) return;

    const isChangingQueue = id !== activeQueueId;

    if (isChangingQueue) {
      const beforeTracks = tracks.slice(0, trackIndex);
      const afterTracks = tracks.slice(trackIndex + 1);

      await TrackPlayer.reset();

      // construct new queue
      await TrackPlayer.add(selectedTrack);
      await TrackPlayer.add(afterTracks);
      await TrackPlayer.add(beforeTracks);

      await TrackPlayer.play(); //plays the selected track

      queueOffset.current = trackIndex;
      console.log('  queueOffset.current', queueOffset.current);
      setActiveQueueId(id as string);
    } else {
      const nextTrackIndex =
        trackIndex - queueOffset.current < 0
          ? tracks.length + trackIndex - queueOffset.current
          : trackIndex - queueOffset.current;

      await TrackPlayer.skip(nextTrackIndex);
      TrackPlayer.play();
    }
  };

  return (
    <FlatList
      data={tracks}
      renderItem={({ item: track }) => (
        <TrackListItem track={track} onTrackSelect={handleTrackSelect} />
      )}
      ItemSeparatorComponent={ItemDivider}
      contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
      ListHeaderComponent={
        !hideQueueControls ? (
          <QueueControls tracks={tracks} style={{ paddingBottom: 20 }} />
        ) : undefined
      }
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
