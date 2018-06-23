// tslint:disable:no-let no-expression-statement
import * as selector from '../articles';
import * as model from '../../stores/articles';
import { ArticleBuilder } from '../../stores/__tests__/helpers/article_helpers';
import { LocaleBuilder } from '../../stores/__tests__/helpers/locale_helpers';
import { Locale } from '../../locale/types';

describe('articles selector', () => {

    describe('denormalization', () => {
        let locale: Locale;
        let article: model.Article;
        let denormalizedArticle: selector.Article;

        beforeEach(() => {
            locale = new LocaleBuilder().build();
            article = new ArticleBuilder().withLocaleCode(locale.code).build();
            denormalizedArticle = selector.denormalizeArticle(locale, article);
        });

        test('name property', () => {
            expect(denormalizedArticle.name).toBe(article.name[locale.code]);
        });

        test('content property', () => {
            expect(denormalizedArticle.content).toBe(article.content[locale.code]);
        });

        test('is starred property', () => {
            expect(denormalizedArticle.isStarred).toBe(article.isStarred);
        });

    });
});
