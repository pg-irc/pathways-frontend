import { connect } from 'react-redux';
import { I18nProvider } from '@lingui/react';
import * as app from '../../application/store';
import { selectLocale } from '../../selectors/locale';
import { CatalogsMap, LocaleManager } from '../../locale';

interface Props {
    readonly catalogs: CatalogsMap;
    readonly language: string;
}

interface Actions {}

const mapStateToProps = (appStore: app.Store): Props => ({
    catalogs: LocaleManager.catalogsMap,
    language: selectLocale(appStore).code,
});

const mapDispatchToProps = (): Actions => ({});

export const ConnectedI18nProvider = connect(mapStateToProps, mapDispatchToProps)(I18nProvider);