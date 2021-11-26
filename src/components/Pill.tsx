interface Props {
  text: string | number;
  type: 'success' | 'danger' | 'disable';
}

const Pill = ({ text, type }: Props): JSX.Element => {
  const getStyleFromType = () => {
    switch (type) {
      case 'success': {
        return 'bg-green-500 text-white';
      }
      case 'danger': {
        return 'bg-red-500 text-white';
      }
      case 'disable': {
        return 'bg-gray-500 text-white';
      }
      default: {
        return 'bg-gray-500 text-white';
      }
    }
  };

  return (
    <div className={'font-bold h-8 w-8 rounded-full inline-flex items-center justify-center ' + getStyleFromType()}>
      <p>{text}</p>
    </div>
  );
};

export default Pill;
