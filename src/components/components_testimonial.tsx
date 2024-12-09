import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  quote: string;
  rating: number;
}

export function Testimonial({ name, quote, rating }: TestimonialProps) {
  return (
    <Card className="hover:shadow-lg transition duration-300 border-blue-200">
      <CardContent className="flex flex-col items-center p-6">
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-center text-gray-600 mb-4">&qout;{quote}&qout;</p>
        <p className="font-semibold text-primary">{name}</p>
      </CardContent>
    </Card>
  );
}
