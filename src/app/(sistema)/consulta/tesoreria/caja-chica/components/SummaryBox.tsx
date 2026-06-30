export function SummaryBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex h-[44px] items-center justify-center border border-[#333333] text-center text-[13px] font-extrabold">
      {label}: {value}
    </div>
  )
}
