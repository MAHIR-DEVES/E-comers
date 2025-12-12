import React from 'react';
import Banner from '../../Components/Banner/Banner';
import Card from '../../Components/Card/Card';
import Category from '../../Components/Category/Category';

import LatestProducts from '../../Components/LatestProducts/LatestProducts';
import ContactIcon from '../../Components/ContactIcon/ContactIcon';
import Products from '../../Components/Products/Products';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto md:px-4">
      <Banner></Banner>
      <Card></Card>
      <Category></Category>
      <LatestProducts></LatestProducts>
      <Products></Products>
      <ContactIcon></ContactIcon>
    </div>
  );
};

export default Home;
