import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow, mount } from 'enzyme'

import PaginationBar from '../../components/PaginationBar'

describe('pagination bar', () => {
  const createPaginationBar = page => {
    return mount(
      <Provider store={store}>
        <PaginationBar currentPage={page} pagesCount={100} onPageChange={() => {}} />
      </Provider>
    )
  }
  const mockStore = configureStore([])
  const store = mockStore({})

  it('correct pagination render at the top of the list', () => {
    for (let i = 1; i <= 10; i++) {
      const pagination = createPaginationBar(i)
      expect(pagination.find('div').find('div').children()).toHaveLength(i + 13)
    }
  })
  it('correct pagination render in the middle of list', () => {
    for (let i = 11; i <= 89; i++) {
      const pagination = createPaginationBar(i)
      expect(pagination.find('div').find('div').children()).toHaveLength(24)
    }
  })
  it('correct pagination render at the end of the list', () => {
    for (let i = 90; i <= 100; i++) {
      const pagination = createPaginationBar(i)
      expect(pagination.find('div').find('div').children()).toHaveLength(14 + (100 - i))
    }
  })
})
