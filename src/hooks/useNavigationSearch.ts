import { colors } from '@/constants/tokens';
import { useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { Platform } from 'react-native';
import { SearchBarProps } from 'react-native-screens';

const defaultSearchOptions: SearchBarProps = {
  tintColor: Platform.OS === 'ios' ? colors.primary : 'red',
  hideWhenScrolling: false,
};

export const useNavigationSearch = ({
  searchBarOptions,
}: {
  searchBarOptions?: SearchBarProps;
}) => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const handleOnChangeText: SearchBarProps['onChangeText'] = ({ nativeEvent: { text } }) => {
    setSearch(text);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        ...defaultSearchOptions,
        ...searchBarOptions,
        onChangeText: handleOnChangeText,
      },
    });
  }, [navigation, searchBarOptions]);

  return search;
};
