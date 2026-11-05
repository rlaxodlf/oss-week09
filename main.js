// main.js — 화면 담당. P1 ~ P5, P7 에서 이어서 채웁니다.
//
// 상황: index.html 에 폼과 빈 표가 있고, 이 파일이 <script type="module"> 로 연결되어 있습니다.
//       아직 코드가 없어서 Check 를 누르면 페이지가 새로 고쳐지기만 합니다.
// 할 일: P1 Check 에 반응하기 → P2 예보 받기 → P3 표 그리기 → P4 좋은 날 표시
//       → P5 기준을 바꾸면 바로 다시 그리기 → P7 Why not 칸
// 실행: 터미널에서 npx serve . → 브라우저에서 http://localhost:3000
// 확인: 문제마다 problems/ 의 문제 파일 "확인"
// 커밋 메시지: p1: submit / p2: fetch / p3: rows / p4: rule / p5: live / p7: reasons
//
// 받아 오는 일은 api.js, 판단하는 규칙은 logic.js 에 둡니다. 이 파일에는 화면을 읽고 그리는 코드만.

// 주어짐: 도시 세 곳의 위도·경도. 키는 index.html <select> 의 option value 와 같습니다.
const CITIES = {
  seoul: { name: "Seoul", lat: 37.566, lon: 126.9784 },
  daejeon: { name: "Daejeon", lat: 36.3504, lon: 127.3845 },
  gangneung: { name: "Gangneung", lat: 37.7519, lon: 128.8761 },
};

// P1 부터 여기 아래에 씁니다.
import { getForecast } from './api.js';
import { toDays, isGoodDay, summarize } from "./logic.js";

const form = document.getElementById('run-form');
const citySelect = document.getElementById('city');
const rainInput = document.getElementById('rain-limit');
const windInput = document.getElementById('wind-limit');
const statusEl = document.getElementById('status');
const summaryEl = document.getElementById('summary');
const rowsEl = document.getElementById('rows');

// state는 전역 변수
const state = {
  city: null,
  days: [],
  limits: { rain: Number(rainInput.value), wind: Number(windInput.value) },
};

form.addEventListener('submit', async function(event) {
  event.preventDefault();
  const city = CITIES[citySelect.value];

  statusEl.classList.remove('error');
  statusEl.textContent = 'Loading...';

  try {
    const daily = await getForecast({ lat: city.lat, lon: city.lon });
    
    // 받아온 데이터를 state에 저장합니다.
    state.city = city;
    state.days = toDays(daily);
    state.limits = {
      rain: Number(rainInput.value),
      wind: Number(windInput.value)
    };
    statusEl.textContent = '';
  } catch (error) {
    statusEl.textContent = `Could not load the forecast (${error.message}).`;
    statusEl.classList.add('error');
  }

  // 성공이든 실패든 무조건 마지막에 화면을 그립니다.
  render();
});

function dayRow(day) {
  const tr = document.createElement('tr');

  const tdDate = document.createElement('td');
  tdDate.textContent = day.date.substring(5);
  tr.appendChild(tdDate);

  const tdMax = document.createElement('td');
  tdMax.textContent = day.max + '°';
  tr.appendChild(tdMax);

  const tdWind = document.createElement('td');
  tdWind.textContent = day.wind + ' km/h';
  tr.appendChild(tdWind);

  const tdRain = document.createElement('td');
  tdRain.textContent = day.rain + '%';
  tr.appendChild(tdRain);

  if (isGoodDay(day, state.limits)) {
    tr.classList.add('good');
  }

  return tr;
}

function render() {
  rowsEl.replaceChildren(...state.days.map(dayRow));

  if (state.city !== null) {
    summaryEl.textContent = `${state.city.name}: ${summarize(state.days, state.limits)}.`;
  } else {
    summaryEl.textContent = '';
  }
}