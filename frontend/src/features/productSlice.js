import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const listProducts = createAsyncThunk(
    'products/listProducts',
    async (params = {}, thunkAPI) => {
        try {
            const { keyword = '', category = '' } = params;
            let url = `${BASE_URL}/api/products`;
            const queryParams = [];

            if (keyword) queryParams.push(`keyword=${keyword}`);
            if (category) queryParams.push(`category=${category}`);

            if (queryParams.length > 0) {
                url += `?${queryParams.join('&')}`;
            }

            const { data } = await axios.get(url);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const listProductDetails = createAsyncThunk(
    'products/listProductDetails',
    async (id, thunkAPI) => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        product: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(listProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(listProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(listProductDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(listProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(listProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;
