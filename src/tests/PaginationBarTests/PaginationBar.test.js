import React from 'react';
import { shallow } from 'enzyme';

import PaginationBar from '../../components/PaginationBar';

describe('pagination bar', () => {
    it('correct pagination render at the top of the list', () => {
        for (let i = 1; i <= 10; i++) {
            let pagination = shallow(<PaginationBar currentPage={i} maxPagesCount={100} />);
            expect(pagination.find('div').children()).toHaveLength(i + 10);
        }
    })
    it('correct pagination render in the middle of list', () => {
        for (let i = 11; i <= 89; i++) {
            let pagination = shallow(<PaginationBar currentPage={i} maxPagesCount={100} />);
            expect(pagination.find('div').children()).toHaveLength(21);
        }
    })
    it('correct pagination render at the end of the list', () => {
        for (let i = 90; i <= 100; i++) {
            let pagination = shallow(<PaginationBar currentPage={i} maxPagesCount={100} />);
            expect(pagination.find('div').children()).toHaveLength(11 + (100 - i));
        }
    })
})