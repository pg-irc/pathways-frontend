// tslint:disable:readonly-keyword no-this no-expression-statement readonly-array no-class
import { aString } from '../../../application/helpers/random_test_values';
import { Catalog, LocaleCode } from '../../../application/locales';
import { LocaleStore } from '../../locale';
import { LocaleInfoWithCatalog } from '../../../application/locales';

export class LocaleInfoWithCatalogBuilder {
    code: string = aString();
    label: string = aString();
    catalog: Catalog = {};

    withCode(code: string): LocaleInfoWithCatalogBuilder {
        this.code = code;
        return this;
    }

    withLabel(label: string): LocaleInfoWithCatalogBuilder {
        this.label = label;
        return this;
    }

    withCatalog(catalog: Catalog): LocaleInfoWithCatalogBuilder {
        this.catalog = catalog;
        return this;
    }

    build(): LocaleInfoWithCatalog {
        return {
            code: this.code,
            label: this.label,
            catalog: this.catalog,
        };
    }
}

export const aLocale = (): LocaleCode => aString();

export class LocaleStoreBuilder {

    locale: LocaleCode = aString();
    availableLocales: ReadonlyArray<LocaleCode> = [this.locale];
    code: string = this.locale;
    loading: boolean = false;

    withLocales(locales: ReadonlyArray<LocaleCode>): LocaleStoreBuilder {
        this.availableLocales = locales;
        return this;
    }

    withCode(code: string): LocaleStoreBuilder {
        this.code = code;
        return this;
    }

    withLoading(loading: boolean): LocaleStoreBuilder {
        this.loading = loading;
        return this;
    }

    build(): LocaleStore {
        return {
            code: this.code,
            loading: this.loading,
        };
    }
}
