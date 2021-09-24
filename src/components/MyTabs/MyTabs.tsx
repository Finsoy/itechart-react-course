import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ICardsDataDTO from "../../models/ICardsDataDTO";
import ICardsState from "../../models/ICardsState";

interface IMyTabsProps {
    tabValue?: string;
}

const MyTabs = ({ tabValue = "0" }: IMyTabsProps) => {
    const cards: ICardsDataDTO[] = useSelector(
        (state: ICardsState) => state.cards
    );
    const router = useHistory();
    const [value, setValue] = useState(tabValue);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    return (
        <AppBar position="static" color="default">
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab
                    label="All cards"
                    value={"0"}
                    onClick={() => router.push(`/cards`)}
                />
                {cards.map((item, index) => {
                    return (
                        <Tab
                            label={`Card (${index + 1})`}
                            value={item.id.toString()}
                            onClick={() => router.push(`/cards/${item.id}`)}
                            key={item.id}
                        />
                    );
                })}
            </Tabs>
        </AppBar>
    );
};

export default MyTabs;
