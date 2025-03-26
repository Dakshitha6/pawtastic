import { ProtectedRoute } from "@/components/protected-route";

export const metadata = {
  title: "Edit Dog Listing - Pawtastic",
  description: "Edit your dog listing on Pawtastic",
};

export default function EditDogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
