import { Season } from "@/api/getShowDetails";
import { useState } from "react";
import { BarChart, Bar, Cell, ResponsiveContainer, Tooltip } from "recharts";

type SeasonGraphProps = {
  seasons: Season[];
  dropOffSeason?: Season;
};

export const SeasonGraph = ({ seasons, dropOffSeason }: SeasonGraphProps) => {
  const data = seasons.map((season) => ({
    name: season.season_number,
    uv: season.vote_average * 10,
  }));

  const [activeIndex, setActiveIndex] = useState(
    (dropOffSeason?.season_number ?? 0) - 1 || 0
  );

  const handleClick = (data: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart width={150} height={40} data={data}>
        <Bar dataKey="uv" onClick={handleClick}>
          {data.map((entry, index) => (
            <Cell
              cursor="pointer"
              fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
              key={`cell-${index}`}
            />
          ))}
          <Tooltip />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
