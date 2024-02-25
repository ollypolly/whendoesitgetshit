import { Season, getShowDetails } from "./getShowDetails";

type SeasonRatings = Season[];

export const getSeasons = async (seriesId: number) => {
  const showDetails = await getShowDetails(seriesId);
  const seasonRatings: SeasonRatings = showDetails.seasons.map(
    (season) => season
  );

  // Remove first index
  seasonRatings.shift();
  return seasonRatings;
};
