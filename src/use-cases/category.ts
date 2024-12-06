import { findAllCategories } from "@/data-access/category";

export const findAllCategoriesUseCase = async () => {
  const data = await findAllCategories();
  return data;
};
