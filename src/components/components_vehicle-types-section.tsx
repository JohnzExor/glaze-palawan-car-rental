import { VehicleTypeIcon } from "@/app/vehicle-type-icon";
import { Card, CardContent } from "@/components/ui/card";
import { VehicleType } from "@prisma/client";
import { motion } from "framer-motion";

export function VehicleTypesSection() {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-primary">
          Our Vehicle Types
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {Object.values(VehicleType).map((type, index) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition duration-300 border-blue-200">
                <CardContent className="flex flex-col items-center p-6 h-full">
                  <VehicleTypeIcon
                    type={type}
                    className="w-16 h-16 text-primary mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2 text-primary">
                    {type}
                  </h3>
                  <p className="text-center text-gray-600 flex-grow">
                    {getVehicleTypeDescription(type)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function getVehicleTypeDescription(type: VehicleType): string {
  switch (type) {
    case "CAR":
      return "Comfortable and efficient for city exploration and short trips.";
    case "SUV":
      return "Spacious and versatile for family adventures and off-road experiences.";
    case "VAN":
      return "Perfect for group travel and long-distance journeys to Palawan's attractions.";
    case "MOTORCYCLE":
      return "Fast and agile, ideal for solo travelers exploring Palawan's scenic routes.";
  }
}
