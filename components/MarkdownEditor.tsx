import 'easymde/dist/easymde.min.css';

import dynamic from 'next/dynamic';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

const MarkdownEditor = (props: {
  setProjectDescription: (arg0: string) => void;
  projectDescription: string;
}): JSX.Element => {
  const onChange = (value: string): void => {
    props.setProjectDescription(value);
  };
  return (
    <>
      <SimpleMDE value={props.projectDescription} onChange={onChange} />
    </>
  );
};

export default MarkdownEditor;
