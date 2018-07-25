import React from 'react';
import { Content, View, Text, Icon } from 'native-base';
import { Article } from '../../selectors/articles';
import { Id as TaskId } from '../../stores/tasks';
import { TaskListItemActions } from '../tasks/task_list_item';
import { RouterProps } from '../../application/routing';
import { ImageBackground } from 'react-native';
import { colors } from '../../application/styles';

export interface ArticleDetailProps {
    readonly article: Article;
    readonly savedTasks: ReadonlyArray<TaskId>;
}

type AllArticleDetailProps = ArticleDetailProps & TaskListItemActions & RouterProps;

export const ArticleDetailComponent: React.StatelessComponent<AllArticleDetailProps> =
    (props: AllArticleDetailProps): JSX.Element => (
        <Content padder>
            <View style={[
                {
                    flexDirection: 'column',
                    alignItems: 'stretch',
                }]} >
                <TitleComponent {...props} />
                <ContentComponent {...props} />
            </View>
        </Content>
    );

// tslint:disable-next-line:no-var-requires
const sectionImage = require('../../../assets/images/icon.png');

const TitleComponent: React.StatelessComponent<AllArticleDetailProps> =
    (props: AllArticleDetailProps): JSX.Element => (
        <View>
            <ImageBackground
                source={sectionImage}
                style={[
                    { width: '100%' },
                ]}>
                <View style={[
                    { flexDirection: 'row' },
                    { alignItems: 'flex-end' },
                    { backgroundColor: 'rgba(0,0,0,0.4)' },
                    { marginTop: 120 },
                ]}>
                    <TitleTextComponent {...props} />
                    <HeartButton />
                    <ShareButton />
                </View>
                <View style={[
                    { flexDirection: 'row' },
                    { alignItems: 'center' },
                    { backgroundColor: 'rgba(0,0,0,0.4)' },
                ]}>
                    <IconComponent {...props} />
                    <LabelComponent {...props} />
                </View>
            </ImageBackground>
        </View>
    );

const TitleTextComponent: React.StatelessComponent<AllArticleDetailProps> =
    (props: AllArticleDetailProps): JSX.Element => (
        <Text style={[
            { flex: 1 },
            { color: colors.white },
            { fontWeight: 'bold' },
            { fontSize: 30 },
            { marginLeft: 20 },
            { marginRight: 20 },
        ]}>{props.article.title}</Text>
    );

const HeartButton: React.StatelessComponent = (): JSX.Element => (
    <Icon type='MaterialCommunityIcons' name='heart-outline' style={[
        { color: colors.white },
        { alignSelf: 'flex-end' },
        { marginRight: 20 },
        { marginBottom: 20 },
    ]} />
);

const ShareButton: React.StatelessComponent = (): JSX.Element => (
    <Icon name='share' style={[
        { color: colors.white },
        { alignSelf: 'flex-end' },
        { marginRight: 20 },
        { marginBottom: 20 },
    ]} />
);

const IconComponent: React.StatelessComponent<AllArticleDetailProps> =
    (props: AllArticleDetailProps): JSX.Element => (
        <Icon type='MaterialCommunityIcons' name={props.article.exploreSection.icon} style={[
            { color: colors.white },
            { fontSize: 30 },
            { marginTop: 20 },
            { marginLeft: 20 },
            { marginRight: 20 },
            { marginBottom: 20 },
        ]} />
    );

const LabelComponent: React.StatelessComponent<AllArticleDetailProps> =
    (props: AllArticleDetailProps): JSX.Element => (
        <Text style={[
            { flex: 1 },
            { color: colors.white },
            { fontWeight: 'bold' },
            { fontSize: 20 },
        ]}>{props.article.exploreSection.name}</Text>
    );

const ContentComponent: React.StatelessComponent<AllArticleDetailProps> = (props: AllArticleDetailProps): JSX.Element => (
    <Text style={[
        { marginTop: 20 },
        { marginLeft: 20 },
        { marginRight: 20 },
        { marginBottom: 20 },
    ]}>{props.article.description}</Text>
);
