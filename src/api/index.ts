import axios from "axios";

export const getTVShowRating = async (seriesId: string) => {
  const showDetails = await axios
    .get(`${API_TV}/${seriesId}`)
    .then((response) => response);

  return showDetails;
};
