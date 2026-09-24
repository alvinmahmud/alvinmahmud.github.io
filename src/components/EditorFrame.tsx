import type { ReactNode } from "react";

interface EditorFrameProps {
  children: ReactNode;
  filename: string;
  meta?: string;
  bodyClassName?: string;
}

export function EditorFrame({
  children,
  filename,
  meta = "UTF-8  LN 1, COL 1",
  bodyClassName = "",
}: EditorFrameProps) {
  return (
    <section className="editor-frame">
      <header className="editor-bar">
        <div className="traffic-lights" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="editor-path">
          <span>~/portfolio</span>
          <span aria-hidden="true">/</span>
          <strong>{filename}</strong>
        </p>
        <p className="editor-meta">{meta}</p>
      </header>
      <div className={`editor-body ${bodyClassName}`.trim()}>{children}</div>
    </section>
  );
}
