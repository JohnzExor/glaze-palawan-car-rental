"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface FiltersProps {
  transmissionTypes: string[];
  seatingCapacities: string[];
}

export function Filters({
  transmissionTypes,
  seatingCapacities,
}: FiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 10000]);

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="transmission">
          <AccordionTrigger>Transmission</AccordionTrigger>
          <AccordionContent>
            {transmissionTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2 mb-2">
                <Checkbox id={`transmission-${type}`} />
                <Label htmlFor={`transmission-${type}`}>{type}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="seating">
          <AccordionTrigger>Seating Capacity</AccordionTrigger>
          <AccordionContent>
            {seatingCapacities.map((capacity) => (
              <div key={capacity} className="flex items-center space-x-2 mb-2">
                <Checkbox id={`capacity-${capacity}`} />
                <Label htmlFor={`capacity-${capacity}`}>{capacity} seats</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <Slider
              min={0}
              max={10000}
              step={100}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mt-2"
            />
            <div className="flex justify-between mt-2">
              <span>₱{priceRange[0]}</span>
              <span>₱{priceRange[1]}</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button className="w-full mt-4">Apply Filters</Button>
    </div>
  );
}
