export const getTVShowRating = (seriesId: string) => {
  return fetch(`${API_TV}/${seriesId}`);
};
