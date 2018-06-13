import React from 'react';
import { Content, Grid, Row, Col, Button, Icon, Text } from 'native-base';
import { ExploreSection } from '../../selectors/explore';
import { Trans } from '@lingui/react';
import * as R from 'ramda';
import { paginate } from './paginate';
import { exploreStyles } from './styles';

export interface ExploreAllProps {
    readonly sections: ReadonlyArray<ExploreSection>;
}

export interface ExploreAllActions {
}

type AllExploreProps = ExploreAllProps & ExploreAllActions;

export const ExploreAllComponent: React.StatelessComponent<AllExploreProps> =
    (props: AllExploreProps): JSX.Element => {
        const sectionsGroupedIntoThrees = paginate(3, props.sections);
        return <Content>
            <Text>Learn about</Text>
            <Grid>
                {sectionsGroupedIntoThrees.map((sections: ReadonlyArray<ExploreSection>) => (
                    <Row key={computeUniqueKeyForSections(sections)}>
                        <RowOfSectionButtons sections={sections} />
                    </Row>
                ))}
            </Grid>
        </Content>;
    };

const computeUniqueKeyForSections = (sections: ReadonlyArray<ExploreSection>): string => {
    const names = R.pluck('name', sections);

    // why doesn't this work??
    // return R.reduce(R.concat, '', names);

    // tslint:disable-next-line:typedef
    return R.reduce((acc, name) => R.concat(acc, name), '', names);
};

interface ButtonRowProps {
    readonly sections: ReadonlyArray<ExploreSection>;
}

const RowOfSectionButtons = (props: ButtonRowProps): JSX.Element => (
    <Row>
        {props.sections.map((section: ExploreSection) => (
            <SectionButton key={section.name} name={section.name} icon={section.icon} />
        ))}
    </Row>
);

const SectionButton = (props: ExploreSection): JSX.Element => (
    <Col>
        <Content style={exploreStyles.sectionButtonContent}>
            <Button block rounded light style={exploreStyles.sectionButton}>
                <Icon type='MaterialCommunityIcons' name={props.icon} style={{ fontSize: 60 }} />
            </Button>
            <Text style={exploreStyles.sectionButtonCaption}><Trans>{props.name}</Trans></Text>
        </Content>
    </Col >
);
