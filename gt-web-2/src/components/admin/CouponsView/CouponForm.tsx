import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { getCommonCrudApiSafe } from "../../commonCrud/commonCrudStore";
import {
  CommonInputField,
  CommonSelectField,
} from "../../commonCrud/CommonElement/CommonInputField";

interface CouponFormProps {
  toggle: () => void;
  moduleMode: "ADD" | "EDIT" | "DELETE";
  fetchRecord: Record<string, unknown>;
  isUpdateRecord: boolean;
}

// Validation schema for the coupon form
const couponValidationSchema = Yup.object({
  seriesName: Yup.string().required("Series name is required"),
  origin: Yup.string().required("Origin is required"),
  destination: Yup.string().required("Destination is required"),
  journeyType: Yup.string().required("Journey type is required"),
  carrier: Yup.string().required("Carrier is required"),
  flightNumber: Yup.string().required("Flight number is required"),
  classType: Yup.string().required("Class type is required"),
  depTime: Yup.string().required("Departure time is required"),
  arrTime: Yup.string().required("Arrival time is required"),
  totalDuration: Yup.string().required("Total duration is required"),
  availableSeats: Yup.number()
    .required("Available seats is required")
    .min(1, "Must be at least 1"),
  startJourneyDate: Yup.string().required("Start journey date is required"),
  endJourneyDate: Yup.string().required("End journey date is required"),
  adultTax: Yup.number()
    .required("Adult tax is required")
    .min(0, "Must be non-negative"),
  childTax: Yup.number()
    .required("Child tax is required")
    .min(0, "Must be non-negative"),
  infantTax: Yup.number()
    .required("Infant tax is required")
    .min(0, "Must be non-negative"),
  totalAmount: Yup.number()
    .required("Total amount is required")
    .min(0, "Must be non-negative"),
});

