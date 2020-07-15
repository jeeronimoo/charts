import { getRandomNumber } from "../../utils";

export const lineDateValueData = [
  {
    date: new Date(2019, 1, 10),
    value: 20,
  },
  {
    date: new Date(2019, 1, 11),
    value: 30,
  },
  {
    date: new Date(2019, 1, 12),
    value: 25,
  },
  {
    date: new Date(2019, 1, 13),
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
