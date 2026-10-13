const pad = (value: number) => String(value).padStart(2, '0');

export const formatDuration = (durationMs?: number) => {
  if (durationMs === undefined || !Number.isFinite(durationMs) || durationMs < 0) return '-';

  const totalSeconds = Math.floor(durationMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
};
