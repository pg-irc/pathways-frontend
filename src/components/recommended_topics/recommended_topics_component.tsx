import React from 'react';
import { I18nManager } from 'react-native';
import { Trans } from '@lingui/react';
import { Id as TaskId } from '../../stores/topics';
import { View, Text, Picker, Icon } from 'native-base';
import { TopicListItem } from '../../selectors/topics/topic_list_item';
import { TaskListActions } from '../topics/task_list_component';
import { TaskListComponent, NoTasksRecommendedComponent } from '../topics/task_list_component';
import { RouterProps } from '../../application/routing';
import { textStyles, colors, values } from '../../application/styles';
import {
    CallToActionFullComponent, CallToActionFullSubComponent,
    CallToActionPartialComponent, CallToActionPartialSubComponent,
} from './call_to_action';
import { RecommendedIconComponent } from './recommended_icon_component';
import { buildTopicsListItemsWithHeadings } from '../topics/build_topic_list_items_with_headings';
import { LocaleInfo, Locale } from '../../locale';
import { SaveLocaleRequestAction } from '../../stores/locale/actions';

export interface RecommendedTopicsProps {
    readonly hasChosenAnswers: boolean;
    readonly savedTopicsIdList: ReadonlyArray<TaskId>;
    readonly recommendedTopics: ReadonlyArray<TopicListItem>;
    readonly currentLocale: Locale;
    readonly availableLocales: ReadonlyArray<LocaleInfo>;
}

export interface LocaleActions {
    readonly setLocale: (localeCode: string) => SaveLocaleRequestAction;
}

type Props = RecommendedTopicsProps & TaskListActions & RouterProps & LocaleActions;

export const RecommendedTopicsComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => (
    <TaskListComponent
        {...props}
        tasks={buildTopicsListItemsWithHeadings(props.recommendedTopics)}
        savedTasksIdList={props.savedTopicsIdList}
        emptyTaskListContent={<NoTasksRecommendedComponent />}
        headerContent={<TaskListHeaderComponent {...props} />}
    />
);

const LocaleSwitcher = (props: Props): JSX.Element => {
    const handleChange = (localeCode: string): void => {
        if (localeCode !== props.currentLocale.code ) {
            props.setLocale(localeCode);
        }
    };

    const returnRTLstatus = (props: Props) => {
        if (I18nManager.isRTL) {
            if (props.currentLocale.code === 'ar') {
                return 'Orientation is correct: ' + props.currentLocale.code + ' in RTL';
            } else {
                return 'Orientation is wrong: ' + props.currentLocale.code + ' in RTL';
            }
        } else {
            if (props.currentLocale.code === 'ar') {
                return 'Orientation is wrong: ' + props.currentLocale.code + ' in LTR';
            } else {
                return 'Orientation is correct: ' + props.currentLocale.code + ' in LTR';
            }
        }
    };

    return(
        <View>
        <Text>
            {returnRTLstatus(props)}
        </Text>
        <Picker
            mode='dropdown'
            iosIcon={<Icon name='ios-arrow-down' />}
            selectedValue={props.currentLocale.code}
            onValueChange={handleChange}
            style={{ backgroundColor: colors.white }}
        >
            {props.availableLocales.map((locale: LocaleInfo) => (
                <Picker.Item key={locale.code} label={locale.label} value={locale.code} />
            ))}
        </Picker>
        </View>
    );
};

const TaskListHeaderComponent = (props: Props): JSX.Element => (
    <View>
        <View
            padder
            style={{
                backgroundColor: colors.white,
            }}
        >
            <LocaleSwitcher {...props} />
            <Text
                style={[
                    textStyles.headlineH1StyleBlackLeft,
                    {
                        marginBottom: 10,
                        paddingHorizontal: values.backgroundTextPadding,
                    },
                ]}
            >
                <Trans>Start settling in B.C.</Trans>
            </Text>
            {props.hasChosenAnswers ?
                <CallToActionPartialComponent {...props} />
                :
                <CallToActionFullComponent {...props} />
            }
        </View>
        <View padder style={{ backgroundColor: colors.lightGrey }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                    style={[
                        textStyles.headlineH2StyleBlackLeft,
                        {
                            marginVertical: 15,
                            marginRight: 5,
                            paddingHorizontal: values.backgroundTextPadding,
                        },
                    ]}
                >
                    <Trans>Recommended for you</Trans>
                </Text>
                <RecommendedIconComponent />
            </View>
            {props.hasChosenAnswers ?
                <CallToActionPartialSubComponent />
                :
                <CallToActionFullSubComponent />
            }
        </View>
    </View>
);