export const CouponForm: React.FC<CouponFormProps> = ({
  toggle,
  moduleMode,
  fetchRecord,
  isUpdateRecord,
}) => {
  const API = getCommonCrudApiSafe("coupons");
  const { useSubmitHandler } = API.crudApi.crudHandler;
  const { mutate, isPending } = useSubmitHandler();

  const formik = useFormik({
    initialValues: {
      seriesName: isUpdateRecord
        ? (fetchRecord.seriesName as string) || ""
        : "",
      origin: isUpdateRecord ? (fetchRecord.origin as string) || "" : "",
      destination: isUpdateRecord
        ? (fetchRecord.destination as string) || ""
        : "",
      journeyType: isUpdateRecord
        ? (fetchRecord.journeyType as string) || "Domestic"
        : "Domestic",
      carrier: isUpdateRecord ? (fetchRecord.carrier as string) || "" : "",
      flightNumber: isUpdateRecord
        ? (fetchRecord.flightNumber as string) || ""
        : "",
      classType: isUpdateRecord ? (fetchRecord.classType as string) || "" : "",
      depTime: isUpdateRecord ? (fetchRecord.depTime as string) || "" : "",
      arrTime: isUpdateRecord ? (fetchRecord.arrTime as string) || "" : "",
      totalDuration: isUpdateRecord
        ? (fetchRecord.totalDuration as string) || ""
        : "",
      availableSeats: isUpdateRecord
        ? (fetchRecord.availableSeats as number) || 0
        : 0,
      startJourneyDate: isUpdateRecord
        ? (fetchRecord.startJourneyDate as string) || ""
        : "",
      endJourneyDate: isUpdateRecord
        ? (fetchRecord.endJourneyDate as string) || ""
        : "",
      adultTax: isUpdateRecord ? (fetchRecord.adultTax as number) || 0 : 0,
      childTax: isUpdateRecord ? (fetchRecord.childTax as number) || 0 : 0,
      infantTax: isUpdateRecord ? (fetchRecord.infantTax as number) || 0 : 0,
      totalAmount: isUpdateRecord
        ? (fetchRecord.totalAmount as number) || 0
        : 0,
    },
    validationSchema: couponValidationSchema,
    onSubmit: (values) => {
      mutate({
        data: values,
        control: formik,
      });
    },
  });

  const journeyTypeOptions = [
    { value: "Domestic", label: "Domestic" },
    { value: "International", label: "International" },
  ];

  const classTypeOptions = [
    { value: "Economy", label: "Economy" },
    { value: "Business", label: "Business" },
    { value: "First", label: "First Class" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {moduleMode === "ADD" ? "Add New Coupon" : "Edit Coupon"}
          </h2>
          <button
            onClick={toggle}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CommonInputField
              name="seriesName"
              label="Series Name"
              placeholder="Enter series name"
              required
              value={formik.values.seriesName}
              onChange={(value) => formik.setFieldValue("seriesName", value)}
              errors={formik.errors}
              touched={formik.touched}
            />

            <CommonSelectField
              name="journeyType"
              label="Journey Type"
              placeholder="Select journey type"
              required
              options={journeyTypeOptions}
              value={formik.values.journeyType}
              onChange={(value) =>
                formik.setFieldValue("journeyType", value.value || "")
              }
              errors={formik.errors}
              touched={formik.touched}
            />

            <CommonInputField
              name="origin"
              label="Origin"
              placeholder="Enter origin"
              required
              value={formik.values.origin}
              onChange={(value) => formik.setFieldValue("origin", value)}
              errors={formik.errors}
              touched={formik.touched}
            />

            <CommonInputField
              name="destination"
              label="Destination"
              placeholder="Enter destination"
              required
              value={formik.values.destination}
              onChange={(value) => formik.setFieldValue("destination", value)}
              errors={formik.errors}
              touched={formik.touched}
            />

            <CommonInputField
              name="carrier"
              label="Carrier"
              placeholder="Enter carrier"
              required
              value={formik.values.carrier}
              onChange={(value) => formik.setFieldValue("carrier", value)}
              errors={formik.errors}
              touched={formik.touched}
            />

            <CommonInputField
              name="flightNumber"
              label="Flight Number"
              placeholder="Enter flight number"
              required
              value={formik.values.flightNumber}
              onChange={(value) => formik.setFieldValue("flightNumber", value)}
              errors={formik.errors}
              touched={formik.touched}
            />

            <CommonSelectField
              name="classType"
              label="Class Type"
              placeholder="Select class type"
              required
              options={classTypeOptions}
              value={formik.values.classType}
              onChange={(value) =>
                formik.setFieldValue("classType", value.value || "")
              }
              errors={formik.errors}
              touched={formik.touched}
            />

            <CommonInputField
              name="depTime"
              label="Departure Time"
              type="time"
              placeholder="Enter departure time"
              required
              value={formik.values.depTime}
              onChange={(value) => formik.setFieldValue("depTime", value)}
              errors={formik.errors}
              touched={formik.touched}
            />

            <CommonInputField
              name="arrTime"
              label="Arrival Time"
              type="time"
              placeholder="Enter arrival time"
              required
              value={formik.values.arrTime}
              onChange={(value) => formik.setFieldValue("arrTime", value)}
              errors={formik.errors}
              touched={formik.touched}
            />

            <CommonInputField
              name="totalDuration"
              label="Total Duration"
              placeholder="Enter total duration"
              required
              value={formik.values.totalDuration}
              onChange={(value) => formik.setFieldValue("totalDuration", value)}
              errors={formik.errors}
              touched={formik.touched}
            />

            <CommonInputField
              name="availableSeats"
              label="Available Seats"
              type="number"
              placeholder="Enter available seats"
              required
              value={formik.values.availableSeats.toString()}
              onChange={(value) =>
                formik.setFieldValue("availableSeats", parseInt(value) || 0)
              }
              errors={formik.errors}
              touched={formik.touched}
            />

            <CommonInputField
              name="startJourneyDate"
              label="Start Journey Date"
              type="date"
              placeholder="Enter start journey date"
              required
              value={formik.values.startJourneyDate}
              onChange={(value) =>
                formik.setFieldValue("startJourneyDate", value)
              }
              errors={formik.errors}
              touched={formik.touched}
            />

            <CommonInputField
              name="endJourneyDate"
              label="End Journey Date"
              type="date"
              placeholder="Enter end journey date"
              required
              value={formik.values.endJourneyDate}
              onChange={(value) =>
                formik.setFieldValue("endJourneyDate", value)
              }
              errors={formik.errors}
              touched={formik.touched}
            />

            <CommonInputField
              name="adultTax"
              label="Adult Tax"
              type="number"
              placeholder="Enter adult tax"
              required
              value={formik.values.adultTax.toString()}
              onChange={(value) =>
                formik.setFieldValue("adultTax", parseFloat(value) || 0)
              }
              errors={formik.errors}
              touched={formik.touched}
            />

            <CommonInputField
              name="childTax"
              label="Child Tax"
              type="number"
              placeholder="Enter child tax"
              required
              value={formik.values.childTax.toString()}
              onChange={(value) =>
                formik.setFieldValue("childTax", parseFloat(value) || 0)
              }
              errors={formik.errors}
              touched={formik.touched}
            />

            <CommonInputField
              name="infantTax"
              label="Infant Tax"
              type="number"
              placeholder="Enter infant tax"
              required
              value={formik.values.infantTax.toString()}
              onChange={(value) =>
                formik.setFieldValue("infantTax", parseFloat(value) || 0)
              }
              errors={formik.errors}
              touched={formik.touched}
            />

            <CommonInputField
              name="totalAmount"
              label="Total Amount"
              type="number"
              placeholder="Enter total amount"
              required
              value={formik.values.totalAmount.toString()}
              onChange={(value) =>
                formik.setFieldValue("totalAmount", parseFloat(value) || 0)
              }
              errors={formik.errors}
              touched={formik.touched}
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <button
              type="button"
              onClick={toggle}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={isPending}
            >
              {isPending
                ? "Saving..."
                : moduleMode === "ADD"
                ? "Create Coupon"
                : "Update Coupon"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
