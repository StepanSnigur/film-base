import React from 'react';
import { shallow } from 'enzyme';

import ErrorBoundary from '../../hoc/ErrorBoundary';
import ErrorIndicator from '../../components/ErrorIndicator';

describe('ErrorBoundary', () => {
    it('Correct error render', () => {
        let props = {isError: true}
        let errorBoundary = shallow(<ErrorBoundary {...props} />);

        expect(errorBoundary.find(ErrorIndicator)).toHaveLength(1);
    })
    it('Correct content render', () => {
        let props = {isError: false}
        let errorBoundary = shallow(
            <ErrorBoundary {...props}>
                <h1>Correct render</h1>
            </ErrorBoundary>
        );

        expect(errorBoundary.find('h1').text()).toEqual('Correct render');
    })
});