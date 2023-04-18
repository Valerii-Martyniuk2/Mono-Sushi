import { UpperPipe } from './upper.pipe';

describe('UpperPipe', () => {
  let upperText = new UpperPipe();

  it('create an instance', () => {
    expect(upperText).toBeTruthy();
  });

  it('transform text', () => {
    expect(upperText.transform('hallo')).toBe('Hallo');
  });

  it('transform doesnt text', () => {
    expect(upperText.transform('')).toBe('');
  });

});
