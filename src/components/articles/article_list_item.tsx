import React from 'react';
import { ListItem, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { applicationStyles } from '../../application/styles';
import { ArticleListItem } from '../../selectors/articles';
import { RouterProps, Routes, routePathWithParameter } from '../../application/routing';

type AllArticleListItemProps = ArticleListItem & RouterProps;

export const ArticleListItemComponent: React.StatelessComponent<AllArticleListItemProps> =
    (props: AllArticleListItemProps): JSX.Element => {
    const goToArticleDetail = (): void => props.history.push(routePathWithParameter(Routes.ArticleDetail, props.id));
    return (
        <ListItem noIndent noBorder button onPress={goToArticleDetail}>
            <Grid>
                <Row>
                    <Col size={20}>
                        <Text>[image]</Text>
                    </Col>
                    <Col size={80}>
                        <Row>
                            <Text style={applicationStyles.bold}>{props.title}</Text>
                        </Row>
                        <Row>
                            <Text numberOfLines={1} note>{props.description}</Text>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        </ListItem>
    );
};
