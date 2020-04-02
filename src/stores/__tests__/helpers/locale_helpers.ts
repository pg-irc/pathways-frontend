// tslint:disable:readonly-keyword no-this no-expression-statement readonly-array no-class
import { LocalizedText } from '../../../locale';
import { aString } from '../../../application/random_test_values';
import { Locale, LocaleInfo } from '../../../locale';
import { LocaleStore } from '../../locale';

export class LocaleInfoBuilder {
    code: string = aString();
    label: string = aString();

    withCode(code: string): LocaleInfoBuilder {
        this.code = code;
        return this;
    }

    withLabel(label: string): LocaleInfoBuilder {
        this.label = label;
        return this;
    }

    build(): LocaleInfo {
        return {
            code: this.code,
            label: this.label,
        };
    }
}

export const aLocale = (): Locale => ({
    code: aString(),
    fallback: aString(),
});

export class LocalizedTextBuilder {

    localizations: LocalizedText;

    constructor() {
        this.addLocalizedText(aString(), aString());
    }

    addLocalizedText(localeCode: string, localeText: string): LocalizedTextBuilder {
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
    isSaved: boolean = true;
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

    withIsSaved(isSaved: boolean): LocaleStoreBuilder {
        this.isSaved = isSaved;
        return this;
    }

    withErrorMessage(message: string): LocaleStoreBuilder {
        this.errorMessage = message;
        return this;
    }

    build(): LocaleStore {
        return {
            availableLocales: this.availableLocales,
            code: this.code,
            fallback: this.fallback,
            loading: this.loading,
            isSaved: this.isSaved,
            errorMessage: this.errorMessage,
        };
    }
}
