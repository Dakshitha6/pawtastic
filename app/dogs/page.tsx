import { redirect } from "next/navigation";

export default function DogsPage() {
  redirect("/dogs/browse");
}
