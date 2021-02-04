import React from "react";
import {render, screen} from '@testing-library/react'
import { shallow } from 'enzyme';
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from "./SignUp";
import FieldPassword from "./common/FieldPassword";

describe("Sign Up Form", () => {
    it("should render the basic fields", () => {
        render(<Router>
            <SignUp />
        </Router>);
        expect(screen.getByRole("textbox", { name: /Email/i })).toBeInTheDocument();
        expect(screen.find(FieldPassword)).to.have.length(1);
        expect(screen.getByRole("textbox", { name: /Password/i })).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /Password2/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /Login/i })).toBeInTheDocument();
    });
});