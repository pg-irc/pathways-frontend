// tslint:disable:no-expression-statement
import React from 'react';
import { Icon, Button, Toast } from 'native-base';
import { I18n } from '@lingui/react';
import { t } from '@lingui/macro';
import { BookmarkTopicAction, UnbookmarkTopicAction } from '../../stores/topics';
import { values, textStyles, applicationStyles } from '../../application/styles';
import { BookmarkServiceAction, UnbookmarkServiceAction } from '../../stores/services/actions';

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
    const toastProps = {
        style: applicationStyles.toast,
        textStyle: textStyles.toast,
    };
    if (props.isBookmarked) {
        return (): void => {
            props.unbookmark();
            Toast.show({
                ...toastProps,
                text: i18n._(t`Bookmark removed`),
            });
        };
    }
    return (): void => {
        props.bookmark();
        Toast.show({
            ...toastProps,
            text: i18n._(t`Bookmark added`),
        });
    };
};