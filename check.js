import { toDays, isGoodDay, summarize } from "./logic.js";

const daily = {
  time: ["11-21", "11-22", "11-23", "11-24"],
  temperature_2m_max: [12, 10, 9, 14],
  precipitation_probability_max: [10, 30, 20, 45],
  wind_speed_10m_max: [6.2, 10, 14.5, 8],
};
const limits = { rain: 30, wind: 10 };

const days = toDays(daily);

console.log(days[0]);
console.log(isGoodDay(days[0], limits));
console.log(isGoodDay(days[1], limits));
console.log(isGoodDay(days[2], limits));
console.log(isGoodDay(days[3], limits));
console.log(summarize(days, limits));
console.log(summarize([], limits));
