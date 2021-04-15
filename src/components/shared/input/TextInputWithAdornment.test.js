import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, cleanup, fireEvent} from '@testing-library/react'
import TextInputWithAdornment from "./TextInputWithAdornment";


afterEach(cleanup);
describe('Testing render', () => {
    it('hover', () => {
        const {getByText, getByRole, container} = render(<TextInputWithAdornment label="test"/>)
        const textBox = getByRole('textbox')

        expect(getByText('test')).toBeInTheDocument();
        expect(textBox).toBeDisabled();

        fireEvent.mouseOver(textBox)

        expect(container.getElementsByClassName('MuiSvgIcon-root')[0]).toBeInTheDocument()
    })
    it('active input', () => {
        const {getByRole, container} = render(<TextInputWithAdornment label="test"/>)
        const textBox = getByRole('textbox')

        fireEvent.mouseOver(textBox)

        const icon = container.getElementsByClassName('MuiSvgIcon-root')[0]

        fireEvent.click(icon)
        expect(textBox).not.toBeDisabled();
    })
    it('clear input', () => {
        const {getByRole, container} = render(<TextInputWithAdornment disabled={false} value="test"/>)
        const textBox = getByRole('textbox')

        fireEvent.mouseOver(textBox)

        const icon = container.getElementsByClassName('MuiSvgIcon-root')[0]

        fireEvent.click(icon)
        expect(textBox.value).toBe('');
    })
    it('show/hide password', () => {
        const {container} = render(<TextInputWithAdornment disabled={false} isPassword/>)
        const textBox = container.getElementsByClassName('MuiInputBase-input')[0]

        expect(textBox.type).toBe('password')
        fireEvent.mouseOver(textBox)

        const icon = container.getElementsByClassName('MuiSvgIcon-root')[0]

        fireEvent.click(icon)
        expect(textBox.type).toBe('text')
    })
})