import {editAndSaveActions} from "../../models/enumsActions/editAndSaveActions";

interface IIsEditAndIsSaveState {
    isEdit: boolean;
    isSave: boolean;
}

const editAndSaveReducer = (state: IIsEditAndIsSaveState, action: { type: string }) => {
    switch (action.type) {
        case editAndSaveActions.EDIT: {
            return {
                isEdit: !state.isEdit,
                isSave: false,
            };
        }
        case editAndSaveActions.SAVE: {
            return {
                isEdit: !state.isEdit,
                isSave: true,
            };
        }
    }
    return state;
};

export default editAndSaveReducer;
