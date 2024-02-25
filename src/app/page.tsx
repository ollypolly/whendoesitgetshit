"use client";

import { Button } from "@/ui/button";
import styles from "./page.module.css";
import { getSeasonRatings } from "@/api";

export default function Home() {
  const handleClick = () => {
    console.log(getSeasonRatings(615));
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>When does it get shit?</h1>
      <Button onClick={handleClick}>Search</Button>
    </main>
  );
}
