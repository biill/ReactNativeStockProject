export const convertStockData = data => {
  let result = [];
  for (let i in data['Time Series (Daily)']) {
    data['Time Series (Daily)'][i]['date'] = i;
    result.push(data['Time Series (Daily)'][i]);
  }
  return result.reverse();
};

export const convertCryptoData = data => {
  let crypto = { name: 'crypto', value: 0 };
  data = data
    .map(e => {
      return {
        name: e['companyName'].slice(0, -3),
        value: parseFloat((e['bidPrice'] * e['latestVolume']) / 1000000).toFixed(2)
      };
    })
    .filter(e => e.value > 0);
  crypto['children'] = data;
  crypto.value = parseFloat(data.reduce((sum, cur) => sum + Number(cur.value), 0)).toFixed(2);

  return [crypto];
};
