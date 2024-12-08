import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Vehicle } from "@prisma/client";
import { findAllVehiclesUseCase } from "@/use-cases/vehicle";
import AddVehicleDialog from "./add-vehicle-dialog";

const page = async () => {
  let data: Vehicle[] = [];
  let error;

  try {
    data = await findAllVehiclesUseCase();
  } catch (err) {
    console.error(err);
    error = "Error fetching data";
  }
  return (
    <>
      <AddVehicleDialog />
      {!error ? <DataTable data={data} columns={columns} /> : error}
    </>
  );
};

export default page;
