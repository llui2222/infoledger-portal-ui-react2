import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react'

import PdfIFrame from "./PdfIFrame";

afterEach(cleanup);
describe('Testing iframe', () => {
    it('render default', () => {
        render(<PdfIFrame src="test"/>)
        expect(screen.getByTestId('iframe')).toBeInTheDocument()
        expect(screen.getByTestId('iframe')).toHaveAttribute('src', 'test');
    })
})