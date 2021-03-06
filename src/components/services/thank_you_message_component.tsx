// tslint:disable: no-expression-statement
import React from 'react';
import { t } from '@lingui/macro';
import { EmptyComponent } from '../empty_component/empty_component';
import { showToast } from '../../application/toast';

interface ThankYouMessageProps {
    readonly i18n: I18n;
    readonly isVisible: boolean;
}

export const ThankYouMessageComponent = ({i18n, isVisible}: ThankYouMessageProps): JSX.Element => {
    if (isVisible) {
        showToast(i18n._(t`Thank you for your contribution!`), 3000);
    }
    return <EmptyComponent />;
};