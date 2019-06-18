import { buildQuestionnaireFixture } from '../../fixtures/buildFixtures';
import { ValidQuestionnaireStore } from './stores';

export const buildDefaultStore = (): ValidQuestionnaireStore => (
    buildQuestionnaireFixture()
);
