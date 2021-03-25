// tslint:disable:no-class readonly-keyword no-this no-expression-statement
import { aBoolean, aLatLong } from '../../../application/helpers/random_test_values';
import { RegionCode } from '../../../validation/region/types';
import { LatLong } from '../../../validation/latlong/types';
import { UserProfileStore } from '../../user_profile';

export class UserProfileBuilder {
    region: RegionCode = undefined;
    showOnboarding: boolean = true;
    customLatLong: LatLong = aLatLong();
    disableAnalytics: boolean = aBoolean();
    showPartialLocalizationMessage: boolean = aBoolean();
    showLinkAlerts: boolean = aBoolean();

    withRegion(region: RegionCode): UserProfileBuilder {
        this.region = region;
        return this;
    }

    withShowOnboarding(showOnboarding: boolean): UserProfileBuilder {
        this.showOnboarding = showOnboarding;
        return this;
    }

    withCustomLatLong(customLatLong: LatLong): UserProfileBuilder {
        this.customLatLong = customLatLong;
        return this;
    }

    withDisableAnalytics(disableAnalytics: boolean): UserProfileBuilder {
        this.disableAnalytics = disableAnalytics;
        return this;
    }

    withShowPartialLocalizationMessage(showPartialLocalizationMessage: boolean): UserProfileBuilder {
        this.showPartialLocalizationMessage = showPartialLocalizationMessage;
        return this;
    }

    withShowLinkAlerts(showLinkAlerts: boolean): UserProfileBuilder {
        this.showLinkAlerts = showLinkAlerts;
        return this;
    }

    build(): UserProfileStore {
        return {
            region: this.region,
            showOnboarding: this.showOnboarding,
            customLatLong: this.customLatLong,
            disableAnalytics: this.disableAnalytics,
            showPartialLocalizationMessage: this.showPartialLocalizationMessage,
            showLinkAlerts: this.showLinkAlerts,
        };
    }
}
