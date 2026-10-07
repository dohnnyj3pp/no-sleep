import { useEffect, useRef } from "react";
import { Icon } from "./Icon";
export type Notice = { title: string; body: string };
export type NoticeHandler = (notice: Notice) => void;
export function NoticeDialog({
  notice,
  onClose,
}: {
  notice: Notice | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (notice && !ref.current?.open) ref.current?.showModal();
    if (!notice && ref.current?.open) ref.current.close();
  }, [notice]);
  return (
    <dialog
      ref={ref}
      className="notice-dialog"
      aria-labelledby="notice-title"
      onCancel={onClose}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="notice-content">
        <button
          className="icon-button dialog-close"
          aria-label="Close message"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
        <p className="eyebrow">NO SLEEP / STUDIO NOTES</p>
        <h2 id="notice-title">{notice?.title}</h2>
        <p>{notice?.body}</p>
        <button className="button button--primary" onClick={onClose}>
          BACK TO THE STUDIO <Icon name="arrow" />
        </button>
      </div>
    </dialog>
  );
}
