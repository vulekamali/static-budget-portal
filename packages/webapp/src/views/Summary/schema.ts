/**
 * Name of programme in a department
 */
export type TitemTitle = string;

/**
 * Amount of money spent on a specific programme in a department
 */
export type TitemAmount = number;

/**
 * Total amount of budget a department receives
 */
export type TresourceValue = number;

/**
 * The percentage a department's budget is in relation to the province or the country's entire budget
 */
export type TresourceConsolidated = number;

/**
 * A specific start and end associated with the budget cycle
 */
export type Tyear = string;

/**
 * Outlining the scope and mandate of a department
 */
export type Tdescription = string;

export interface ItemShape {
  title: TitemTitle;
  amount: TitemAmount;
}

export interface ResourcesShape {
  value: TresourceValue;
  consolidated: TresourceConsolidated;
}

export interface PropsShape {
  year: Tyear;
  items: ItemShape[];
  resources: ResourcesShape;
  description?: Tdescription;
}

const mock: PropsShape = {
  year: '2018-19',
  items: [
    {
      title: 'Admin',
      amount: 500,
    },
    {
      title: 'Education',
      amount: 700,
    }
  ],
  resources: {
    value: 2000,
    consolidated: 25
  }
}