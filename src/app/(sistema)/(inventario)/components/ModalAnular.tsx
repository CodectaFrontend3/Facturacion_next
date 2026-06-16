import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ModalAnularProps {
  children: React.ReactNode;
  idAnular: number | string; // El ID que necesitará el endpoint
  numeroGuia: string; // El texto dinámico que se muestra en el modal
  onConfirm: (id: number | string) => void; // La función devuelve el ID
}

function ModalAnular({
  children,
  idAnular,
  numeroGuia,
  onConfirm,
}: ModalAnularProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="max-w-md p-8 flex flex-col items-center justify-center">
        <AlertDialogHeader className="text-center flex flex-col items-center gap-4">
          <AlertDialogTitle className="text-xl font-bold text-gray-800 leading-relaxed">
            ¿Está seguro que desea anular el kardex entrada con guía <br />
            N°: <br />
            <span className="block mt-1 font-extrabold text-gray-900">
              {numeroGuia}?
            </span>
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm font-semibold text-gray-700">
            Nota: Una vez anulado no hay opción de devolver la acción
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="sm:justify-center gap-3 mt-4 w-full">
          <AlertDialogCancel className="border-gray-300 text-gray-600 hover:bg-gray-50 px-6">
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() => onConfirm(idAnular)} // Aquí disparamos el ID hacia afuera
            className="bg-[#1d59bc] text-white hover:bg-[#164696] font-medium px-8"
          >
            Anular
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ModalAnular;
