import React, { ChangeEvent, FormEvent } from 'react';

interface Props {
  inputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formSubmit: (e: FormEvent) => void;
  value: string;
  textButton: string;
}

export default function Form(props: Props): JSX.Element {
  return (
    <>
      <form onSubmit={props.formSubmit}>
        <input type="text" onChange={props.inputChange} value={props.value} />
        <button type="submit">{props.textButton}</button>
      </form>
    </>
  );
}
