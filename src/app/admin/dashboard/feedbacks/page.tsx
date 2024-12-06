import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Feedback } from "@prisma/client";
import { findAllFeedbacksUseCase } from "@/use-cases/feedback";

const page = async () => {
  let data: Feedback[] = [];
  let error;

  try {
    data = await findAllFeedbacksUseCase();
  } catch (err) {
    console.error(err);
    error = "Error fetching data";
  }
  return (
    <div>{!error ? <DataTable data={data} columns={columns} /> : error}</div>
  );
};

export default page;
