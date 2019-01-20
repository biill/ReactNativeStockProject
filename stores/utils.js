export const convertStockData = data => {
  let result = [];
  for (let i in data['Time Series (Daily)']) {
    data['Time Series (Daily)'][i]['date'] = i;
    result.push(data['Time Series (Daily)'][i]);
  }
  return result.reverse();
};

export const convertCryptoData = data => {
  let result = [];
  for (let i in data['Time Series (Digital Currency Daily)']) {
    let crypto = {};
    crypto['data'] = i;
    crypto['price'] = data['Time Series (Digital Currency Daily)'][i]['2b. high (USD)'];
    result.push(crypto);
  }
  return result.reverse();
};
