
import styled from 'styled-components';
import React, { useState } from "react";
import Header from "./components/Header";
import GlobalStyles from "./GlobalStyle";
import GistList from './components/GistList';

const App = () => {
  const [username, setSearch] = useState('');
  const onSearch = (value) => {
    console.log(value);
    setSearch(value);
  };
  return (
    <Wrapper className="App" data-testid="app">
      <Header onSearch={onSearch} />
      <GistList username={username} />
      <GlobalStyles />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

export default App;
