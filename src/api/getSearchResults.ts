import axios from "axios";
import { API_TV_SEARCH } from "./constants";
import { ShowSearchResults } from "@/app/page";

export const getSearchResults = async (searchTerm: string) => {
  const searchResults = await axios.get(`${API_TV_SEARCH}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
    },
    params: {
      query: searchTerm,
    },
  });

  return searchResults.data as ShowSearchResults;
};
