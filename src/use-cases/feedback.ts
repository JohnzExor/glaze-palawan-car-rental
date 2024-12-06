import { findAllFeedbacks } from "@/data-access/feedback";

export const findAllFeedbacksUseCase = async () => {
  const data = await findAllFeedbacks();
  return data;
};
