import faker from 'faker';
import { flatten } from 'lodash';



/**
 * The base schema of a single item representing a block in the treemap.
 */
// export type Titem = {id: string; name: string; amount: number; url: string | null;
// }
export const mockItem = () => ({
  id: faker.random.uuid(),
  name: faker.commerce.productName(),
  amount: parseFloat(faker.finance.amount(1000000000, 9000000000)),
  url: faker.internet.url(),
});

/**
 * An extension of `Titem` with a `children` property added. This additional property will contain
 * all nested blocks inside this specific block (so that the user can drill down into the data)
 */
// export type TparentItem = TitemBase & { children: Titem[] };
export const mockParent = () => ({
  ...mockItem(),
  children: [1,2,3,4,5,6].map(mockItem),
})

/**
 * The ID of the item that should be highlighted.
 */
// export type TSelected = string;
export const mockSelected = (items) => {
  if (!items) {
    return faker.random.uuid();
  }

  const allIds = items.map(({ id, children }) => {
    if (!children) {
      return id;
    }

    return children.map(({ id }) => id)
  });

  return faker.random.arrayElement(flatten(allIds));
}

/**
 * Utility function used to generated the mock data for the `items` prop passed to the component. If
 * true is passed as an argument then all items generated will have children inside them (nested
 * treemap), if false is passed it will not include children in the items in the root of the array.
 * If nothing is passed as an argument then the function randomly assigns true or false to
 * `parents`.
 */
// export type TgenerateItems = (boolean) => Titems[] | TparentItems[];
export const generateItems = (parents) => {
  if (parents === true) {
    return [1,2,3,4,5,6].map(mockParent);
  }

  if (parents === false) {
    return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(mockItem);
  }

  const randomFunction = faker.random.boolean() ? mockParent : mockItem;
  return [1,2,3,4,5,6].map(randomFunction);
}

/**
 * Props accepted by `<StackChart />` component.
 */
// export type Tprops = {items: TparentItem[] | Titem[]; onSelectedChange: TonSelectedChange;
// }
export const mockProps = (parents) => {
  const items = generateItems(parents);

  return {
    items,
    selected: mockSelected(items)
  }
};
