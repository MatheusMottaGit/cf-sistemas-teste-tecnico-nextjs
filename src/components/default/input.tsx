interface InputProps extends React.ComponentProps<'input'> {
  label?: string
}

const Input = ({ label, id, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-medium text-zinc-200" htmlFor={id}>
          {label}
        </label>
      )}

      <input {...props} className="py-1.5 px-2 bg-transparent rounded-lg text-sm border border-zinc-600 outline-none text-zinc-300" />
    </div>
  )
}

export default Input
