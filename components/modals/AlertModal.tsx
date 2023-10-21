import { Button } from "../ui/button";
import { Modal } from "../ui/modal";

interface AlertModalProps {
    onSubmit: VoidFunction;
    loading: boolean;
    isOpen: boolean;
    onClose: VoidFunction;
}

const AlertModal = ({ loading, onClose, isOpen, onSubmit }: AlertModalProps) => {
    return (
        <Modal
            title="Delete"
            description="This action can't be undone!"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex justify-end">
                <Button disabled={loading} variant="outline" type="button" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant='destructive' disabled={loading} type="submit" onClick={onSubmit}>
                    Delete
                </Button>
            </div>
        </Modal>
    );
};

export default AlertModal;
