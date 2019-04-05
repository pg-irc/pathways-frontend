import React from 'react';
import { View, Icon, Text } from 'native-base';
import { getColorForExploreIcon } from '../explore/get_color_for_explore_icon';
import { textStyles } from '../../application/styles';

export interface TopicListHeading {
    readonly id: string;
    readonly heading: string;
    readonly icon: string;
}

export interface TopicListHeadingProps {
    readonly heading: string;
    readonly icon: string;
}

export const TopicListHeadingComponent: React.StatelessComponent<TopicListHeadingProps> =
    (props: TopicListHeading): JSX.Element => (
        <View style={{ marginTop: 30, marginBottom: 10, marginHorizontal: 15 }}>
            <Icon
                name={props.icon}
                type={'FontAwesome'}
                style={{
                    color: getColorForExploreIcon(props.icon),
                    marginBottom: 5,
                }}
            />
            <Text style={textStyles.headlineH3StyleBlackLeft}>{props.heading}</Text>
        </View>
    );