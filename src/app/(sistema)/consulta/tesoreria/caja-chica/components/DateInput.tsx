export function DateInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="dd/mm/aaaa"
        className="h-[40px] w-full rounded-[5px] border border-[#d8d8d8] bg-white px-3 pr-10 text-[13px] text-[#374151] outline-none transition-colors placeholder:text-[#4b5563] focus:border-[#2447b9]"
      />
      <i className="bi bi-calendar-event absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-black" />
    </div>
  )
}
