import ProgressBar from './progressBar';

const Card = () => {
  return (
    <div className=" w-[20%] rounded-xl min-w-[250px] shadow-lg m-4 bg-white text-black">
      <img className="w-full rounded-t-xl" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains" />
      <div className="px-5 py-3">
        <div className="font-bold text-lg mb-2">Meeting Website</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis
          eaque, exercitationem praesentium nihil.
        </p>
      </div>

      <ProgressBar progress="9" />
    </div>
  );
};

export default Card;
