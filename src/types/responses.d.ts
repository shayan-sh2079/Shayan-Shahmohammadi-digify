export interface Country {
  area: number;
  population: number;
  region: string;
  name: {
    common: string;
  };
  flags: {
    png: string;
    alt: string;
  };
}

export interface CountriesRes {
  countries: Country[];
  pages: number;
}
