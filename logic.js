// logic.js — 규칙. P3, P4, P7 에서 채웁니다.
//
// 상황: 화면 코드(main.js)와 규칙을 섞으면 규칙만 따로 확인할 수가 없습니다.
// 할 일: 아래 함수들을 만들어 export 합니다. 자세한 입력·출력은 각 문제 파일에 있습니다.
//       P3  toDays(daily)
//       P4  isGoodDay(day, limits), summarize(days, limits)
//       P7  reasons(day, limits)
// 약속: 순수 함수만 둡니다. 화면 요소, 네트워크 요청, 이 파일 밖의 변수를 쓰지 않습니다.
//       그래야 P6 에서 브라우저 없이 node 로 돌릴 수 있습니다.
// 커밋 메시지: p3: rows / p4: rule / p7: reasons

export function toDays(daily) {
  const days = [];
  
  for (let i = 0; i < daily.time.length; i++) {
    days.push({
      date: daily.time[i],
      max: daily.temperature_2m_max[i],
      wind: daily.wind_speed_10m_max[i],
      rain: daily.precipitation_probability_max[i]
    });
  }
  
  return days;
}

export function reasons(day, limits) {
  const result = [];
  if (day.rain > limits.rain) result.push("rain");
  if (day.wind > limits.wind) result.push("wind");
  return result;
}

export function isGoodDay(day, limits) {
  return reasons(day, limits).length === 0;
}

export function summarize(days, limits) {
  let goodCount = 0;

  for (let i = 0; i < days.length; i++) {
    if (isGoodDay(days[i], limits)) {
      goodCount++;
    }
  }

  return `good for a run on ${goodCount} of ${days.length} days`;
}