export interface ICountry {
  id: string;
  name: string;
}

export interface ICity {
  id: string;
  name: string;
  countryId: string;
}
