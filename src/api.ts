const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}


export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

const NICO_URL = 'https://ohlcv-api.nomadcoders.workers.dev?coinId='

export function fetchCoinHistory(coinId: string) {
  return fetch(
    `${NICO_URL}${coinId}`
  ).then((response) => response.json());
}