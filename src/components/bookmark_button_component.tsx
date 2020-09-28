// tslint:disable:no-expression-statement
import React from 'react';
import { Icon, Button } from 'native-base';
import { I18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { BookmarkTopicAction, UnbookmarkTopicAction } from '../stores/topics';
import { values } from '../application/styles';
import { showToast } from '../application/toast';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../stores/services/actions';

export interface BookmarkButtonProps {
    readonly isBookmarked: boolean;
    readonly textColor: string;
}

export type AddBookmarkAction = BookmarkTopicAction | BookmarkServiceAction;
export type RemoveBookmarkAction = UnbookmarkTopicAction | UnbookmarkServiceAction;

export interface BookmarkButtonActions {
    readonly bookmark: () => AddBookmarkAction;
    readonly unbookmark: () => RemoveBookmarkAction;
}

type Props = BookmarkButtonProps & BookmarkButtonActions;

export const BookmarkButtonComponent = (props: Props): JSX.Element => (
    <I18n>
        {
            (({ i18n }: { readonly i18n: I18n }): JSX.Element =>
                <Button onPress={getBookmarkButtonOnPress(props, i18n)} transparent icon>
                    <BookmarkIcon {...props} />
                </Button>
            )
        }
    </I18n>
);

const BookmarkIcon = (props: Props): JSX.Element => (
    <Icon
        name={props.isBookmarked ? 'bookmark' : 'bookmark-o'}
        type='FontAwesome'
        style={{
            color: props.textColor,
            fontSize: values.mediumIconSize,
        }} />
);

type ButtonOnPress = () => void;

const getBookmarkButtonOnPress = (props: Props, i18n: I18n): ButtonOnPress => {
    if (props.isBookmarked) {
        return (): void => {
            props.unbookmark();
            showToast(i18n._(t`Bookmark removed`), 2000);
        };
    }
    return (): void => {
        props.bookmark();
        showToast(i18n._(t`Bookmark added`), 2000);
    };
};
