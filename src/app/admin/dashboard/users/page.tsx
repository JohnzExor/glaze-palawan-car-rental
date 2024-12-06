import { findAllUsersUseCase } from "@/use-cases/user";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { User } from "@prisma/client";

const page = async () => {
  let data: User[] = [];
  let error;

  try {
    data = await findAllUsersUseCase();
  } catch (err) {
    console.error(err);
    error = "Error fetching data";
  }
  return (
    <div>{!error ? <DataTable data={data} columns={columns} /> : error}</div>
  );
};

export default page;
