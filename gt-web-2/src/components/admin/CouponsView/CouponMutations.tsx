"use client";
import { AddCouponFormValues } from "@/types/module/admin/couponModule";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commonAjax } from "../../commonCrud/commonAjax";

// API functions for coupon mutations
const addCoupon = async (data: AddCouponFormValues) => {
  const response = await commonAjax({
    url: `${process.env.NEXT_PUBLIC_CORE_API_URL}coupons/add-coupon`,
    method: "POST",
    data,
  });
  return response;
};

const updateCoupon = async ({
  id,
  data,
}: {
  id: string;
  data: AddCouponFormValues;
}) => {
  const response = await commonAjax({
    url: `${process.env.NEXT_PUBLIC_CORE_API_URL}coupons/update-coupon/${id}`,
    method: "PUT",
    data,
  });
  return response;
};

const deleteCoupon = async (id: string) => {
  const response = await commonAjax({
    url: `${process.env.NEXT_PUBLIC_CORE_API_URL}coupons/delete-coupon/${id}`,
    method: "DELETE",
  });
  return response;
};

// Custom hooks for coupon mutations
export const useAddCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCoupon,
    onSuccess: (response) => {
      showSuccessToast(response?.data?.message || "Coupon added successfully");
      // Invalidate and refetch coupons list
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
    onError: (error: Error) => {
      showErrorToast(error.message || "Failed to add coupon");
    },
  });
};

export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCoupon,
    onSuccess: (response) => {
      showSuccessToast(
        response?.data?.message || "Coupon updated successfully"
      );
      // Invalidate and refetch coupons list
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
    onError: (error: Error) => {
      showErrorToast(error.message || "Failed to update coupon");
    },
  });
};

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCoupon,
    onSuccess: (response) => {
      showSuccessToast(
        response?.data?.message || "Coupon deleted successfully"
      );
      // Invalidate and refetch coupons list
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
    onError: (error: Error) => {
      showErrorToast(error.message || "Failed to delete coupon");
    },
  });
};

// Example usage component
export const CouponMutationsExample = () => {
  const addCouponMutation = useAddCoupon();
  const updateCouponMutation = useUpdateCoupon();
  const deleteCouponMutation = useDeleteCoupon();

  const handleAddCoupon = (formData: AddCouponFormValues) => {
    addCouponMutation.mutate(formData);
  };

  const handleUpdateCoupon = (id: string, formData: AddCouponFormValues) => {
    updateCouponMutation.mutate({ id, data: formData });
  };

  const handleDeleteCoupon = (id: string) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      deleteCouponMutation.mutate(id);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Coupon Mutations Example</h2>

      {/* Add Coupon Example */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Add Coupon</h3>
        <button
          onClick={() =>
            handleAddCoupon({
              seriesName: "Test Coupon",
              origin: "DEL",
              destination: "BOM",
              journeyType: "Domestic",
              carrier: "IndiGo",
              flightNumber: "6E123",
              classType: "Economy",
              depTime: "10:00 AM",
              arrTime: "12:00 PM",
              totalDuration: "2h",
              availableSeats: 50,
              startJourneyDate: "2025-01-01",
              endJourneyDate: "2025-12-31",
              adultTax: 500,
              childTax: 300,
              infantTax: 100,
              totalAmount: 5000,
            })
          }
          disabled={addCouponMutation.isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {addCouponMutation.isPending ? "Adding..." : "Add Test Coupon"}
        </button>
      </div>

      {/* Update Coupon Example */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Update Coupon</h3>
        <button
          onClick={() =>
            handleUpdateCoupon("coupon-id", {
              seriesName: "Updated Coupon",
              origin: "DEL",
              destination: "BOM",
              journeyType: "Domestic",
              carrier: "IndiGo",
              flightNumber: "6E456",
              classType: "Business",
              depTime: "11:00 AM",
              arrTime: "01:00 PM",
              totalDuration: "2h",
              availableSeats: 30,
              startJourneyDate: "2025-01-01",
              endJourneyDate: "2025-12-31",
              adultTax: 800,
              childTax: 500,
              infantTax: 200,
              totalAmount: 8000,
            })
          }
          disabled={updateCouponMutation.isPending}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {updateCouponMutation.isPending
            ? "Updating..."
            : "Update Test Coupon"}
        </button>
      </div>

      {/* Delete Coupon Example */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Delete Coupon</h3>
        <button
          onClick={() => handleDeleteCoupon("coupon-id")}
          disabled={deleteCouponMutation.isPending}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {deleteCouponMutation.isPending
            ? "Deleting..."
            : "Delete Test Coupon"}
        </button>
      </div>

      {/* Status Messages */}
      <div className="space-y-2">
        {addCouponMutation.isError && (
          <p className="text-red-600">
            Add Error: {addCouponMutation.error?.message}
          </p>
        )}
        {updateCouponMutation.isError && (
          <p className="text-red-600">
            Update Error: {updateCouponMutation.error?.message}
          </p>
        )}
        {deleteCouponMutation.isError && (
          <p className="text-red-600">
            Delete Error: {deleteCouponMutation.error?.message}
          </p>
        )}
      </div>
    </div>
  );
};
