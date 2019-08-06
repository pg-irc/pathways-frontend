import React from 'react';
import * as R from 'ramda';
import { Image, Dimensions, Platform } from 'react-native';
import { View, Text, Icon } from 'native-base';
import { Trans } from '@lingui/react';
import Markdown, { openUrl } from 'react-native-markdown-renderer';
import { Topic } from '../../selectors/topics/topic';
import { textStyles, colors, values, markdownStyles, getNormalFontFamily } from '../../application/styles';
import { EmptyComponent } from '../empty_component/empty_component';
import { ExpandableContentComponent } from '../expandable_content/expandable_content_component';
import { arrivalAdvisorGlyphLogo } from '../../application/images';
import { images as topicImages } from '../../application/topicImages';
import { RecommendedIconComponent } from '../recommended_topics/recommended_icon_component';
import { MultiLineButtonComponent } from '../mutiline_button/multiline_button_component';

export interface TaskDetailContentProps {
    readonly topic: Topic;
}

export interface TaskDetailContentActions {
    readonly onServicesTextPress: () => void;
}

type Props = TaskDetailContentProps & TaskDetailContentActions;

export const TaskDetailContentComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <View padder style={{ backgroundColor: colors.white, marginHorizontal: -10 }}>
        <ImageComponent {...props} />
        <TaxonomyComponent {...props} />
        <TitleComponent {...props} />
        <RecommendedComponent {...props} />
        <Divider />
        <TaskDescription {...props} />
        <Divider />
        <ServicesButton {...props} />
    </View>
);

const ImageComponent = (props: Props): JSX.Element => {
    const logoHeight = Dimensions.get('screen').height / 8;
    const imageSource = topicImages[props.topic.id] ?
        topicImages[props.topic.id]
        :
        arrivalAdvisorGlyphLogo;
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
                source={imageSource}
                resizeMode={'contain'}
                style={{ height: logoHeight }}
            />
        </View>
    );
};

const TaxonomyComponent = (props: Props): JSX.Element => (
    <Text style={[
        textStyles.headlineH5StyleBlackLeft,
        {
            marginTop: 20,
            marginBottom: 5,
            paddingHorizontal: values.backgroundTextPadding,
        },
    ]}
    >
        <Trans id={props.topic.exploreSection.name} />
    </Text>
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

const Divider = (): JSX.Element => (
    <View style={{ height: 2, flex: 1, marginVertical: 20, backgroundColor: colors.lightGrey }}></View>
);

const TitleComponent = (props: Props): JSX.Element => (
    <Text style={[textStyles.taskTitle, { paddingHorizontal: values.backgroundTextPadding }]}>
        {props.topic.title}
    </Text>
);

const markDownRules = {
    link: (node: any, children: any): JSX.Element => {
        return (
            <Text key={node.key} style={markdownStyles.link} onPress={(): void => openUrl(node.attributes.href)}>
                {children}
                <Text>{' '}</Text>
                <Icon name='external-link' type='FontAwesome' style={{ fontSize: 12, color: colors.teal }} />
            </Text>
        );
    },
};

const TaskDescription = (props: Props): JSX.Element => {
    const topic = props.topic;
    const taskDescription = (
        <Markdown
            rules={markDownRules}
            style={markdownStyles}
        >
            {topic.description}
        </Markdown>
    );
    return topic.relatedTopics.length > 0 ?
        <ExpandableContentComponent
            contentId={topic.id}
            content={taskDescription}
        />
        :
        taskDescription;
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
