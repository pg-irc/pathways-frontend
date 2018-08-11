import React from 'react';
import { Image } from 'react-native';
import { ListItem, Text, View } from 'native-base';
import { applicationStyles } from '../../application/styles';
import { ArticleListItem } from '../../selectors/articles/types';
import { RouterProps, Routes, goToRouteWithParameter } from '../../application/routing';

export interface ArticleListItemProps {
    readonly article: ArticleListItem;
}
type Props = ArticleListItemProps & RouterProps;

// tslint:disable-next-line:no-var-requires
const starImage = require('../../../assets/images/icon.png');

export const ArticleListItemComponent: React.StatelessComponent<Props> =
    (props: Props): JSX.Element => {
    const goToArticleDetail = goToRouteWithParameter(Routes.ArticleDetail, props.article.id, props.history);
    return (
        <ListItem noIndent noBorder button onPress={goToArticleDetail}>
            <View style={[ { flex: 1 }, { flexDirection: 'row' }, { alignItems: 'center' } ]}>
                <View style={[ { flex: 1 } ]}>
                    <Image source={starImage} style={[
                        { width: 50 },
                        { height: 50 },
                    ]} />
                </View>
                <View style={[ { flex: 4 }, { marginLeft: 10 } ]}>
                    <View style={[ { flexDirection: 'column' } ]}>
                        <Text style={[applicationStyles.bold, { textAlign: 'left' } ]}>
                            {props.article.title}
                        </Text>
                        <Text style={[{ textAlign: 'left' }]} numberOfLines={1} note>
                            {props.article.description}
                        </Text>
                    </View>
                </View>
            </View>
        </ListItem>
    );
};
