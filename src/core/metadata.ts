export function resolveTitle(
  segments: string | string[],
  title?: string,
): string {
  const prefix = Array.isArray(segments) ? segments.join(" - ") : segments;
  if (!title) return prefix;
  return `${title} | ${prefix}`;
}
