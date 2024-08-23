import { X } from 'lucide-react'

interface ModalProps {
  title: string
  description: string
  children: React.ReactNode
  onCloseModal: () => void
}

const Modal = ({ title, description, children, onCloseModal }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-zinc-950 shadow-md rounded-lg p-6 w-full max-w-md space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-xl text-zinc-50 font-semibold">{title}</h1>
            <span className='text-zinc-400'>{description}</span>
          </div>
          <button type="button" onClick={onCloseModal}>
            <X className="w-6 h-6 text-zinc-600" />
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}

export default Modal