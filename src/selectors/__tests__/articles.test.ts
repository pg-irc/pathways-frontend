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
            denormalizedArticle = selector.denormalizeArticle(locale, article, [], []);
        });

        test('title property', () => {
            expect(denormalizedArticle.title).toBe(article.title[locale.code]);
        });

        test('description property', () => {
            expect(denormalizedArticle.description).toBe(article.description[locale.code]);
        });

        test('taxonomy terms property', () => {
            expect(denormalizedArticle.taxonomyTerms).toBe(article.taxonomyTerms);
        });

        test('starred property', () => {
            expect(denormalizedArticle.starred).toBe(article.starred);
        });

    });
});
