import { getShowDetails } from "./getShowDetails";

type SeasonRatings = number[];

export const getSeasonRatings = async (seriesId: number) => {
  const showDetails = await getShowDetails(seriesId);
  const seasonRatings: SeasonRatings = showDetails.seasons.map(
    (season) => season.vote_average
  );
  return seasonRatings;
};
