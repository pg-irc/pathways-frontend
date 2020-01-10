// tslint:disable:no-expression-statement
import React from 'react';
import * as R from 'ramda';
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

export const BookmarkButtonComponent = (props: Props): JSX.Element => {
    const onButtonPress = props.isBookmarked ? onBookmarkedItemPressed(props.unbookmark) : onUnbookmarkedItemPressed(props.bookmark);
    return (
        <I18n>
            {
                (({ i18n }: any): JSX.Element =>
                    <Button onPress={onButtonPress(i18n)} transparent icon>
                        <BookmarkIcon {...props} />
                    </Button>
                )
            }
        </I18n>
    );
};

const BookmarkIcon = (props: Props): JSX.Element => (
    <Icon
        name={props.isBookmarked ? 'bookmark' : 'bookmark-o'}
        type='FontAwesome'
        style={{
            color: props.textColor,
            fontSize: values.mediumIconSize,
        }} />
);

type OnPress = () => void;

const onBookmarkedItemPressed = R.curry((unbookmark: () => RemoveBookmarkAction, i18n: I18n):
    OnPress => (): void => {
        unbookmark();
        Toast.show({
            text: i18n._(t`Bookmark removed`),
            style: applicationStyles.toast,
            textStyle: textStyles.toast,
        });
});

const onUnbookmarkedItemPressed = R.curry((bookmark: () => AddBookmarkAction, i18n: I18n):
    OnPress => (): void => {
        bookmark();
        Toast.show({
            text: i18n._(t`Bookmark added`),
            style: applicationStyles.toast,
            textStyle: textStyles.toast,
        });
});