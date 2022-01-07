import { useQuery, gql } from "@apollo/client";

interface IProps {
  code: string;
  name: string;
}

const Country: React.FC<IProps> = ({ code, name }) => {
  const GET_COUNTRY = gql`
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

  const { loading, error, data } = useQuery(GET_COUNTRY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading country.</p>;

  const handleClick = () => {
    console.log(data.country);
  };

  return <div onClick={handleClick}>{name}</div>;
};

export default Country;
