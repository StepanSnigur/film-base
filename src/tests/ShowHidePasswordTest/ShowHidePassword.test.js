import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store/Store';
import { mount } from 'enzyme';
import AuthForm from '../../components/AuthForm';

describe('Hide/show password test', () => {
    let props = {
        isLoading: false,
        isLogged: false,
        AuthUser: () => {}
    }

    it('Correct show password', () => {
        let authForm = mount(
            <Provider store={store}>
                <AuthForm {...props} />
            </Provider>
        )

        expect(authForm.find('img').prop('alt')).toBe('show password')

        let ShowHidePasswordBtn = authForm.find('span')
        ShowHidePasswordBtn.simulate('click')
        expect(authForm.find('img').prop('alt')).toBe('hide password')
    })
})
