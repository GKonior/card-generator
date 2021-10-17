import { cardColors } from '../constants';

export const getBackgroundColor = (value = '') => {
  if (value) {
    return cardColors[value as keyof object];
  }
  return cardColors.wizard;
};
