// store/slices/sectionStep.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the form sections
const initialState = {
  steps: 0,
  patientId: null,
};

const sectionStep = createSlice({
  name: "sectionSteps",
  initialState,
  reducers: {
    updateSteps: (state, action) => {
      state.steps = action.payload.steps;
    },
    updatePatientId: (state, action) => {
      state.patientId = action.payload.patientId;
    },
  },
});

// Selector to get the state of the sectionSteps slice
export const getAllSectionStepState = (state) => state.step;

// Export actions and reducer
export const { updateSteps, updatePatientId } = sectionStep.actions;
export default sectionStep.reducer;
