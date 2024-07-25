import React from 'react';

interface Props {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button(props: Props): JSX.Element {
  return <button onClick={props.onClick}>{props.text}</button>;
}
