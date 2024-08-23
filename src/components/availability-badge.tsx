interface AvailabilityBadgeProps {
  isAvailable: boolean
}

const AvailabilityBadge = ({ isAvailable }: AvailabilityBadgeProps) => {
  return (
    <div
      className={`rounded-full text-white p-1 px-4 w-24 flex shadow items-center justify-center text-xs ${
        isAvailable ? "bg-teal-950 text-teal-300" : "bg-red-950 text-red-300"
      }`}
    >
      {isAvailable ? "Disponível" : "Indisponível"}
    </div>
  )
}

export default AvailabilityBadge
