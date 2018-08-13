// tslint:disable:no-let no-expression-statement
import * as model from '../../stores/articles';
import { ArticleBuilder } from '../../stores/__tests__/helpers/article_helpers';
import { LocaleBuilder } from '../../stores/__tests__/helpers/locale_helpers';
import { Locale } from '../../locale/types';
import { ExploreSectionBuilder } from './helpers/explore_section_helpers';
import { ExploreSection } from '../explore/types';
import { toSelectorArticle } from '../articles/to_selector_article';
import { Article } from '../articles/article';

describe('articles selector', () => {

    describe('denormalization', () => {
        let locale: Locale;
        let article: model.Article;
        let exploreSection: ExploreSection;
        let denormalizedArticle: Article;

        beforeEach(() => {
            locale = new LocaleBuilder().build();
            article = new ArticleBuilder().withLocaleCode(locale.code).build();
            exploreSection = new ExploreSectionBuilder().build();
            denormalizedArticle = toSelectorArticle(locale, article, exploreSection, [], []);
        });

        test('title property', () => {
            expect(denormalizedArticle.title).toBe(article.title[locale.code]);
        });

        test('description property', () => {
            expect(denormalizedArticle.description).toBe(article.description[locale.code]);
        });

        test('starred property', () => {
            expect(denormalizedArticle.starred).toBe(article.starred);
        });

        test('explore section', () => {
            expect(denormalizedArticle.exploreSection).toBe(exploreSection);
        });
    });
});
