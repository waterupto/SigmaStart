import { FcGoogle } from 'react-icons/fc';

interface socialProps {
  icon: any;
  handle: string;
  func: Function;
}

const Social = (props: socialProps) => {
  return (
    <div
      className="text-md bg-gray-600 hover:bg-gray-500 flex items-center mx-10 px-5 justify-start my-3 py-5 rounded-lg h-5"
      onClick={() => props.func(props.handle)}
    >
      <props.icon />
      <span className="font-bold pl-5"> {props.handle}</span>
    </div>
  );
};

export default Social;
