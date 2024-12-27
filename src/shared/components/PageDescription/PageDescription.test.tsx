import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { PageDescription } from "./PageDescription";
describe("Home", () => {
    it("renders a heading", () => {
        render(<PageDescription>test</PageDescription>);

        const heading = screen.findByText(/test/);
        waitFor(() => expect(heading).toBeInTheDocument());
    });
});
