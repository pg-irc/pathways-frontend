import React from 'react';
import { Image, Dimensions } from 'react-native';
import { View } from 'native-base';
import { colors } from '../../application/styles';
import { topicsImages } from '../../application/topicsImages';
export interface TaskDetailHeadingComponent {
    readonly taskId: string;
}

type Props = TaskDetailHeadingComponent;


export const TaskDetailHeadingComponent: React.StatelessComponent<Props> = (props:Props): JSX.Element => {
    const logoHeight = Dimensions.get('screen').height / 8;
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            backgroundColor: colors.lightGrey,
            borderBottomWidth: 1,
            borderBottomColor: colors.darkerGrey,
        }}>
            <Image
                source={topicsImages[props.taskId]}
                resizeMode={'contain'}
                style={{ height: logoHeight }}
            />
        </View>
    );
};