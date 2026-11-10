import type { Item } from "../types/Item";

const hardcodedItemData: Item[] = [
  {
    id: "1",
    title: "Bookshop",
    description: "A detailed model of a classic bookshop.",
    imageUrl: "https://images.brickset.com/sets/images/10270-1.jpg",
    category: "Creator Expert",
  },
  {
    id: "2",
    title: "Fiat 500",
    description: "A model of the iconic Fiat 500 car.",
    imageUrl: "https://images.brickset.com/sets/images/10271-1.jpg",
    category: "Creator Expert",
  },
  {
    id: "3",
    title: "Old Trafford - Manchester United",
    description: "A detailed model of the iconic Old Trafford stadium.",
    imageUrl: "https://images.brickset.com/sets/images/10272-1.jpg",
    category: "Creator Expert",
  },
];

export async function getItems(): Promise<Item[]> {
  return hardcodedItemData;
}

export async function getItemById(_id: string): Promise<Item | null> {
  return hardcodedItemData.find((item) => item.id === _id) ?? null;
}

const ItemService = {
  getItems,
  getItemById,
};

export default ItemService;
