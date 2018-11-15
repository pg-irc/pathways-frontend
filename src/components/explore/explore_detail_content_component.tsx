import React from 'react';
import { View, Text, Icon } from 'native-base';
import { ExploreSection } from '../../selectors/explore/types';
import { textStyles, colors } from '../../application/styles';
import { ExpandableContentComponent } from '../expandable_content/expandable_content_component';
import { getColorForExploreIcon } from './get_color_for_explore_icon';

export interface ExploreDetailContentProps {
    readonly section: ExploreSection;
    readonly sectionHasTasks: boolean;
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
            { props.sectionHasTasks ? renderCollapsibleIntroduction(props) : renderPlainTextIntroduction(props) }
        </View>
    );

const renderCollapsibleIntroduction = (props: ExploreDetailContentProps): JSX.Element => (
    <ExpandableContentComponent
        content={<Text style={textStyles.headlineH4StyleBlackLeft}>{props.section.introduction}</Text>}
        contentBackgroundColor={colors.lightGrey}
    />
);

const renderPlainTextIntroduction = (props: ExploreDetailContentProps): JSX.Element => (
    <Text style={textStyles.headlineH4StyleBlackLeft}>{props.section.introduction}</Text>
);
