import { HumanServiceData } from '../../validation/services/types';

export const isReviewed = (service: HumanServiceData): boolean => service.reviewed;