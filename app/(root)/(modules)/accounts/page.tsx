'use client';
// Imports
import {Suspense} from 'react';
import LoadingIcon from '@/components/shared/LoadingIcon';
import Accounts from '@/components/Layout/pagesComponents/Accounts';





// Main function
const Home = () => {
  return(
    <Suspense fallback={<LoadingIcon />}>
      <Accounts />
    </Suspense>
  );
};





// Export
export default Home;