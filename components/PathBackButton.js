

import { useRouter } from 'next/router';

const PathBackButton = () => {
  const router = useRouter();

    return (
      <div>
            <button
           className="text-2xl p-2 cursor-pointer hover:bg-gray-400 hover:rounded-md transition-all duration-300 ease-in-out"

                onClick={() => router.back()}>
      ←
    </button>   
      </div>
  
  );
};


export default PathBackButton;