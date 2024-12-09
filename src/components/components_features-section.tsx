import { Card, CardContent } from "@/components/ui/card";

export function FeaturesSection() {
  return (
    <section className="py-20" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-primary">
          Why Choose Glaze Palawan Car Rental
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Convenient Location"
            description="Located just outside Puerto Princesa City Airport for easy pick-up and drop-off."
            icon="🚗"
          />
          <FeatureCard
            title="Explore Palawan"
            description="Discover beautiful beaches, the underground river, and more with our reliable vehicles."
            icon="🏝️"
          />
          <FeatureCard
            title="24/7 Support"
            description="Contact us via Whatsapp or Viber for assistance anytime during your rental period."
            icon="🛠️"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <Card className="hover:shadow-lg transition duration-300 border-blue-200">
      <CardContent className="flex flex-col items-center p-6">
        <span className="text-4xl mb-4">{icon}</span>
        <h3 className="text-lg font-semibold mb-2 text-primary">{title}</h3>
        <p className="text-center text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}

