// tslint:disable:no-expression-statement
import { stripMarkdown } from '../strip_markdown';

describe('strip markdown', () => {

    it ('strips number sign followed followed by a space', () => {
        expect(stripMarkdown('# Heading')).toEqual('Heading');
    });

    it ('does not strip number sign not followed by a space', () => {
        expect(stripMarkdown('#Heading')).toEqual('#Heading');
    });

    it ('strips double number sign followed by a space', () => {
        expect(stripMarkdown('## Heading')).toEqual('Heading');
    });

    it ('does not strip double number sign not followed by a space', () => {
        expect(stripMarkdown('##Heading')).toEqual('##Heading');
    });

    it ('strips star characters', () => {
        expect(stripMarkdown('*Italic*')).toEqual('Italic');
        expect(stripMarkdown('**Bold**')).toEqual('Bold');
    });
});