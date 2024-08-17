import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"

interface AlertModalProps {
  diasbled?: boolean
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const AlertModal: React.FC<AlertModalProps> = ({
  diasbled,
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      title="Are you sure to delete!"
      description="This action can not be undone!"
      isOpen={open}
      onClose={onClose}
    >
      <div className="w-full mt-4 items-center justify-end flex gap-x-2">
        <Button
          variant="outline"
          disabled={diasbled}
          type="button"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button variant="destructive" disabled={diasbled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  )
}
export { AlertModal }
