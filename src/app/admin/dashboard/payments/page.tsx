import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Payment } from "@prisma/client";
import { findAllPaymentsUseCase } from "@/use-cases/payment";

const page = async () => {
  let data: Payment[] = [];
  let error;

  try {
    data = await findAllPaymentsUseCase();
  } catch (err) {
    console.error(err);
    error = "Error fetching data";
  }
  return (
    <div>{!error ? <DataTable data={data} columns={columns} /> : error}</div>
  );
};

export default page;
