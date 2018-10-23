import * as R from 'ramda';

export const stripMarkdown = (markdownString: string): string => {
    const headingsOrItalicOrBoldRegex = /(# )|(## )|(\*)/g;
    return R.replace(headingsOrItalicOrBoldRegex, '', markdownString);
};