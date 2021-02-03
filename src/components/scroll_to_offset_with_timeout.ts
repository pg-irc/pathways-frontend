// tslint:disable: no-expression-statement
import { FlatList } from 'react-native';

export const scrollToOffset = (flatListRef: React.MutableRefObject<FlatList>, offset: number): void => {
    // tslint:disable-next-line: max-line-length
    // https://stackoverflow.com/questions/60374750/flatlist-is-not-scrolling-to-desired-offset-when-scrolltooffset-is-used
    setTimeout((): void => {
        flatListRef.current.scrollToOffset({ animated: false, offset });
    }, 0);
};