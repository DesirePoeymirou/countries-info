import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Search from "./Search";
import Continents from "./Continents";

interface IProps {
  continents: Continent[];
}

const Filters: React.FC<IProps> = ({ continents }) => {
  return (
    <>
      <Search />
      <Continents continents={continents} />
    </>
  );
};

export default Filters;
