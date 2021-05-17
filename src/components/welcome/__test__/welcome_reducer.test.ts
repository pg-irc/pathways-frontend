// tslint:disable:no-expression-statement typedef
import { aBoolean } from '../../../application/helpers/random_test_values';
import { getAvailableLocales } from '../../../application/locales';
import { RegionCode } from '../../../validation/region/types';
import { selectLocale, selectRegion } from '../action';
import { reducer } from '../index';
import { buildDefaultState, RegionLocaleStateBuilder } from './welcome_helper';

const aRegion = (): RegionCode => aBoolean() ? RegionCode.BC : RegionCode.MB;

describe('welcome reducer', () => {

    describe('the region code', () => {

        test('is undefined by default', () => {
            const state = buildDefaultState();
            expect(state.region).toBe(undefined);
        });

        test('is changed when a region is set from scratch', () => {
            const newRegion = aRegion();
            const oldState = new RegionLocaleStateBuilder().withRegion(undefined).build();
            const newState = reducer(oldState, selectRegion(newRegion));
            expect(newState.region).toBe(newRegion);
        });

        test('is changed when switching between region', () => {
            const oldRegion = RegionCode.BC;
            const newRegion = RegionCode.MB;
            const oldState = new RegionLocaleStateBuilder().withRegion(oldRegion).build();
            const newState = reducer(oldState, selectRegion(newRegion));
            expect(newState.region).toBe(newRegion);
        });
    });

    describe('the locale code', () => {

        test('is undefined by default', () => {
            const state = buildDefaultState();
            expect(state.locale).toBe(undefined);
        });

        test('is changed when a locale is set from scratch', () => {
            const newLocale = 'ar';
            const oldState = new RegionLocaleStateBuilder().withLocale(undefined).build();
            const newState = reducer(oldState, selectLocale(newLocale));
            expect(newState.locale).toBe(newLocale);
        });

        test('is changed when switching between locale', () => {
            const oldLocale = 'en';
            const newLocale = 'ar';
            const oldState = new RegionLocaleStateBuilder().withLocale(oldLocale).build();
            const newState = reducer(oldState, selectLocale(newLocale));
            expect(newState.locale).toBe(newLocale);
        });

        test('is reset when setting a new region', () => {
            const oldLocale = 'en';
            const oldRegion = RegionCode.BC;
            const newRegion = RegionCode.MB;
            const oldState = new RegionLocaleStateBuilder().withLocale(oldLocale).withRegion(oldRegion).build();
            const newState = reducer(oldState, selectRegion(newRegion));
            expect(newState.locale).toBe(undefined);
        });
    });

    describe('the available locales', () => {

        test('is empty array by default', () => {
            const state = buildDefaultState();
            expect(state.availableLocales).toStrictEqual([]);
        });

        test('locales available in BC', () => {
            const locales = getAvailableLocales(RegionCode.BC);

            expect(locales).toHaveLength(8);
            expect(locales).toContainEqual({ code: 'en', label: 'English' });
            expect(locales).toContainEqual({ code: 'ar', label: 'عربى' });
            expect(locales).toContainEqual({ code: 'fr', label: 'Français' });
            expect(locales).toContainEqual({ code: 'ko', label: '한국어' });
            expect(locales).toContainEqual({ code: 'pa', label: 'ਪੰਜਾਬੀ' });
            expect(locales).toContainEqual({ code: 'tl', label: 'Tagalog' });
            expect(locales).toContainEqual({ code: 'zh_CN', label: '简体中文' });
            expect(locales).toContainEqual({ code: 'zh_TW', label: '繁體中文' });
        });

        test('locales available in MB', () => {
            const locales = getAvailableLocales(RegionCode.MB);

            expect(locales).toHaveLength(1);
            expect(locales).toContainEqual({ code: 'en', label: 'English' });
        });

        test('is changed when switching between region', () => {
            const oldRegion = RegionCode.BC;
            const newRegion = RegionCode.MB;
            const oldState = new RegionLocaleStateBuilder().withRegion(oldRegion).build();
            const newState = reducer(oldState, selectRegion(newRegion));
            expect(newState.availableLocales).toStrictEqual(getAvailableLocales(newRegion));
        });
    });
});
