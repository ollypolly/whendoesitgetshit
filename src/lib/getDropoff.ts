// Function that when given an array of seasons, calculates which season was the biggest dropoff in quality. Standard deviation of .5 is used as the threshold.
//
// @param seasons An array of seasons
// @returns The season number that had the biggest dropoff in quality

import { Season } from "@/api/getShowDetails";

export const getDropoff = (seasons: Season[]): Season | undefined => {
  let maxDropoff = 0;
  let maxDropoffSeason = 1;
  let hasFoundDropoff = false;
  let biggestDropoff = 0;
  let biggestDropoffSeason = 1;
  for (let i = 0; i < seasons.length - 1; i++) {
    const currentSeason = seasons[i];
    const nextSeason = seasons[i + 1];
    const dropoff = Math.abs(
      currentSeason.vote_average - nextSeason.vote_average
    );

    if (dropoff > biggestDropoff) {
      biggestDropoff = dropoff;
      biggestDropoffSeason = nextSeason.season_number;
    }

    // Set biggest dropoff

    if (dropoff > maxDropoff && !hasFoundDropoff && dropoff >= 0.5) {
      hasFoundDropoff = true;
      maxDropoff = dropoff;
      maxDropoffSeason = nextSeason.season_number;
    }
  }

  if (biggestDropoff < 0.5) {
    return seasons.find(
      (season) => season.season_number === biggestDropoffSeason
    );
  }

  console.log(maxDropoffSeason, "maxDropoffSeason");
  return seasons.find((season) => season.season_number === maxDropoffSeason);
};
