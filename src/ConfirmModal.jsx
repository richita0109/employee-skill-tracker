function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-[#1e1b4b] p-6 rounded-xl border border-white/10 w-80 text-center">

        <h2 className="text-lg font-semibold mb-4 text-white">
          Are you sure?
        </h2>

        <p className="text-gray-300 mb-6 text-sm">
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-500/30 hover:bg-gray-500/50 transition text-white"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 hover:opacity-90 transition text-white"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default ConfirmModal;