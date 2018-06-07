// tslint:disable:readonly-keyword
// tslint:disable:no-this
// tslint:disable:no-expression-statement
// tslint:disable:readonly-array
// tslint:disable:no-class
import { Catalog, Locale, LocalizedText } from '../../../locale';
import { aString, aBoolean } from '../../../application/__tests__/helpers/random_test_values';

export class LocaleBuilder {

    code: string = aString();
    label: string = aString();
    catalog: Catalog = {};
    isRTL: boolean = aBoolean();

    withCode(code: string): LocaleBuilder {
        this.code = code;
        return this;
    }

    withLabel(label: string): LocaleBuilder {
        this.label = label;
        return this;
    }

    withCatalog(catalog: Catalog): LocaleBuilder {
        this.catalog = catalog;
        return this;
    }

    withRTL(isRTL: boolean): LocaleBuilder {
        this.isRTL = isRTL;
        return this;
    }

    build(): Locale {
        return {
            code: this.code,
            label: this.label,
            catalog: this.catalog,
            isRTL: this.isRTL,
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