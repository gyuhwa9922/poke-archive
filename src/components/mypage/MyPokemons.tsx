const Mydex = () => {
  return (
    <div className="bg-white roounded-2xl shadoow-sm hover:shadow-xl hover: translate-y-1 transition-all duration-300 flex flex-col border border-graw-100 overflow-hidden h-fit w-full">
      <div className="relative h-44 flex items-center justify-center bg-[#F7F9F8] transition-colors shrink-0 cursor-pointer">
        <img className="w-28 h-28 object-contain drop-shadow-mb"></img>
      </div>
      <div className="flex flex-col gap-4 p-2.5">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-gray-300 tracking-wider leading-none p-1.5">No.001</span>
          <div className="p-1.5">
            <h3 className="text-xl text-gray-800 leading-tight">이상해씨</h3>
          </div>
          <div className="flex flex-wrap gap-2 p-1.5">타입</div>
        </div>
      </div>
    </div>
  );
};

export default Mydex;
