"use client";

import {
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { getSeasons } from "@/api/getSeasonRatings";
import { getDropoff } from "@/lib/getDropoff";
import { useEffect, useMemo, useState } from "react";
import { Season } from "@/api/getShowDetails";
import debouce from "lodash.debounce";
import { getSearchResults } from "@/api/getSearchResults";
import { IosShare } from "@mui/icons-material";

type Show = {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export type ShowSearchResults = {
  page: number;
  results: Show[];
  total_pages: number;
  total_results: number;
};

export default function Home() {
  const theme = useTheme();

  const handleClick = async (show?: Show) => {
    if (!show) {
      return;
    }

    setShow(show);

    const seasonRatings = await getSeasons(show.id);

    const maxDropoffSeason = getDropoff(seasonRatings);

    if (maxDropoffSeason) {
      setDropoffSeason(maxDropoffSeason);
    } else {
      setDropoffSeason(undefined);
    }
  };

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    const searchResults = await getSearchResults(event.target.value);
    setSearchResults(searchResults?.results);

    if (searchTerm === "") {
      setDropoffSeason(undefined);
      setShow(undefined);
    }
  };

  const debouncedResults = useMemo(() => {
    return debouce(handleSearch, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  const renderSearchResults = () => {
    return searchResults?.map((show) => (
      <Button
        sx={{
          padding: "10px",
          margin: "10px",
        }}
        onClick={() => handleClick(show)}
        key={show.id}
      >
        {show.name}
      </Button>
    ));
  };

  const [dropoffSeason, setDropoffSeason] = useState<Season | undefined>();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [show, setShow] = useState<Show | undefined>();
  const [searchResults, setSearchResults] = useState<Show[] | undefined>();

  return (
    <Box component="main">
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: 1,
          marginBottom: 2,
          borderBottom: `2px ${theme.palette.background.paper} solid`,
        }}
      >
        <Box sx={{ width: "100px", display: "flex", justifyContent: "center" }}>
          <Typography variant="h3">When does it get 💩?</Typography>
        </Box>
        <Box sx={{ width: "100px", display: "flex", justifyContent: "center" }}>
          <Tooltip title="Copy URL">
            <IconButton sx={{ alignSelf: "center" }}>
              <IosShare />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {!!dropoffSeason ? (
        <h2>
          {show?.name} gets shit in season {dropoffSeason.season_number}
        </h2>
      ) : (
        show && <h2>{show?.name} is consistent through it&rsquo;s run</h2>
      )}
      <TextField
        onChange={debouncedResults}
        placeholder="Start typing TV Show to search..."
      />

      <Box component="section">{renderSearchResults()}</Box>
    </Box>
  );
}
