// tslint:disable: no-expression-statement
import React from 'react';
import { t } from '@lingui/macro';
import { EmptyComponent } from '../empty_component/empty_component';
import { showToast } from '../../application/toast';

interface ThankYouMessageOrEmptyProps {
    readonly i18n: I18n;
    readonly isSendingFeedback: boolean;
}

export const ThankYouMessageOrEmptyComponent = ({i18n, isSendingFeedback}: ThankYouMessageOrEmptyProps): JSX.Element => {
    if (isSendingFeedback) {
        showToast(i18n._(t`Thank you for your contribution!`), 3000);
    }
    return <EmptyComponent />;
};