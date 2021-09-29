import CardList from "./CardsList";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux/store";

describe("CardList component", () => {
    test("Button AddCard should have the text 'Add card'", () => {
        render(
            <Provider store={store}>
                <CardList />
            </Provider>
        );

        let addCardElement = screen.getByText("Add card");
        expect(addCardElement).toBeTruthy();
    });

    test("Click on EditButton should have the text 'Cancel and Save'", () => {
        render(
            <Provider store={store}>
                <CardList />
            </Provider>
        );

        let EditAllCardsElement = screen.getByText("Edit all cards");

        fireEvent.click(EditAllCardsElement);

        let cancelElement = screen.getByText("Cancel");
        let saveElement = screen.getByText("Save");

        expect(cancelElement && saveElement).toBeTruthy();
    });
});
