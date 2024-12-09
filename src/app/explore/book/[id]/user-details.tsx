import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, UserIcon } from "lucide-react";
import { Session } from "next-auth";

export function UserDetails({ session }: { session: Session | null }) {
  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback>
              <h1 className="text-4xl font-bold">
                {session?.user.firstName[0]}
                {session?.user.lastName[0]}
              </h1>
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">
              {session?.user.firstName} {session?.user.lastName}
            </h2>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Mail className="w-4 h-4 mr-2" />
              <span>{session?.user.email}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Phone className="w-4 h-4 mr-2" />
              <span>{session?.user.phoneNumber}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
