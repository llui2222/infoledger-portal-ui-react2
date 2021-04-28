import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, cleanup, waitFor, fireEvent} from '@testing-library/react'
import {Provider} from "react-redux";
import Profile from "./Profile";
import {store} from "../../redux";
import {MockedProvider} from '@apollo/client/testing';

afterEach(cleanup);
jest.mock('../../redux/api/auth', () => {
    return {
        currentAuthenticatedUser: () => {
            return Promise.resolve({
                attributes: {
                    name: 'testname',
                    family_name: 'testfamily_name',
                    email: 'testemail',
                }
            })
        }
    }
});

describe('Testing render', () => {
        it('fields should complete', async () => {
            const {container} = render(
                <Provider store={store}>
                    <Profile/>
                </Provider>
            )
            await waitFor(() => {
                const inputs = container.getElementsByTagName('input')
                expect(inputs[0].value).toBe('testname');
                expect(inputs[1].value).toBe('testfamily_name');
                expect(inputs[2].value).toBe('testemail');
            });
        })
        it('should open change name modal', async () => {
            const {getByText, container, getAllByText} = render(
                <Provider store={store}>
                    <Profile/>
                </Provider>
            )
            await waitFor(() => {
                const btns = container.getElementsByTagName('button')
                expect(btns.length).toBe(4)
                fireEvent.click(btns[0])
                expect(getByText('Change name')).toBeInTheDocument()
            });
        })
        it('should open change name2 modal', async () => {
            const {getByText, container, getAllByText} = render(
                <Provider store={store}>
                    <Profile/>
                </Provider>
            )
            const btns = getAllByText('Edit')
            fireEvent.click(btns[1])
            await waitFor(() => {
                expect(getByText('Change name')).toBeInTheDocument()
            });
        })
        it('should open change email modal', async () => {
            const {getByText} = render(
                <Provider store={store}>
                    <Profile/>
                </Provider>
            )
            const btn = getByText('Change Login')
            fireEvent.click(btn)
            await waitFor(() => {
                expect(getByText('Change email')).toBeInTheDocument()
            });
        })
        it('should open change password modal', async () => {
            const {getAllByText} = render(
                <Provider store={store}>
                    <Profile/>
                </Provider>
            )
            const btn = getAllByText('Change password')[0]
            fireEvent.click(btn)
            await waitFor(() => {
                expect(getAllByText('Change password')[1]).toBeInTheDocument()
            });
        })
    }
)