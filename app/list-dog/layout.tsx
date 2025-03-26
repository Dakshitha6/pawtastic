import { ProtectedRoute } from "@/components/protected-route";

export const metadata = {
  title: "List Dog - Pawtastic",
  description: "List your dog for adoption or fostering",
};

export default function ListDogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
