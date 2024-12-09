import { Testimonial } from "./components_testimonial";

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-primary">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Testimonial
            name="John Doe"
            quote="Great service! The car was in excellent condition and made our Palawan trip unforgettable."
            rating={5}
          />
          <Testimonial
            name="Jane Smith"
            quote="Friendly staff and hassle-free rental process. Will definitely use Glaze again!"
            rating={4}
          />
          <Testimonial
            name="Mike Johnson"
            quote="The SUV we rented was perfect for our family adventure. Highly recommended!"
            rating={5}
          />
        </div>
      </div>
    </section>
  );
}
