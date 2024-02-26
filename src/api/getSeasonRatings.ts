import { Season, getShowDetails } from "./getShowDetails";

type SeasonRatings = Season[];

// TODO Fix issue where futurama returns 0 as the maxDropoff and undefined in the app
export const getSeasons = async (seriesId: number) => {
  const showDetails = await getShowDetails(seriesId);
  let seasonRatings: SeasonRatings =
    showDetails.seasons.map((season) => season) ?? [];

  // Remove first index if the rating is 0
  if (seasonRatings[0].vote_average === 0) {
    // remove
    seasonRatings.shift();
  }

  return seasonRatings;
};
