import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/common/Button";

type CreateTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => Promise<boolean>;
  isLoading?: boolean;
  initialTitle?: string;
  modalTitle?: string;
  submitLabel?: string;
  loadingLabel?: string;
};

export function CreateTaskModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  initialTitle = "",
  modalTitle = "Create New Task",
  submitLabel = "Create Task",
  loadingLabel = "Creating...",
}: CreateTaskModalProps) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
    } else {
      setTitle("");
    }
  }, [isOpen, initialTitle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = title.trim();
    if (!trimmed) return;

    const success = await onSubmit(trimmed);
    if (success) {
      setTitle("");
      onClose();
    }
  };

  if (!isOpen) return <></>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-text">{modalTitle}</h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <label
              htmlFor="task-title"
              className="text-sm font-medium text-text"
            >
              Task Title
            </label>
            <input
              id="task-title"
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-text outline-none transition focus:border-primary"
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              variant="primary"
              disabled={!title.trim() || isLoading}
              className="flex-1"
            >
              {isLoading ? loadingLabel : submitLabel}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="bg-white hover:border-primary hover:text-primary"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
