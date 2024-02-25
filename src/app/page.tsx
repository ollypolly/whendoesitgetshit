"use client";

import { Button } from "@/ui/button";
import styles from "./page.module.css";
import { getSeasons } from "@/api/getSeasonRatings";
import { getDropoff } from "@/lib/getDropoff";

export default function Home() {
  const handleClick = async () => {
    const seasonRatings = await getSeasons(615);

    const maxDropoff = getDropoff(seasonRatings);

    console.log(maxDropoff);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>When does it get shit?</h1>

      <Button onClick={handleClick}>Search</Button>
    </main>
  );
}
