import { Card, CardContent } from "@/components/ui/card";
import { PhoneIcon, MapPinIcon, MessageCircleIcon } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-20 bg-muted" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-primary">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ContactCard
            icon={<MessageCircleIcon className="w-8 h-8 text-green-500" />}
            title="Whatsapp/Viber"
            content="09159212806"
          />
          <ContactCard
            icon={<PhoneIcon className="w-8 h-8 text-blue-500" />}
            title="Phone"
            content="09159212806"
          />
          <ContactCard
            icon={<MapPinIcon className="w-8 h-8 text-red-500" />}
            title="Address"
            content="Purok Kilos-Agad Brgy. San Miguel, Puerto Princesa City - Palawan"
          />
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) {
  return (
    <Card className="hover:shadow-lg transition duration-300 border-blue-200">
      <CardContent className="flex flex-col items-center p-6">
        {icon}
        <h3 className="text-lg font-semibold my-2 text-primary">{title}</h3>
        <p className="text-center text-gray-600">{content}</p>
      </CardContent>
    </Card>
  );
}
