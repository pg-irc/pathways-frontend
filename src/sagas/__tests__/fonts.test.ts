// tslint:disable:no-expression-statement
import { Font } from 'expo';
import { call, put } from 'redux-saga/effects';

import { loadFontsActions } from '../../stores/fonts';
import { loadFonts } from '../fonts';

describe('the loadFonts saga', () => {

    const someFonts = {
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    };
    const theLoadFontsAction = loadFontsActions.request(someFonts);

    it('should dispatch a call effect with Expo.Font.loadAsync()', () => {
        const saga = loadFonts(theLoadFontsAction);
        expect(saga.next().value).toEqual(call(Font.loadAsync, someFonts));
    });

    it('should dispatch a put effect with a success action upon completion of call effect', () => {
        const saga = loadFonts(theLoadFontsAction);
        expect(saga.next().value).toEqual(call(Font.loadAsync, someFonts));
        expect(saga.next().value).toEqual(put(loadFontsActions.success(someFonts)));
    });

    it('should dispatch a failure action upon failure of call effect', () => {
        const loadFontsError = new Error('[test] Could not load fonts');
        const saga = loadFonts(theLoadFontsAction);
        expect(saga.next().value).toEqual(call(Font.loadAsync, someFonts));
        expect(saga.throw(loadFontsError).value).toEqual(put(loadFontsActions.failure(loadFontsError.message, someFonts)));
    });

});