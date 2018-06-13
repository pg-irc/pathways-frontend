import React from 'react';
import { Content, Grid, Row, Col, Button, Icon, Text } from 'native-base';
import { Trans } from '@lingui/react';
import { paginate } from './paginate';

interface ExploreButtonProps {
    readonly name: string;
    readonly icon: string;
}

const ExploreButton = (props: ExploreButtonProps): JSX.Element => (
    <Col>
        <Content style={{ width: 100, margin: 15 }}>
            <Button block rounded style={{ height: 100, width: 100 }}>
                <Icon type='MaterialCommunityIcons' name={props.icon} style={{ fontSize: 60 }} />
            </Button>
            <Text style={{ width: 80, textAlign: 'center' }}><Trans>{props.name}</Trans></Text>
        </Content>
    </Col >
);

interface ButtonRowProps {
    readonly sections: ReadonlyArray<ExploreButtonProps>;
}

const ButtonRow = (props: ButtonRowProps): JSX.Element => (
    <Row>
        {props.sections.map((section: ExploreButtonProps) => (
            <ExploreButton key={section.name} name={section.name} icon={section.icon} />
        ))}
    </Row>
);

export interface Props {
}

export interface Actions {
}

export const Component: React.StatelessComponent<Props & Actions> = (_: Props & Actions): JSX.Element => {
    const data: ReadonlyArray<ExploreButtonProps> = [
        { name: 'Settling in', icon: 'sign-direction' },
        { name: 'Education', icon: 'book-open-variant' },
        { name: 'Health care', icon: 'medical-bag' },
        { name: 'Money & banking', icon: 'currency-usd' },
        { name: 'Housing', icon: 'home' },
        { name: 'Employment', icon: 'briefcase' },
        { name: 'Legal system & immigration', icon: 'gavel' },
        { name: 'Driving', icon: 'car' },
        { name: 'Help for individuals & families', icon: 'account-group' },
    ];
    const pagedData = paginate(3, data);
    return <Content>
        <Grid>
            {pagedData.map((sections: ReadonlyArray<ExploreButtonProps>) => (
                <Row>
                    <ButtonRow sections={sections} />
                </Row>
            ))}
        </Grid>
    </Content>;
};
