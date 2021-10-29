import convertFeetToMeters from './convertFeetToMeters';

describe('convertFeetToMeters (helper function)', () => {
  it('should return 0.3 meters', async () => {
    expect(convertFeetToMeters(1)).toEqual(0.3);
  });
  it('should return 1.5 meters', async () => {
    expect(convertFeetToMeters(5)).toEqual(1.5);
  });
  it('should return 18.3 meters', async () => {
    expect(convertFeetToMeters(60)).toEqual(18.3);
  });
});
