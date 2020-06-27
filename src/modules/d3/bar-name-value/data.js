import { getRandomNumber } from "../../utils";

export const barNameValueData = [
  {
    name: "Andy",
    value: 10,
  },
  {
    name: "James",
    value: 30,
  },
  {
    name: "Cris",
    value: 20,
  },
  {
    name: "Susan",
    value: 10,
  },
  {
    name: "Ted",
    value: 50,
  },
  {
    name: "Mark",
    value: 30,
  },
  {
    name: "Julia",
    value: 55,
  },
  {
    name: "Zack",
    value: 42,
  },
];

export const getBarNameValueData = () =>
  barNameValueData.map(({ name, value }) => ({
    name,
    value: getRandomNumber(),
  }));
