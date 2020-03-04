import React from 'react';
import { TopicListItem } from '../../selectors/topics/types';
import { RouterProps } from '../../application/routing';
import { TabSwitcher } from './tab_switcher';
import { HumanServiceData } from '../../validation/services/types';
import { View, Text, Container } from 'native-base';
import { Trans, I18n } from '@lingui/react';
import { colors, textStyles, values } from '../../application/styles';
import { ReactI18nRenderProp } from '../../locale/types';
import { TaskListActions } from '../topics/task_list_component';

export interface BookmarksProps {
    readonly bookmarkedServices: ReadonlyArray<HumanServiceData>;
    readonly bookmarkedTopics: ReadonlyArray<TopicListItem>;
}

type Props = BookmarksProps & TaskListActions & RouterProps ;

export const BookmarksComponent: React.StatelessComponent<Props> = (props: Props): JSX.Element => {
    return (
        <Container style={{ backgroundColor: colors.lightGrey }}>
            <HeaderComponent/>
            <I18n>
                {(i18nRenderProp: ReactI18nRenderProp): JSX.Element => (
                    <TabSwitcher i18n={i18nRenderProp.i18n} {...props}/>
                )}
            </I18n>
        </Container>
    );
};

const HeaderComponent = (): JSX.Element => (
    <View padder style={{ backgroundColor: colors.white, paddingHorizontal: values.backgroundTextPadding }}>
        <Text style={textStyles.headlineH1StyleBlackLeft} >
            <Trans>My bookmarks</Trans>
        </Text>
        <Text style={textStyles.paragraphStyle}>
            <Trans>Save important topics and services to build your personal plan for settlement.</Trans>
        </Text>
    </View>
);