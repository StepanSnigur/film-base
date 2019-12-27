import React from 'react';
import { shallow } from 'enzyme';
import TabListContent from '../../components/TabListContent';

import ErrorBoundary from '../../hoc/ErrorBoundary';
import FilmCard from '../../components/FilmCard';

describe('TabListContent', () => {
    let props = {
        isError: true,
        componentName: '',
        activeComponentName: '',
        list: {
            results: [
                {id: 1},
                {id: 2},
                {id: 3}
            ],
            isLoading: false
        }
    }

    it('Correct error render', () => {
        let tabListContent = shallow(<TabListContent {...props} />);

        expect(tabListContent.find(ErrorBoundary).prop('isError')).toEqual(true);
    })

    it('Correct film card render', () => {
        let tabListContent = shallow(<TabListContent {...props} />);

        expect(tabListContent.find(FilmCard)).toHaveLength(3);
    })
});