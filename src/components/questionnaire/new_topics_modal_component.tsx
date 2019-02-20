import React from 'react';
import * as R from 'ramda';
import { History } from 'history';
import { Dimensions, Image, FlatList, ListRenderItemInfo } from 'react-native';
import Modal from 'react-native-modal';
import { View, Button, Text, Icon } from 'native-base';
import { Trans } from '@lingui/react';
import { AnswersMap } from '../../stores/questionnaire';
import { TaskMap, Id as TaskId, Task } from '../../stores/tasks';
import { getNewlyRecommendedTasks } from '../../selectors/tasks/get_newly_recommended_tasks';
import { rejectTasksWithIds } from '../../selectors/tasks/reject_tasks_with_ids';
import { getLocalizedText, Locale } from '../../selectors/locale/get_localized_text';
import { textStyles, colors, values, applicationStyles } from '../../application/styles';
import { arrivalAdvisorGlyphLogo } from '../../application/images';
import { stripMarkdown } from '../strip_markdown/strip_markdown';
import { recommendedIconName, recommendedIconType } from '../recommended_topics/recommended_topics_component';

export interface NewTopicsModalProps {
    readonly oldAnswers: AnswersMap;
    readonly newAnswers: AnswersMap;
    readonly topics: TaskMap;
    readonly savedTopicIds: ReadonlyArray<TaskId>;
    readonly locale: Locale;
    readonly history: History;
    readonly isVisible: boolean;
}

export interface NewTopicsModalActions {
    readonly onModalButtonPress: () => void;
}

type Props = NewTopicsModalProps & NewTopicsModalActions;

const logoSize = Dimensions.get('screen').width / 7;
const maxListHeight = Dimensions.get('window').height / 1.85;

export const NewTopicsModalComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <Modal isVisible={props.isVisible}>
        <View
            padder
            style={{
                backgroundColor: colors.white,
                borderRadius: values.lessRoundedBorderRadius,
            }}
        >
            <ContentComponent {...props} />
            <ButtonComponent {...props} />
        </View>
    </Modal>
);

const ContentComponent = (props: Props): JSX.Element => {
    const topics = getTopicsForModal(props);
    return (
        <View style={{ backgroundColor: colors.white }}>
            <Image
                source={arrivalAdvisorGlyphLogo}
                resizeMode={'contain'}
                style={{
                    width: logoSize,
                    height: logoSize,
                    marginVertical: 15,
                    alignSelf: 'center',
                }}
            />
            {topics.length > 0 ?
                <ContentWithTopicsComponent topics={topics} />
                :
                <ContentWithoutTopicsComponent />
            }
        </View>
    );
};

const ContentWithTopicsComponent = (props: { readonly topics: ReadonlyArray<PartialTopic> }): JSX.Element => (
    <View>
        <View style={{ padding: 10 }}>
            <Text style={textStyles.headlineH2StyleBlackLeft}>
                <Trans>Number of new topics recommended based on your answers:</Trans>
                <Text style={[textStyles.headlineH2StyleBlackLeft, { color: colors.teal }]}>
                    {' ' + props.topics.length}
                </Text>
            </Text>
        </View>
        <View style={{ maxHeight: maxListHeight, overflow: 'hidden' }}>
            <FlatList
                data={props.topics}
                renderItem={renderTopicItem}
                keyExtractor={(topic: Task): string => topic.id}
            />
        </View>
    </View>
);

const ContentWithoutTopicsComponent = (): JSX.Element => (
    <View style={{ padding: 10 }}>
        <Text style={textStyles.headlineH2StyleBlackCenter}>
            <Trans>No new topics recommended based on your answers.</Trans>
        </Text>
    </View>
);

const ButtonComponent = (props: Props): JSX.Element => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
        }}
    >
        <Button
            style={[
                applicationStyles.tealButton,
                applicationStyles.boxShadowBelow,
                { paddingHorizontal: 20 },
            ]}
            onPress={props.onModalButtonPress}
        >
            <Text style={textStyles.button}>
                <Trans>OK</Trans>
            </Text>
        </Button>
    </View>
);

const renderTopicItem = ({ item }: ListRenderItemInfo<PartialTopic>): JSX.Element => (
    <View
        style={{
            backgroundColor: colors.lightGrey,
            borderRadius: values.lessRoundedBorderRadius,
            padding: 10,
            marginVertical: 3,
        }}
    >
        <View style={{ flex: 4, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <View>
                    <Text numberOfLines={2} style={textStyles.headlineH4StyleBlackLeft}>
                        {item.title}
                    </Text>
                    <Text note numberOfLines={1} style={{ textAlign: 'left' }}>
                        {stripMarkdown(item.description)}
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Icon
                    style={{
                        fontSize: values.smallerIconSize,
                        color: colors.lightTeal,
                        marginRight: 3,
                    }}
                    name={recommendedIconName}
                    type={recommendedIconType}
                />
            </View>
        </View>
    </View>
);

interface PartialTopic {
    readonly id: string;
    readonly title: string;
    readonly description: string;
}

const getTopicsForModal = (props: Props): ReadonlyArray<PartialTopic> => {
    const newlyRecommendedTopics = getNewlyRecommendedTasks(props.oldAnswers, props.newAnswers, props.topics);
    const newlyRecommendedUnsavedTopics = rejectTasksWithIds(newlyRecommendedTopics, props.savedTopicIds);
    return R.map((topic: Task) => buildPartialTopic(topic, props.locale), newlyRecommendedUnsavedTopics);
};

const buildPartialTopic = (topic: Task, locale: Locale): PartialTopic => (
    {
        id: topic.id,
        title: getLocalizedText(locale, topic.title),
        description: getLocalizedText(locale, topic.description),
    }
);
