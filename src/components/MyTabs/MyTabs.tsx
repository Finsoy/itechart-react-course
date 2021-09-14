import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ICardsDataDTO from "../../models/ICardsDataDTO";

interface IMyTabsProps {
    cards: ICardsDataDTO[];
    tabValue?: string;
}


const MyTabs = ({cards, tabValue = "0"}: IMyTabsProps) => {
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
                <Tab label="All cards"
                     value={"0"}
                     onClick={() => router.push(`/cards`)}/>
                {cards.map((item, index) => {
                    return (
                        <Tab label={`Card (${index + 1})`}
                             value={item.id.toString()}
                             onClick={() => router.push(`/cards/${item.id}`)}
                             key={item.id}/>
                    )
                })}

            </Tabs>
        </AppBar>
    );
};

export default MyTabs;
