// tslint:disable:readonly-keyword no-this no-expression-statement readonly-array no-class
import { LocalizedText } from '../../../locale';
import { aString, aBoolean } from '../../../application/__tests__/helpers/random_test_values';
import { Locale, LocaleInfo } from '../../../locale';
import { Store } from '../../locale';

export class LocaleInfoBuilder {
    code: string = aString();
    label: string = aString();
    isRTL: boolean = aBoolean();

    withCode(code: string): LocaleInfoBuilder {
        this.code = code;
        return this;
    }

    withLabel(label: string): LocaleInfoBuilder {
        this.label = label;
        return this;
    }

    withRTL(isRTL: boolean): LocaleInfoBuilder {
        this.isRTL = isRTL;
        return this;
    }

    build(): LocaleInfo {
        return {
            code: this.code,
            label: this.label,
            isRTL: this.isRTL,
        };
    }
}

export class LocaleBuilder {
    code: string = aString();
    fallback: string = aString();

    withCode(code: string): LocaleBuilder {
        this.code = code;
        return this;
    }

    withFallback(fallback: string): LocaleBuilder {
        this.fallback = fallback;
        return this;
    }

    build(): Locale {
        return {
            code: this.code,
            fallback: this.fallback,
        };
    }
}

export class LocalizedTextBuilder {

    localizations: LocalizedText;

    constructor(defaultLocaleCode: string = aString(), defaultLocaleText: string = aString()) {
        this.addLocale(defaultLocaleCode, defaultLocaleText);
    }

    addLocale(localeCode: string, localeText: string): LocalizedTextBuilder {
        this.localizations = {
            ...this.localizations,
            [localeCode]: localeText,
        };
        return this;
    }

    build(): LocalizedText {
        return this.localizations;
    }

}

export class LocaleStoreBuilder {

    locale: LocaleInfo = new LocaleInfoBuilder().build();
    availableLocales: ReadonlyArray<LocaleInfo> = [this.locale];
    code: string = this.locale.code;
    fallback: string = this.locale.code;
    loading: boolean = false;
    errorMessage: string = '';

    withLocales(locales: ReadonlyArray<LocaleInfo>): LocaleStoreBuilder {
        this.availableLocales = locales;
        return this;
    }

    withCode(code: string): LocaleStoreBuilder {
        this.code = code;
        return this;
    }

    withFallback(fallback: string): LocaleStoreBuilder {
        this.fallback = fallback;
        return this;
    }

    withLoading(loading: boolean): LocaleStoreBuilder {
        this.loading = loading;
        return this;
    }

    withErrorMessage(message: string): LocaleStoreBuilder {
        this.errorMessage = message;
        return this;
    }

    build(): Store {
        return {
            availableLocales: this.availableLocales,
            code: this.code,
            fallback: this.fallback,
            loading: this.loading,
            errorMessage: this.errorMessage,
        };
    }
}