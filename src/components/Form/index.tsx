import React, { ChangeEvent, FormEvent, ReactNode } from 'react';

interface Props {
  inputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formSubmit: (e: FormEvent) => void;
  value: string;
  textButton?: string;
  icon?: ReactNode;
}

export default function Form(props: Props): JSX.Element {
  return (
    <>
      <form onSubmit={props.formSubmit}>
        <input
          type="text"
          onChange={props.inputChange}
          value={props.value}
          autoFocus
        />
        <button type="submit">
          {props.icon}
          {props.textButton}
        </button>
      </form>
    </>
  );
}
