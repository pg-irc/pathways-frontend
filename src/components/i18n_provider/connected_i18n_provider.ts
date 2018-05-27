import { connect } from 'react-redux';
import { Store } from '../../application/store';
import { I18nProvider, Props, Actions } from './i18n_provider';
import { catalogs } from '../../application/locales';

const mapStateToProps = (store: Store): Props => ({
    catalogs,
    language: store.applicationState.localeInStore.code,
});

const mapDispatchToProps = (): Actions => ({});

export const ConnectedI18nProvider = connect(mapStateToProps, mapDispatchToProps)(I18nProvider);
