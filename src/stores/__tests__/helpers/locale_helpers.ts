// tslint:disable:readonly-keyword
// tslint:disable:no-this
// tslint:disable:no-expression-statement
// tslint:disable:readonly-array
// tslint:disable:no-class
import { LocalizedText } from '../../../locale';
import { aString, aBoolean } from '../../../application/__tests__/helpers/random_test_values';
import { Locale, LocaleInfo } from '../../../locale/types';

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

    constructor(defaultLocaleCode: string, defaultLocaleText: string) {
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