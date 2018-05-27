import { connect } from 'react-redux';
import { I18nProvider } from '@lingui/react';
import { Store } from '../../application/store';

import { catalogs } from '../../application/locales';

interface Props {
    readonly catalogs: Catalogs;
    readonly language: string;
}

interface Actions {}

const mapStateToProps = ({ applicationState: { localeInStore } }: Store): Props => ({
    catalogs,
    language: localeInStore.code,
});
const mapDispatchToProps = (): Actions => ({});

export const ConnectedI18nProvider = connect(mapStateToProps, mapDispatchToProps)(I18nProvider);