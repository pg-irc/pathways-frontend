import { connect } from 'react-redux';
import { I18nProvider } from '@lingui/react';
import { Store } from '../../stores';
import { selectLocale } from '../../selectors/locale/select_locale';
import { CatalogsMap, Locales } from '../../application/locales';

interface Props {
    readonly catalogs: CatalogsMap;
    readonly language: string;
}

interface Actions { }

const mapStateToProps = (appStore: Store): Props => ({
    catalogs: Locales.catalogsMap(),
    language: selectLocale(appStore),
});

const mapDispatchToProps = (): Actions => ({});

export const ConnectedI18nProvider = connect(mapStateToProps, mapDispatchToProps)(I18nProvider);
