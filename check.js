import { toDays, isGoodDay, summarize, reasons } from "./logic.js";

const daily = {
  time: ["11-21", "11-22", "11-23", "11-24"],
  temperature_2m_max: [12, 10, 9, 14],
  precipitation_probability_max: [10, 30, 20, 45],
  wind_speed_10m_max: [6.2, 10, 14.5, 8],
};
const limits = { rain: 30, wind: 10 };

const days = toDays(daily);

console.log(days[0]); // { date: '11-21', max: 12, wind: 6.2, rain: 10 }
console.log(isGoodDay(days[0], limits)); // true (둘 다 기준 아래)
console.log(isGoodDay(days[1], limits)); // true (강수 30, 풍속 10: 둘 다 기준과 같으면 통과)
console.log(isGoodDay(days[2], limits)); // false (풍속 14.5 만 넘음)
console.log(isGoodDay(days[3], limits)); // false (강수 45 만 넘음)
console.log(summarize(days, limits)); // good for a run on 2 of 4 days
console.log(summarize([], limits)); // good for a run on 0 of 0 days
console.log(reasons(days[0], limits)); // []
console.log(reasons(days[1], limits)); // [] (기준과 같으면 통과)
console.log(reasons(days[2], limits)); // [ 'wind' ]
console.log(reasons(days[3], limits)); // [ 'rain' ]
console.log(reasons({ date: "11-25", max: 8, wind: 11.2, rain: 57 }, limits)); // [ 'rain', 'wind' ] (둘 다 넘음, rain 이 먼저)
