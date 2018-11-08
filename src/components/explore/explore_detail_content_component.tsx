import React from 'react';
import { View, Text, Icon } from 'native-base';
import { ExploreSection } from '../../selectors/explore/types';
import { textStyles } from '../../application/styles';
import { ExpandableText } from '../expandable_text/expandable_text';
import { getColorForExploreIcon } from './get_color_for_explore_icon';

export interface ExploreDetailContentProps {
    readonly section: ExploreSection;
    readonly collapseIntroduction: boolean;
}

export const ExploreDetailContentComponent: React.StatelessComponent<ExploreDetailContentProps> =
    (props: ExploreDetailContentProps): JSX.Element => (
        <View style={{ paddingHorizontal: 10 }}>
            <Icon
                type={'FontAwesome'}
                name={props.section.icon}
                style={{
                    color: getColorForExploreIcon(props.section.icon),
                    marginVertical: 20,
                }}
            />
            <Text style={textStyles.headlineH1StyleBlackLeft}>
                {props.section.name}
            </Text>
            {
                props.collapseIntroduction ?
                    <ExpandableText text={props.section.introduction} /> :
                    <Text>{props.section.introduction}</Text>
            }
        </View>
    );
