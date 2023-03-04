import React from "react";
import PropTypes from "prop-types";
import * as S from "./SearchBar.styles";

export const SearchBar = ({ setSearch }) => {
  return (
    <S.SearchBarWrapper>
      <label htmlFor="search">Nome do dispositivo</label>
      <S.Search
        type="search"
        id="search"
        placeholder="Buscar pelo nome do dispositivo"
        onChange={(e) => {
          const searchTerm = e.target.value;
          setSearch(searchTerm);
        }}
      />
    </S.SearchBarWrapper>
  );
};

SearchBar.propTypes = {
  setSearch: PropTypes.func,
};
