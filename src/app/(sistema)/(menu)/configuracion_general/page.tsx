import { ConfigurationCard } from "./_components/ConfigurationCard";
import { configurationSections } from "./data/images";

export default function ConfiguracionGeneralPage() {
  return (
    <section
      aria-label="Configuración general"
      className="mx-auto w-full max-w-[1388px] py-5 sm:py-7 lg:py-9"
    >
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
        {configurationSections.map((section) => (
          <ConfigurationCard key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}
