"use client";

import {
  Alert,
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
import { SeasonGraph } from "./components/SeasonGraph";
import { NumberParam, StringParam, useQueryParams } from "use-query-params";

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

    const seasons = await getSeasons(show.id);

    const maxDropoffSeason = getDropoff(seasons);

    if (maxDropoffSeason) {
      setDropoffSeason(maxDropoffSeason);
      setSeasons(seasons);
      setActiveIndex(maxDropoffSeason.season_number - 1);
    } else {
      setDropoffSeason(undefined);
      setActiveIndex(undefined);
      if (seasons.length > 0) {
        setSeasons(seasons);
      } else {
        setSeasons(undefined);
      }
    }
  };

  const handleSearch = async (value: string) => {
    setSearchTerm(value);

    const searchResults = await getSearchResults(value);
    setSearchResults(searchResults?.results);

    if (searchTerm === "") {
      setDropoffSeason(undefined);
      setShow(undefined);
      setSeasons(undefined);
      setActiveIndex(undefined);
      setSearchTerm(undefined);
    }

    return searchResults;
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

  const [searchResults, setSearchResults] = useState<Show[] | undefined>();
  const [seasons, setSeasons] = useState<Season[] | undefined>();

  const [query, setQuery] = useQueryParams({
    dropoffSeasonId: NumberParam,
    showId: NumberParam,
    searchTerm: StringParam,
    activeIndex: NumberParam,
  });
  const { dropoffSeasonId, activeIndex, searchTerm, showId } = query;

  const dropOffSeason = useMemo(() => {
    if (dropoffSeasonId && seasons) {
      return seasons.find((season) => season.season_number === dropoffSeasonId);
    }
  }, [dropoffSeasonId, seasons]);

  const setDropoffSeason = (season: Season | undefined) => {
    if (season) {
      setQuery({ dropoffSeasonId: season.season_number });
    } else {
      setQuery({ dropoffSeasonId: undefined });
    }
  };

  const setSearchTerm = (term?: string) => {
    setQuery({ searchTerm: term });
  };

  const show = useMemo(() => {
    if (showId) {
      return searchResults?.find((show) => show.id === showId);
    }
  }, [showId, searchResults]);

  const setShow = (show: Show | undefined) => {
    if (show) {
      setQuery({ showId: show.id });
    } else {
      setQuery({ showId: undefined });
    }
  };

  const setActiveIndex = (index?: number) => {
    setQuery({ activeIndex: index });
  };

  useEffect(() => {
    // If show is undefined then pull the seasons from the API
    if (searchTerm && showId) {
      handleSearch(searchTerm).then((searchResults) => {
        handleClick(searchResults?.results.find((show) => show.id === showId));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      component="main"
      sx={{
        padding: 2,
      }}
    >
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h4" fontWeight="bold">
            When does it get 💩?
          </Typography>
        </Box>
        <Box sx={{ width: "100px", display: "flex", justifyContent: "center" }}>
          <Tooltip title="Copy URL">
            <IconButton sx={{ alignSelf: "center" }}>
              <IosShare />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {!!dropOffSeason ? (
        <h2>
          {show?.name} gets shit in season {dropOffSeason.season_number}
        </h2>
      ) : (
        show && <h2>{show?.name} is consistent through it&rsquo;s run</h2>
      )}

      {!!seasons && !!show ? (
        <>
          <SeasonGraph seasons={seasons} dropOffSeason={dropOffSeason} />
          {activeIndex !== undefined && activeIndex !== null && (
            <Typography>Season data for Season {activeIndex + 1}</Typography>
          )}
        </>
      ) : (
        <Box
          sx={{
            p: 4,
          }}
        >
          <Alert variant="outlined" severity="info">
            No season data found
          </Alert>
        </Box>
      )}
      <TextField
        defaultValue={searchTerm}
        sx={{
          width: "100%",
        }}
        onChange={(event) => debouncedResults(event.target.value)}
        placeholder="Start typing TV Show to search..."
      />

      <Box component="section">{renderSearchResults()}</Box>
    </Box>
  );
}
