import React from 'react';
import { ListItem, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { applicationStyles } from '../../application/styles';
import { ArticleListItem } from '../../selectors/articles';
import { RouterProps, Routes, goToRouteWithParameter } from '../../application/routing';

export interface ArticleListItemProps {
    readonly article: ArticleListItem;
}
type Props = ArticleListItemProps & RouterProps;

export const ArticleListItemComponent: React.StatelessComponent<Props> =
    (props: Props): JSX.Element => {
    const goToArticleDetail = goToRouteWithParameter(Routes.ArticleDetail, props.article.id, props.history);
    return (
        <ListItem noIndent noBorder button onPress={goToArticleDetail}>
            <Grid>
                <Row>
                    <Col size={20}>
                        <Text>[image]</Text>
                    </Col>
                    <Col size={80}>
                        <Row>
                            <Text style={[
                                applicationStyles.bold,
                                { textAlign: 'left' },
                            ]}>
                                {props.article.title}
                            </Text>
                        </Row>
                        <Row>
                            <Text style={[{ textAlign: 'left' }]} numberOfLines={1} note>{props.article.description}</Text>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        </ListItem>
    );
};
