import React from 'react';
import { Image } from 'react-native';
import { Content, View, Text, Icon } from 'native-base';
import { Article } from '../../selectors/articles';
import { Id as TaskId } from '../../stores/tasks';
import { TaskListItemActions } from '../tasks/task_list_item';
import { RouterProps } from '../../application/routing';
import { EmptyComponent } from '../empty_component/empty_component';
import Markdown from 'react-native-markdown-renderer';
import { markdownStyles } from '../../application/styles';

export interface ArticleDetailProps {
    readonly article: Article;
    readonly savedTasks: ReadonlyArray<TaskId>;
}

type AllArticleDetailProps = ArticleDetailProps & TaskListItemActions & RouterProps;

export const ArticleDetailComponent: React.StatelessComponent<AllArticleDetailProps> =
    (props: AllArticleDetailProps): JSX.Element => (
        <Content padder>
            <View style={[
                { flexDirection: 'column' },
                { alignItems: 'stretch' },
            ]} >
                <TitleComponent {...props} />
                <ContentComponent {...props} />
            </View>
        </Content>
    );

// tslint:disable-next-line:no-var-requires
const sectionImage = require('../../../assets/images/icon.png');

const TitleComponent: React.StatelessComponent<AllArticleDetailProps> =
    (props: AllArticleDetailProps): JSX.Element => (
        <View style={[
            { flexDirection: 'column' },
            { alignItems: 'flex-start' },
        ]}>
            <Image source={sectionImage} style={[
                { width: '100%' },
                { flex: 1 },
            ]} />
            <View style={[
                { flexDirection: 'row' },
                { alignItems: 'flex-end' },
            ]}>
                <TitleTextComponent {...props} />
                {false ? <HeartButton /> : <EmptyComponent />}
                {false ? <ShareButton /> : <EmptyComponent />}
            </View>
            <View style={[
                { flexDirection: 'row' },
                { alignItems: 'center' },
            ]}>
                <IconComponent {...props} />
                <LabelComponent {...props} />
            </View>
        </View>
    );

const TitleTextComponent: React.StatelessComponent<AllArticleDetailProps> =
    (props: AllArticleDetailProps): JSX.Element => (
        <Text style={[
            { flex: 1 },
            { fontWeight: 'bold' },
            { fontSize: 30 },
            { marginLeft: 20 },
            { marginRight: 20 },
            { textAlign: 'left' },
        ]}>{props.article.title}</Text>
    );

const HeartButton: React.StatelessComponent = (): JSX.Element => (
    <Icon type='MaterialCommunityIcons' name='heart-outline' style={[
        { alignSelf: 'flex-end' },
        { marginRight: 20 },
        { marginBottom: 20 },
    ]} />
);

const ShareButton: React.StatelessComponent = (): JSX.Element => (
    <Icon name='share' style={[
        { alignSelf: 'flex-end' },
        { marginRight: 20 },
        { marginBottom: 20 },
    ]} />
);

const IconComponent: React.StatelessComponent<AllArticleDetailProps> =
    (props: AllArticleDetailProps): JSX.Element => (
        <Icon type='MaterialCommunityIcons' name={props.article.exploreSection.icon} style={[
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
            { fontWeight: 'bold' },
            { fontSize: 20 },
            { textAlign: 'left' },
        ]}>{props.article.exploreSection.name}</Text>
    );

const ContentComponent: React.StatelessComponent<AllArticleDetailProps> = (props: AllArticleDetailProps): JSX.Element => (
    <View style={[
        { marginTop: 20 },
        { marginLeft: 20 },
        { marginRight: 20 },
        { marginBottom: 20 },
    ]}>
        <Markdown style={markdownStyles}>
            {props.article.description}
        </Markdown>
    </View>
);
