"use client";

import { Button } from "@/ui/button";
import styles from "./page.module.css";
import { getSeasonRatings } from "@/api/getSeasonRatings";

export default function Home() {
  const handleClick = async () => {
    console.log(await getSeasonRatings(615));
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>When does it get shit?</h1>
      <Button onClick={handleClick}>Search</Button>
    </main>
  );
}
