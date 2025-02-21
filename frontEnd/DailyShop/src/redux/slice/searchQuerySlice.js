import { createSlice} from "@reduxjs/toolkit";

const searchQuerySlice = createSlice({
    name : "searchQuery",
    initialState: [],
    reducers : {
        queryValue(state, action) {

            state.push(action.payload)

        },
    },
});



export default searchQuerySlice.reducer;
export let {queryValue} = searchQuerySlice.actions;