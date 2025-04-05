import { describe, it, expect, beforeEach } from "vitest";
import { render, screen} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Cart from "../page/Cart";

describe("test Cart", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Cart />
            </BrowserRouter>
        );
    })

    it("should render the title 'item in cart'", () => {
        expect(screen.getByText('item in cart')).toBeInTheDocument();
    })

    it("should render the Header component", () => {
        expect(screen.getByRole('banner')).toBeInTheDocument();
    })

    it("should render the Footer component", () => {
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    })
})