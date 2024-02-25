import axios from "axios";
import { API_TV } from "./constants";

export const getSeasonRatings = async (seriesId: number) => {
  const showDetails = await axios
    .get(`${API_TV}/${seriesId}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
      },
    })
    .then((response) => response);

  return showDetails;
};
