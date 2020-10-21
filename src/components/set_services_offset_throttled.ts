import { NativeSyntheticEvent, ScrollViewProps } from 'react-native';
import throttle from 'lodash.throttle';

const throttleWaitTime = 300;

export const setServicesOffsetThrottled = throttle((e: NativeSyntheticEvent<ScrollViewProps>, setServicesOffset: (n: number) => void): void => {
    return setServicesOffset(e.nativeEvent.contentOffset.y);
}, throttleWaitTime, { trailing: false });
