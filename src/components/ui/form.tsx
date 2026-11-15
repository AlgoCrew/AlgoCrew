import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import s from "./ui.module.scss";

/**
 * Form primitives (docs/website-transformation/08 §6, §9). Server components: they render
 * markup and ARIA wiring only. Validation state is passed in by the form that owns it.
 *
 * Rules these enforce: a visible label on every control, help and error text tied to the
 * control with aria-describedby, errors stated in text (never colour alone).
 */

const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(" ");

type FieldMeta = { label: string; help?: string; error?: string; optional?: boolean };

const describedBy = (id: string, { help, error }: FieldMeta) =>
  [help && `${id}-help`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;

function FieldShell({ id, meta, children }: { id: string; meta: FieldMeta; children: ReactNode }) {
  return (
    <div className={s.field}>
      <label className={s.label} htmlFor={id}>
        {meta.label} {meta.optional && <span className={s.optional}>(optional)</span>}
      </label>
      {children}
      {meta.help && (
        <span className={s.help} id={`${id}-help`}>
          {meta.help}
        </span>
      )}
      {meta.error && (
        <span className={s.error} id={`${id}-error`}>
          {meta.error}
        </span>
      )}
    </div>
  );
}

type WithMeta<T> = Omit<T, "id" | "className" | "aria-invalid" | "aria-describedby"> & FieldMeta & { id: string };

const split = <T extends FieldMeta>({ label, help, error, optional, ...rest }: T) => ({
  meta: { label, help, error, optional },
  rest,
});

export function TextField(props: WithMeta<InputHTMLAttributes<HTMLInputElement>>) {
  const { meta, rest } = split(props);
  return (
    <FieldShell id={props.id} meta={meta}>
      <input
        type="text"
        {...rest}
        required={rest.required ?? !meta.optional}
        className={s.control}
        aria-invalid={meta.error ? true : undefined}
        aria-describedby={describedBy(props.id, meta)}
      />
    </FieldShell>
  );
}

export function SelectField({
  options,
  placeholder,
  ...props
}: WithMeta<SelectHTMLAttributes<HTMLSelectElement>> & { options: readonly string[]; placeholder?: string }) {
  const { meta, rest } = split(props);
  return (
    <FieldShell id={props.id} meta={meta}>
      <select
        {...rest}
        required={rest.required ?? !meta.optional}
        className={s.control}
        aria-invalid={meta.error ? true : undefined}
        aria-describedby={describedBy(props.id, meta)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </FieldShell>
  );
}

export function TextareaField(props: WithMeta<TextareaHTMLAttributes<HTMLTextAreaElement>>) {
  const { meta, rest } = split(props);
  return (
    <FieldShell id={props.id} meta={meta}>
      <textarea
        {...rest}
        required={rest.required ?? !meta.optional}
        className={cx(s.control, s.textarea)}
        aria-invalid={meta.error ? true : undefined}
        aria-describedby={describedBy(props.id, meta)}
      />
    </FieldShell>
  );
}

export function Checkbox({
  children,
  ...rest
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className"> & { children: ReactNode }) {
  return (
    <label className={s.check}>
      <input type="checkbox" {...rest} />
      <span>{children}</span>
    </label>
  );
}

/** A group of checkboxes with one legend. */
export function CheckboxGroup({ legend, optional, children }: { legend: string; optional?: boolean; children: ReactNode }) {
  return (
    <fieldset className={s.field}>
      <legend className={s.label}>
        {legend} {optional && <span className={s.optional}>(optional)</span>}
      </legend>
      <div className={s.checkGroup}>{children}</div>
    </fieldset>
  );
}

export function FormRow({ children }: { children: ReactNode }) {
  return <div className={s.formRow}>{children}</div>;
}

/**
 * Shown at the top of a form after a failed submit. Each entry links to its field.
 * The owning form moves focus here (tabIndex -1 makes that possible).
 */
export function ErrorSummary({ id, errors }: { id: string; errors: readonly { fieldId: string; message: string }[] }) {
  if (!errors.length) return null;
  return (
    <div className={cx(s.notice, s.noticeBad)} role="alert" id={id} tabIndex={-1}>
      <strong>
        Please fix {errors.length} {errors.length === 1 ? "field" : "fields"} to send your message.
      </strong>
      <ul>
        {errors.map((e) => (
          <li key={e.fieldId}>
            <a href={`#${e.fieldId}`}>{e.message}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Notice({ tone, title, children }: { tone: "good" | "bad"; title: string; children?: ReactNode }) {
  return (
    <div className={cx(s.notice, tone === "good" ? s.noticeGood : s.noticeBad)} role={tone === "good" ? "status" : "alert"} tabIndex={-1}>
      <strong>{title}</strong>
      {children}
    </div>
  );
}

export const formClass = s.form;
