export function SummaryBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex h-[44px] items-center justify-center rounded-[7px] border-2 border-[#333333] bg-white text-center text-[13px] font-extrabold">
      {label}: {value}
    </div>
  )
}
