import EditButton from "./EditButton";
import { render, screen} from "@testing-library/react";

describe("CardList component", () => {
    test("EditButton should have the text 'Edit all cards'", () => {
        render(<EditButton />);

        let EditAllCardsElement = screen.getByText("Edit all cards");
        expect(EditAllCardsElement).toBeTruthy();
    });
});
