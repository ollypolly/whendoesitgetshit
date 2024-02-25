"use client";

import { Button } from "@/ui/button";
import styles from "./page.module.css";
import { getSeasons } from "@/api/getSeasonRatings";
import { getDropoff } from "@/lib/getDropoff";
import { Input } from "@/ui/input";
import { useEffect, useMemo, useState } from "react";
import { Season } from "@/api/getShowDetails";
import debouce from "lodash.debounce";

type Show = {
  id: number;
  name: string;
};

type ShowSearchResult = Show[];

export default function Home() {
  const handleClick = async () => {
    const seasonRatings = await getSeasons(seasonId);

    const maxDropoffSeason = getDropoff(seasonRatings);

    console.log(maxDropoffSeason);

    if (maxDropoffSeason) {
      setDropoffSeason(maxDropoffSeason);
    } else {
      setDropoffSeason(undefined);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    console.log(event.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debouce(handleSearch, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  const renderSearchResults = () => {
    return searchResults?.map((show) => (
      <button key={show.id}>{show.name}</button>
    ));
  };

  const [seasonId, setSeasonId] = useState<number>(615);
  const [dropoffSeason, setDropoffSeason] = useState<Season | undefined>();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Show[] | undefined>();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>When does it get shit?</h1>
      <Input onChange={debouncedResults} />
      {renderSearchResults()}
      {dropoffSeason !== undefined && (
        <p>It gets shit in season {dropoffSeason.season_number}</p>
      )}
      <Button onClick={handleClick}>Search</Button>
    </main>
  );
}
