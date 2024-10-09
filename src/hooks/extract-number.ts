export function extractEpisodeNumber(episodeUrls: string[]): number[] {
  return episodeUrls.map(url => {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 1], 10);
  });
}