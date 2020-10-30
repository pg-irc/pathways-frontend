import React from 'react';
import { Content, View } from "native-base";
import { buildAnalyticsLinkContext } from "../../sagas/analytics/events";
import { AnalyticsLinkPressedAction, AnalyticsLinkProps } from "../../stores/analytics";
import { HumanOrganizationData } from "../../validation/organizations/types";
import { DividerComponent } from "../content_layout/divider_component";
import { MarkdownBodyComponent } from "../content_layout/markdown_body_component";
import { EmailComponent } from "../email/email_component";
import { WebsiteComponent } from "../website/website_component";

interface OrganizationDetailProps {
    readonly analyticsLinkPressed: (analyticsLinkProps: AnalyticsLinkProps) => AnalyticsLinkPressedAction;
    readonly currentPathForAnalytics: string;
    readonly organization: HumanOrganizationData;
}

export const OrganizationDetailComponent = (props: OrganizationDetailProps ): JSX.Element => (
    <Content>
        <MarkdownBodyComponent
            body={props.organization.description}
            shouldBeExpandable={true}
            // TODO Issue #1080 When organization detail page is online connect the following 2 states to the store/persisted data
            showLinkAlerts={true}
            hideLinkAlerts={console.log} />
        <DividerComponent />
        <OrganizationContactDetailsComponent
            organization={props.organization}
            analyticsLinkPressed={props.analyticsLinkPressed}
            currentPathForAnalytics={props.currentPathForAnalytics}
        />
    </Content>
);

const OrganizationContactDetailsComponent = (props: OrganizationDetailProps): JSX.Element => {
    const linkContextForAnalytics = buildAnalyticsLinkContext('Organization', props.organization.name);
    const currentPathForAnalytics = props.currentPathForAnalytics;
    return (
        <View>
            <WebsiteComponent
                website={props.organization.website}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={currentPathForAnalytics}
                analyticsLinkPressed={props.analyticsLinkPressed}
            />
            <DividerComponent />
            <EmailComponent
                email={props.organization.email}
                linkContextForAnalytics={linkContextForAnalytics}
                currentPathForAnalytics={currentPathForAnalytics}
                analyticsLinkPressed={props.analyticsLinkPressed}
            />
        </View>
    );
};

