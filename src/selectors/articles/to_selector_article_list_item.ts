import * as model from '../../stores/articles';
import * as R from 'ramda';
import { selectLocalizedText } from '../locale';
import { Locale } from '../../locale/types';
import { ArticleListItem } from '.';

export const toSelectorArticleListItem = R.curry((locale: Locale, article: model.Article): ArticleListItem => (
    {
        id: article.id,
        title: selectLocalizedText(locale, article.title),
        description: selectLocalizedText(locale, article.description),
    }
));
