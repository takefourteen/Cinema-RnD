export function extractPathAndParams(urlString: string): string {
  const url = new URL(urlString);
  const path = url.pathname;
  const params = url.search; // This will include the "?" and any query parameters

  return `${path}${params}`;
}
