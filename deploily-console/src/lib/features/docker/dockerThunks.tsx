import { createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "../my-deployments/data";



export const fetchDockerById = createAsyncThunk(
    "docker/getDockerById",
    async (id: number, thunkConfig) => {
        try {
            const response = data; // mock
            console.log("Searching for id:", id, "in result:", response.data.result);

            if (response.status === 200) {
                // ✅ pick the first matching object
                const docker = response.data.result.find((item) => item.id === Number(id));
                console.log("Inside fetchDockerById, found docker:", docker);
                
                return docker; // returns a single object
            } else {
                return thunkConfig.rejectWithValue("error");
            }
        } catch (error: any) {
            return thunkConfig.rejectWithValue(error.message);
        }
    }
);
