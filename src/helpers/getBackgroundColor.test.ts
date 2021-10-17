import { getBackgroundColor } from './getBackgroundColor';

describe('getBackgroundColor (helper function)', () => {
  it('should return "#ad2a2c" as default color', async () => {
    expect(getBackgroundColor()).toEqual('#ad2a2c');
  });
  it('should return "#ad2a2c" as a wizard color', async () => {
    expect(getBackgroundColor('wizard')).toEqual('#ad2a2c');
  });
  it('should return "#802263" as a bard color', async () => {
    expect(getBackgroundColor('bard')).toEqual('#802263');
  });
  it('should return "#38a5c7" as a paladin color', async () => {
    expect(getBackgroundColor('paladin')).toEqual('#38a5c7');
  });
});
