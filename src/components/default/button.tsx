import { Loader } from 'lucide-react'
import { tv, VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: "p-1.5 flex items-center text-sm transition-colors justify-center gap-1 rounded-lg w-full",
  variants: {
    variant: {
      default: "bg-teal-600 hover:bg-teal-600/90 text-zinc-50",
      destructive: "bg-red-500 hover:bg-red-500/90",
      "underline-destructive": "bg-transparent border border-dashed border-red-700 hover:bg-red-700 hover:text-zinc-50 text-red-700"
    },

    width: {
      sm: "w-28"
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants>{
  children: React.ReactNode
  isLoading?: boolean
}

const Button = ({ children, isLoading, variant, width, ...props }: ButtonProps) => {
  return (
    <button
      {...props} 
      className={buttonVariants({ variant, width })}
      disabled={isLoading}
    >
      { isLoading ? <Loader className='size-5 animate-spin' /> : children }
    </button>
  )
}

export default Button