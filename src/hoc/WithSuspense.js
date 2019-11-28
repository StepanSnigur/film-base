import React from 'react';
import Preloader from '../components/Preloader';

let WithSuspense = (Component) => {
    return (props) => (
        <React.Suspense fallback={<Preloader />}>
            <Component {...props}/>
        </React.Suspense>
    )
}

export default WithSuspense;