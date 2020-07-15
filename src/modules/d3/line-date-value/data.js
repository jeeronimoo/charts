import { getRandomNumber } from "../../utils";

export const lineDateValueData = [
  {
    date: new Date(2019, 1, 10).getTime(),
    value: 20,
  },
  {
    date: new Date(2019, 1, 11).getTime(),
    value: 30,
  },
  {
    date: new Date(2019, 1, 12).getTime(),
    value: 25,
  },
  {
    date: new Date(2019, 1, 13).getTime(),
    value: 40,
  },
];

const getRandomData = () => {
  const length = getRandomNumber() || 10;

  let list = [];

  for (let i = 0; i <= length; i++) {
    // TODO: add really random date
    const date = new Date();
    const value = getRandomNumber();

    list.push({
      date,
      value,
    });
  }

  return list;
};
