import React, { ReactNode } from 'react';

interface Props {
  icon?: ReactNode;
  text?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button(props: Props): JSX.Element {
  return (
    <button onClick={props.onClick}>
      {props.icon}
      {props.text}
    </button>
  );
}
