import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, cleanup} from '@testing-library/react'

import PageHeader from "./PageHeader";
import Button from "@material-ui/core/Button";

afterEach(cleanup);
describe('Testing render', () => {
    it('backBtn show', () => {
        const {getByText} = render(<PageHeader title="test" isBackBtn/>)
        expect(screen.getByTestId('backBtn')).toBeInTheDocument()
        expect(getByText('<-back')).toBeInTheDocument();
    })
    it('backBtn hide', () => {
        render(<PageHeader title="test"/>)
        expect(screen.queryByTestId('backBtn')).not.toBeInTheDocument()
    })
    it('children', () => {
        const {getByText} = render(
            <PageHeader title="tittle">
                <Button variant="outlined">
                    <span>test</span>
                </Button>
            </PageHeader>
        )
        expect(getByText('test')).toBeInTheDocument();
    })
})