import React from 'react';
import Preloader from '../components/Preloader';

const WithSuspense = (Component: React.ComponentType) => {
  return (props: any) => (
    <React.Suspense fallback={<Preloader/>}>
      <Component {...props}/>
    </React.Suspense>
  )
}

export default WithSuspense;
