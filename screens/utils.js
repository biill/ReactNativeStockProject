export const convertStockData = (res) => {
  let result = [];

  if (res) {
    const data = res.data["Time Series (Daily)"];

    Object.entries(data).map((item) => result.push(item));
  }

  return result;
};

export const convertCryptoData = (data) => {
  let crypto = { name: "crypto", value: 0 };
  data = data
    .map((e) => {
      return {
        name: e["companyName"].slice(0, -3),
        value: parseFloat(
          (e["bidPrice"] * e["latestVolume"]) / 1000000
        ).toFixed(2),
      };
    })
    .filter((e) => e.value > 0);
  crypto["children"] = data;
  crypto.value = parseFloat(
    data.reduce((sum, cur) => sum + Number(cur.value), 0)
  ).toFixed(2);

  return [crypto];
};
