import axios from "axios";
import { API_TV } from "./constants";

export type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type ShowDetails = {
  seasons: Season[];
};

export const getShowDetails = async (seriesId: number) => {
  const showDetails = await axios.get(`${API_TV}/${seriesId}`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
    },
  });

  return showDetails.data as ShowDetails;
};
