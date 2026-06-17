import { ActionButton } from "@/components/common/ActionButton";

export const CompartirButtons = ({
  celular,
  correo,
  numeroDoc
}: {
  celular?: string | null;
  correo?: string | null;
  numeroDoc: string;
}) => {

  const telefonoDestino = celular || "Sin número";
  const correoDestino = correo || "Sin correo";

  return (
    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
      {/* BOTÓN CORREO ELECTRÓNICO */}
      <ActionButton
        icon={<i className="bi bi-envelope"></i>}
        className="w-9 h-9 bg-[#6c757d] hover:bg-[#5a6268] rounded-[3px]"
        isPopover={true}
        popoverOptions={[
          {
            label: `Enviar por mensajería a: ${correoDestino}`,
            onClick: () => {
              if (correo) {
                window.open(`mailto:${correo}?subject=Documento Comercial %23${numeroDoc}`, "_blank");
              } else {
                alert("Este cliente no cuenta con correo electrónico registrado.");
              }
            }
          }
        ]}
      />

      {/* BOTÓN WHATSAPP */}
      <ActionButton
        icon={<i className="bi bi-whatsapp"></i>}
        className="w-9 h-9 bg-[#28a745] hover:bg-[#218838] rounded-[3px]"
        isPopover={true}
        popoverOptions={[
          {
            label: `Enviar por WhatsApp al: ${telefonoDestino}`,
            onClick: () => {
              if (celular) {
                const numeroLimpio = celular.replace(/\s+/g, "").replace(/-/g, "");
                const mensaje = encodeURIComponent(`Hola, le hacemos llegar su documento comercial N° ${numeroDoc}.`);
                window.open(`https://api.whatsapp.com/send?phone=${numeroLimpio}&text=${mensaje}`, "_blank");
              } else {
                alert("Este cliente no cuenta con un número de celular registrado.");
              }
            }
          }
        ]}
      />
    </div>
  );
}
