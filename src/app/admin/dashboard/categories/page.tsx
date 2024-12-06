import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Category } from "@prisma/client";
import { findAllCategoriesUseCase } from "@/use-cases/category";

const page = async () => {
  let data: Category[] = [];
  let error;

  try {
    data = await findAllCategoriesUseCase();
  } catch (err) {
    console.error(err);
    error = "Error fetching data";
  }
  return (
    <div>{!error ? <DataTable data={data} columns={columns} /> : error}</div>
  );
};

export default page;
