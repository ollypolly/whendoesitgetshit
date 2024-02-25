"use client";

import { Button } from "@/ui/button";
import styles from "./page.module.css";
import { getSeasons } from "@/api/getSeasonRatings";
import { getDropoff } from "@/lib/getDropoff";
import { Input } from "@/ui/input";
import { useState } from "react";
import { Season } from "@/api/getShowDetails";

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

  const [seasonId, setSeasonId] = useState<number>(615);
  const [dropoffSeason, setDropoffSeason] = useState<Season | undefined>();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>When does it get shit?</h1>
      <Input
        value={seasonId}
        onChange={(event) => setSeasonId(parseFloat(event.target.value))}
      />
      {dropoffSeason !== undefined && (
        <p>
          {} It gets shit in season {dropoffSeason.season_number}
        </p>
      )}
      <Button onClick={handleClick}>Search</Button>
    </main>
  );
}
