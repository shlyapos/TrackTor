import { PureComponent } from 'react';
import { View } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';

import styles from './TopMenuStyle';

interface ITopMenuProps {
  isSearch?: boolean;
  searchValue?: string;
  onChangeSearch?: (value: string) => void;
  onPress?: () => void;
}

export default class TopMenu extends PureComponent<ITopMenuProps> {
  render() {
    const { isSearch, searchValue, onChangeSearch, onPress } = this.props;

    return (
      <View
        style={[
          styles.container,
          { alignItems: isSearch ? 'center' : 'flex-start' },
        ]}
      >
        {isSearch ? (
          <Searchbar
            selectionColor={styles.searchSelection.color}
            value={searchValue}
            onChangeText={onChangeSearch}
            style={styles.search}
            placeholder='Поиск по названию'
            placeholderTextColor={styles.searchPlaceholder.color}
            inputStyle={styles.searchInput}
            iconColor={styles.searchIcon.color}
          />
        ) : (
          <Button
            onPress={onPress}
            mode='text'
            icon='arrow-left'
            contentStyle={styles.buttonContent}
            labelStyle={styles.buttonLabel}
            theme={{
              colors: {
                primary: styles.buttonOnPress.color,
              },
            }}
          >
            Назад
          </Button>
        )}
      </View>
    );
  }
}
