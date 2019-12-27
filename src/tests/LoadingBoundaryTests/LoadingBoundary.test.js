import React from 'react';
import { shallow } from 'enzyme';

import LoadingBoundary from '../../hoc/LoadingBoundary';
import Preloader from '../../components/Preloader';

describe('LoadingBoundary', () => {
    it('Correct loading render', () => {
        let props = {isLoading: true}
        let loadingBoundary = shallow(<LoadingBoundary {...props} />);

        expect(loadingBoundary.find(Preloader)).toHaveLength(1);
    })
    it('Correct content render', () => {
        let props = {isLoading: false}
        let loadingBoundary = shallow(
            <LoadingBoundary {...props}>
                <h1>Correct render</h1>
            </LoadingBoundary>
        );

        expect(loadingBoundary.find('h1').text()).toEqual('Correct render');
    })
});