import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from "react-hot-toast";

export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/contacts');
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async (newContactData, thunkAPI) => {
        try {
            const response = await axios.post('/contacts', newContactData);
            toast.success("The Contact is added");
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (taskId, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/${taskId}`);
            toast.success("The Contact is deleted");
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
