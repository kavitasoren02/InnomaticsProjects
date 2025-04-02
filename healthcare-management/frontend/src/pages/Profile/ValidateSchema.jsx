import * as Yup from "yup";

export const AppoinmentSchema = Yup.object({
    doctorId: Yup.string().required("Please select a doctor"),
    appointmentDate: Yup.string().required("Please select a date"),
    reasonForVisit: Yup.string().required("Please enter a reason for visit"),
    symptoms: Yup.string().required("Please enter your symptoms"),
    notes: Yup.string().required("Please enter your notes"),
}) 