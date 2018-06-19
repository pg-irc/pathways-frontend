
import { Content, Grid, Row, Col, Button, Icon, Text } from 'native-base';
import { ExploreSection } from '../../selectors/explore';
import { Trans } from '@lingui/react';
import * as R from 'ramda';
import { exploreStyles } from './styles';
import { computeUniqueKeyForSections } from './compute_unique_key_for_sections';
import { applicationStyles } from '../../application/styles';
import { Id } from '../../stores/explore';
import { SetExploreSectionPageAction } from '../../stores/page_switcher';

export interface ExploreAllProps {
    readonly sections: ReadonlyArray<ExploreSection>;
}

export interface ExploreAllActions {
    readonly goToExploreSection: (sectionId: Id) => SetExploreSectionPageAction;
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
                        <RowOfSectionButtons
                            sections={sections}
                            goToExploreSection={props.goToExploreSection}
                        />
                    </Row>
                ))}
            </Grid>
        </Content>;
    };

interface ButtonRowProps {
    readonly sections: ReadonlyArray<ExploreSection>;
}

const RowOfSectionButtons = (props: ButtonRowProps & ExploreAllActions): JSX.Element => (
    <Row>
        {props.sections.map((section: ExploreSection) => (
            <SectionButton
                key={section.id}
                id={section.id}
                name={section.name}
                icon={section.icon}
                goToExploreSection={props.goToExploreSection}
            />
        ))}
    </Row>
);

const SectionButton = (props: ExploreSection & ExploreAllActions): JSX.Element => (
    <Col>
        <Content style={exploreStyles.sectionButtonContent}>
            <Button block rounded light
                style={exploreStyles.sectionButton}
                onPress={(): SetExploreSectionPageAction => props.goToExploreSection(props.id)}>
                <Icon type='MaterialCommunityIcons' name={props.icon} style={{ fontSize: 60 }} />
            </Button>
            <Text style={exploreStyles.sectionButtonCaption}><Trans>{props.name}</Trans></Text>
        </Content>
    </Col >
);
