import React from 'react';
import { Image, Dimensions } from 'react-native';
import { View, Text, Icon } from 'native-base';
import { ExploreSection } from '../../selectors/explore/types';
import { textStyles, colors } from '../../application/styles';
import { ExpandableContentComponent } from '../expandable_content/expandable_content_component';
import { getColorForExploreIcon } from './get_color_for_explore_icon';
import { SelectableText } from '../selectable_text';
import { arrivalAdvisorGlyphLogo } from '../../application/images';

export interface ExploreDetailContentProps {
    readonly section: ExploreSection;
    readonly sectionHasTasks: boolean;
}

export const ExploreDetailContentComponent: React.StatelessComponent<ExploreDetailContentProps> =
    (props: ExploreDetailContentProps): JSX.Element => (
        <View style={{ paddingHorizontal: 10 }}>
            <ImageComponent />
            <TitleComponent {...props} />
        </View>
    );

const ImageComponent = (): JSX.Element => {
    const logoHeight = Dimensions.get('screen').height / 6;
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            backgroundColor: colors.lightGrey,
            borderBottomWidth: 1,
            borderBottomColor: colors.darkerGrey,
            marginHorizontal: -10,
            marginTop: -10,
        }}>
            <Image
                source={arrivalAdvisorGlyphLogo}
                resizeMode={'contain'}
                style={{ height: logoHeight }}
            />
        </View>
    );
};

const TitleComponent = (props: ExploreDetailContentProps): JSX.Element => (
    <View>
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
        {props.sectionHasTasks ? <CollapsibleIntroduction {...props} /> : <PlainTextIntroduction {...props} />}
    </View>
);

const CollapsibleIntroduction = (props: ExploreDetailContentProps): JSX.Element => (
    <ExpandableContentComponent
        content={<SelectableText style={textStyles.headlineH4StyleBlackLeft}>{props.section.introduction}</SelectableText>}
        contentBackgroundColor={colors.lightGrey}
    />
);

const PlainTextIntroduction = (props: ExploreDetailContentProps): JSX.Element => (
    <SelectableText style={textStyles.headlineH4StyleBlackLeft}>{props.section.introduction}</SelectableText>
);
