export const NotaButton = ({
  note,
  onClick,
}: {
  note?: string
  onClick?: () => void
}) => {
  if (note) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group relative ml-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[2px] bg-[#0b65d8] text-[12px] font-bold italic leading-none text-white shadow-sm transition-transform hover:-translate-y-0.5"
        aria-label="Editar nota informativa"
      >
        i
        <span className="pointer-events-none absolute left-1/2 top-[26px] z-30 hidden w-[164px] -translate-x-1/2 overflow-hidden rounded-[4px] bg-white text-center not-italic shadow-[0_4px_16px_rgba(0,0,0,0.22)] group-hover:block">
          <span className="absolute -top-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 bg-[#2447ff]" />
          <span className="relative block bg-[#2447ff] px-3 py-2 text-[18px] font-normal leading-none text-white">
            Nota Informativa
          </span>
          <span className="block px-3 py-4 text-[16px] font-normal leading-tight text-[#222]">
            {note}
          </span>
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="ml-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[2px] border border-dashed border-[#9ca3af] bg-white text-[16px] leading-none text-[#6b7280] transition-all hover:-translate-y-0.5 hover:border-[#0b65d8] hover:bg-[#f7fbff] hover:text-[#0b65d8] hover:shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
      aria-label="Agregar nota informativa"
    >
      +
    </button>
  )
}