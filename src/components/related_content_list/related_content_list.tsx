import React from 'react';
import { View, Text } from 'native-base';
import { applicationStyles } from '../../application/styles';
import { Trans } from '@lingui/react';

export interface RelatedContentListProps {
    readonly title: string;
    readonly component: React.StatelessComponent;
    readonly componentProps: object;
}
export interface RelatedContentListActions {
}
export type AllRelatedContentListProps = RelatedContentListProps & RelatedContentListActions;

export const RelatedContentList: React.StatelessComponent<AllRelatedContentListProps> =
    (props: AllRelatedContentListProps): JSX.Element => {
        const ListComponent = props.component;
        return (
            <View>
                <View style={applicationStyles.hr} />
                <Text style={applicationStyles.bold}><Trans>{props.title}</Trans></Text>
                <ListComponent {...props.componentProps} />
            </View>
        );
    };
