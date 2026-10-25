import { formatDuration } from './formatters';

describe('formatDuration', () => {
  it.each([
    [0, '00:00'],
    [999, '00:00'],
    [1000, '00:01'],
    [59_000, '00:59'],
    [60_000, '01:00'],
    [754_000, '12:34'],
    [3_599_999, '59:59'],
  ])('formats %i ms as %s when under an hour', (durationMs, expected) => {
    expect(formatDuration(durationMs)).toBe(expected);
  });

  it.each([
    [3_600_000, '1:00:00'],
    [3_661_000, '1:01:01'],
    [45_296_000, '12:34:56'],
  ])('formats %i ms as %s when an hour or longer', (durationMs, expected) => {
    expect(formatDuration(durationMs)).toBe(expected);
  });

  it.each([undefined, -1, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    'returns "-" for invalid input %s',
    (durationMs) => {
      expect(formatDuration(durationMs)).toBe('-');
    },
  );
});
