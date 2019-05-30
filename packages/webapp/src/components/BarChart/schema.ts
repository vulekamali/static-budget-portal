import faker from 'faker';

const createRandomLengthArray = (min, max, callback) =>
  new Array(faker.random.number({ min, max })).fill(true).map(callback);

// Type: Ttitle
/**
 *
 */
export type Ttitle = string;
export const mockTitle = (): Ttitle => faker.commerce.productName();

// Type: Tamount
/**
 *
 */
export type Tamount = number;
export const mockAmount = (): Tamount => parseInt(faker.finance.amount(100000000, 900000000), 10);

// Type: Tratio
/**
 *
 */
export type Tratio = number;
export const mockRatio = (): Tratio => faker.random.number({ min: 0, max: 100 });

// Type: Titembase
/**
 *
 */
export type TitemBase = {
  title: Ttitle;
  amount: Tamount;
  ratio: Tratio;
};

export const mockItemBase = (): TitemBase => ({
  title: mockTitle(),
  amount: mockAmount(),
  ratio: mockRatio(),
});

// Type: Titem
/**
 *
 */
export type Titem = TitemBase & { ratio: Tratio };

export const mockItem = (): Titem => ({
  ...mockItemBase(),
  ratio: mockRatio(),
});

// Type: Tprops
/**
 *
 */
export type TpresentationProps = {
  items: Titem[];
};

export const mockPresentationProps = (): TpresentationProps => ({
  items: createRandomLengthArray(1, 20, mockItem) as Titem[],
});

// Type: Tprops
/**
 *
 */
export type Tprops = {
  items: TitemBase[];
};

export const mockProps = (): Tprops => ({
  items: createRandomLengthArray(1, 20, mockItemBase) as TitemBase[],
});
