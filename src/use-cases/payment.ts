import { findAllPayments } from "@/data-access/payment";

export const findAllPaymentsUseCase = async () => {
  const data = await findAllPayments();
  return data;
};
