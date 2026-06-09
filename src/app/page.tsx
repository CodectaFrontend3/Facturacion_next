import { redirect } from "next/navigation";

export default function Home() {
  // Redirige automáticamente la raíz de la web a la pantalla de login
  redirect("/login");
}