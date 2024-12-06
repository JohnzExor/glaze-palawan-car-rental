import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Booking } from "@prisma/client";
import { findAllBookingsUseCase } from "@/use-cases/booking";

const page = async () => {
  let data: Booking[] = [];
  let error;

  try {
    data = await findAllBookingsUseCase();
  } catch (err) {
    console.error(err);
    error = "Error fetching data";
  }
  return (
    <div>{!error ? <DataTable data={data} columns={columns} /> : error}</div>
  );
};

export default page;
