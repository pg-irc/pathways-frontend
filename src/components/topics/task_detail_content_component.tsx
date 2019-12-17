import React from 'react';
import * as R from 'ramda';
import { Platform } from 'react-native';
import { View, Text, Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { Topic } from '../../selectors/topics/topic';
import { textStyles, colors, values, getNormalFontFamily } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { images as topicImages } from '../../application/topicImages';
import { RecommendedIconComponent } from '../recommended_topics/recommended_icon_component';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';
import { TitleComponent } from '../content_layout/title_component';
import { DescriptorComponent } from '../content_layout/descriptor_component';
import { DividerComponent } from '../content_layout/divider_component';
import { BannerImageComponent } from '../content_layout/banner_image_component';
import { MarkdownBodyComponent } from '../content_layout/markdown_body_component';
import { ExpandDetailAction } from '../../stores/topics';

export interface TaskDetailContentProps {
    readonly topic: Topic;
}

export interface TaskDetailContentActions {
    readonly onServicesTextPress: () => void;
    readonly expandDetail: () => ExpandDetailAction;
}

type Props = TaskDetailContentProps & TaskDetailContentActions;

export const TaskDetailContentComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <View padder style={{ backgroundColor: colors.white, marginHorizontal: -10 }}>
        <BannerImageComponent imageSource={topicImages[props.topic.id]} />
        <DescriptorComponent descriptor={<Trans id={props.topic.exploreSection.name.toUpperCase()} />} />
        <TitleComponent title={props.topic.title} />
        <RecommendedComponent {...props} />
        <DividerComponent />
        <MarkdownBodyComponent
            body={props.topic.description}
            shouldBeExpandable={!!props.topic.relatedTopics.length}
            topicId={props.topic.id}
            expandDetail={props.expandDetail}
        />
        <DividerComponent />
        <ServicesButton {...props} />
    </View>
);

const RecommendedComponent = (props: Props): JSX.Element => {
    if (R.not(props.topic.isRecommended)) {
        return <EmptyComponent />;
    }
    return (
        <View style={{ flexDirection: 'row', marginVertical: 5, paddingHorizontal: values.backgroundTextPadding }}>
            <RecommendedIconComponent
                additionalStyles={{
                    marginRight: 5,
                }}
            />
            <Text style={[textStyles.paragraphStyle, { color: colors.greyishBrown, fontSize: 14, fontFamily: getNormalFontFamily() }]}>
                <Trans>Recommended for you</Trans>
            </Text>
        </View>
    );
};

const ServicesButton = (props: Props): JSX.Element => (
    <MultiLineButtonComponent
        onPress={props.onServicesTextPress}
        additionalStyles={{
            marginBottom: 15,
            paddingHorizontal: Platform.OS === 'ios' ? 15 : 0,
        }}
    >
        <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginHorizontal: Platform.OS === 'ios' ? 0 : 20,
        }}>
            <Icon
                type={'FontAwesome'}
                name={'map-marker'}
                style={{
                    color: colors.white,
                    fontSize: values.smallIconSize,
                    marginRight: 10,
                }}
            />
            <Text style={[textStyles.button, { textAlign: 'left' }]}>
                <Trans>Find related services near me</Trans>
            </Text>
        </View>
    </MultiLineButtonComponent>
);
