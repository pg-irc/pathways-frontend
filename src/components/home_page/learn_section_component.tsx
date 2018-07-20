import React from 'react';
import * as R from 'ramda';
import { Trans } from '@lingui/react';
import { Text, View } from 'native-base';
import { applicationStyles } from '../../application/styles';
import { SetExploreSectionPageAction } from '../../stores/page_switcher';
import { computeUniqueKeyForSections } from '../explore/compute_unique_key_for_sections';
import { ExploreSection } from '../../selectors/explore';
import { RowOfSectionButtons, SectionButton } from '../explore/explore_all';
import { HomePageProps, HomePageActions } from './props';
import { RouterProps, Routes, routePathWithArgument, routePath } from '../../application/routing';

type AllHomePageProps = I18nProps & HomePageProps & HomePageActions & RouterProps;

export const LearnSectionComponent: React.StatelessComponent<AllHomePageProps> = (props: AllHomePageProps): JSX.Element => {
    const sectionsGroupedIntoFour = R.splitEvery(4, R.slice(0, 8, props.sections));
    return <View>
        <Text style={applicationStyles.bold}><Trans>LEARN ABOUT</Trans></Text>
        {sectionsGroupedIntoFour.map((sections: ReadonlyArray<ExploreSection>) => (
            <RowOfSectionButtons
                key={computeUniqueKeyForSections(sections)}
                sections={sections}
                renderSectionButton={renderLearnButton(props)}
            />
        ))}
        <View style={applicationStyles.hr} />
    </View>;
};

const renderLearnButton = R.curry((props: AllHomePageProps, section: ExploreSection): JSX.Element => {
    // TODO Improve the "more" functionality once designs are nailed down
    return section.id === 's8' ? renderLearnMoreButton(props) : renderLearnSectionButton(props, section);
});

const renderLearnSectionButton = (props: AllHomePageProps, section: ExploreSection): JSX.Element => {
    const goToExploreSection = (): SetExploreSectionPageAction => {
        // tslint:disable-next-line:no-expression-statement
        props.history.push(routePathWithArgument(Routes.LearnDetail, section.id));
        return props.goToExploreSection(section.id);
    };
    const style = { height: 70 };
    const buttonProps = { onPress: goToExploreSection, buttonStyle: style, ...section };
    return <SectionButton {...buttonProps} />;
};

const renderLearnMoreButton = (props: AllHomePageProps): JSX.Element => {
    const i18n = props.i18n;
    const goToExplorePage = (): void => props.history.push(routePath(Routes.Learn));
    const style = { height: 70 };
    const buttonProps = { onPress: goToExplorePage, icon: 'apps', name: i18n.t`More`, buttonStyle: style };
    return <SectionButton {...buttonProps} />;
};
