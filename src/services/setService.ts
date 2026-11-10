import { Set } from "../types/Set";

const getAllSets = (): Set[] => {
  return hardcodedSetData;
};

const SetService = {
  getAllSets,
};

export default SetService;

const hardcodedSetData: Set[] = [
  {
    id: "10270",
    title: "Bookshop",
    pieces: 2504,
    minifigs: 5,
    imageUrl: "https://images.brickset.com/sets/images/10270-1.jpg",
    price: 199.99,
    weight: 2.946,
    theme: "Creator Expert",
  },
  {
    id: "10271",
    title: "Fiat 500",
    pieces: 960,
    minifigs: 0,
    imageUrl: "https://images.brickset.com/sets/images/10271-1.jpg",
    price: 79.99,
    weight: 1.107,
    theme: "Icons",
  },
  {
    id: "10272",
    title: "Old Trafford - Manchester United",
    pieces: 3898,
    minifigs: 0,
    imageUrl: "https://images.brickset.com/sets/images/10272-1.jpg",
    price: 279.99,
    weight: 1.8,
    theme: "Star Wars",
  },
];
