import React from 'react';
import AppPageTitle from '../src/core/AppPageTitle';
import Container from '@mui/material/Container';

interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
  return (
    <Container maxWidth="xl">
      <AppPageTitle title="Home" />
    </Container>
  );
};

export default Home;
