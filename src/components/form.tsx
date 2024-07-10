import React, { ChangeEvent, FormEvent } from 'react';

interface Props {
  formSubmit: (e: FormEvent) => void;
  inputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  textButton: string;
}

export default function Form(props: Props): JSX.Element {
  return (
    <>
      <form onSubmit={props.formSubmit}>
        <input type="text" onChange={props.inputChange} />
        <button type="submit">{props.textButton}</button>
      </form>
    </>
  );
}
