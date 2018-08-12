import * as model from '../../stores/articles';
import * as R from 'ramda';
import { getLocalizedText } from '../locale/get_localized_text';
import { Locale } from '../../locale/types';
import { ArticleListItem } from './types';

export const toSelectorArticleListItem = R.curry((locale: Locale, article: model.Article): ArticleListItem => (
    {
        id: article.id,
        title: getLocalizedText(locale, article.title),
        description: getLocalizedText(locale, article.description),
    }
));
