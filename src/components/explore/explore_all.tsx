import React from 'react';
import { Content, Grid, Row, Col, Button, Icon, Text } from 'native-base';
import { ExploreSection } from '../../selectors/explore';
import { Trans } from '@lingui/react';
import * as R from 'ramda';
import { exploreStyles } from './styles';
import { computeUniqueKeyForSections } from './compute_unique_key_for_sections';
import { applicationStyles } from '../../application/styles';

export interface ExploreAllProps {
    readonly sections: ReadonlyArray<ExploreSection>;
}

export interface ExploreAllActions {
}

type AllExploreProps = ExploreAllProps & ExploreAllActions;

export const ExploreAllComponent: React.StatelessComponent<AllExploreProps> =
    (props: AllExploreProps): JSX.Element => {
        const sectionsGroupedIntoThrees = R.splitEvery(3, props.sections);
        return <Content padder>
            <Text style={applicationStyles.pageTitle}>Learn about:</Text>
            <Grid>
                {sectionsGroupedIntoThrees.map((sections: ReadonlyArray<ExploreSection>) => (
                    <Row key={computeUniqueKeyForSections(sections)}>
                        <RowOfSectionButtons sections={sections} />
                    </Row>
                ))}
            </Grid>
        </Content>;
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
