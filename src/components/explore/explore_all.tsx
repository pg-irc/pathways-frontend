import React from 'react';
import * as R from 'ramda';
import { View, Content, Button, Icon, Text } from 'native-base';
import { ExploreSection } from '../../selectors/explore';
import { computeUniqueKeyForSections } from './compute_unique_key_for_sections';
import { applicationStyles } from '../../application/styles';
import { Id } from '../../stores/explore';
import { Trans } from '@lingui/react';
import { SetExploreSectionPageAction } from '../../stores/page_switcher';
import { RouterProps } from '../../application/routing';

export interface ExploreAllProps {
    readonly sections: ReadonlyArray<ExploreSection>;
}

export interface ExploreAllActions {
    readonly goToExploreSection: (sectionId: Id) => SetExploreSectionPageAction;
}

type AllExploreProps = ExploreAllProps & ExploreAllActions & RouterProps;

export const ExploreAllComponent: React.StatelessComponent<AllExploreProps> =
    (props: AllExploreProps): JSX.Element => {
        const sectionsGroupedIntoThrees = R.splitEvery(3, props.sections);
        const renderSectionButton = (section: ExploreSection): JSX.Element => (
            <SectionButton
                onPress={(): SetExploreSectionPageAction => props.goToExploreSection(section.id)}
                buttonStyle={{height: 100}}
                {...section}
            />
        );
        return <Content padder>
            <Text style={applicationStyles.pageTitle}><Trans>Learn about:</Trans></Text>
            <View style={[{flex: 1}]}>
                {sectionsGroupedIntoThrees.map((sections: ReadonlyArray<ExploreSection>) => (
                    <RowOfSectionButtons
                        key={computeUniqueKeyForSections(sections)}
                        sections={sections}
                        renderSectionButton={renderSectionButton}
                    />
                ))}
            </View>
        </Content>;
    };

interface ButtonRowProps {
    readonly sections: ReadonlyArray<ExploreSection>;
}

interface ButtonRowActions {
    readonly renderSectionButton: (section: ExploreSection) => JSX.Element;
}

export const RowOfSectionButtons = (props: ButtonRowProps & ButtonRowActions): JSX.Element => (
    <View style={[{flex: props.sections.length, flexDirection: 'row', justifyContent: 'space-evenly'}]}>
        {R.map((section: ExploreSection) => (
            <View key={section.id} style={[{flex: 1, margin: 10}]}>
                {props.renderSectionButton(section)}
            </View>
        ), props.sections)}
    </View>
);

interface SectionButtonProps {
    readonly icon: string;
    readonly name: string;
    readonly buttonStyle?: object;
}

interface SectionButtonActions {
    readonly onPress: () => void;
}

export const SectionButton = (props: SectionButtonProps & SectionButtonActions): JSX.Element => (
    <View>
        <Button block rounded light
            style={[props.buttonStyle]}
            onPress={props.onPress} >
            <Icon type='MaterialCommunityIcons' name={props.icon} style={{ fontSize: 40 }} />
        </Button>
        <Text style={[{textAlign: 'center'}]}>{props.name}</Text>
    </View>
);
