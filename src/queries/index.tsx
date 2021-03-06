import { gql } from "@apollo/client";

interface QueryProps {
  continent?: string;
  currency?: string;
}

export const GetCountries = (obj: QueryProps) => {
  const filter: string = `filter : { ${
    !!obj.continent && obj.continent !== "All"
      ? `continent: {eq: "${obj.continent}"}, `
      : ""
  }
  ${
    !!obj.currency && obj.currency !== "All"
      ? `currency: {eq: "${obj.currency}"}`
      : ""
  }
}`;

  return gql`
    {
      countries(${filter}) {
        code
        name
        continent {
          name
        }
      }
    }
  `;
};

export const GetContinents = gql`
  {
    continents {
      code
      name
    }
  }
`;

export const GetCurrencies = gql`
  {
    countries {
      currency
    }
  }
`;

export const GetCountry = (code: string) =>
  gql`
  {
    country(code: "${code}") {
      code
      name
      currency
      continent {
        name
      }
      languages {
        name
      }
      capital
    }
  }
`;
