import { colors, screenPadding } from '@/constants/tokens';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

type TCustomHeaderForAndroidProps = {
  title: string;
  setValue: (val: string) => void;
  value: string;
};

export const CustomHeaderForAndroid = ({
  title,
  setValue,
  value,
}: TCustomHeaderForAndroidProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.inputContainer, {}]}>
        <Feather style={{ marginLeft: 4 }} name='search' size={24} color={colors.textMuted} />
        <TextInput
          placeholderTextColor={colors.textMuted}
          placeholder='Find in songs'
          style={styles.input}
          onChangeText={setValue}
          value={value ?? ''}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: screenPadding.horizontal,
  },
  inputContainer: {
    marginVertical: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: colors.darkGray,
    borderRadius: 9,
  },
  title: { fontSize: 35, marginTop: 10, fontWeight: 'bold', color: 'white' },
  input: {
    paddingLeft: 8,
    backgroundColor: colors.darkGray,
    marginVertical: 1,
    height: 35,
    borderRadius: 9,
    flex: 1,
    color: colors.text,
    fontWeight: '600',
    fontSize: 15,
  },
});
