import { LoaderCircle } from "lucide-react";

const loading = () => {
  return (
    <div className="h-screen flex items-center justify-center w-full">
      <LoaderCircle className="animate-spin text-primary" />
    </div>
  );
};

export default loading;
