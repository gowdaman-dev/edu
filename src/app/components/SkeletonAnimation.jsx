
function SkeletonAnimation() {
  return (
    <div className=" border-teal-200 border-2 bg-white shadow   p-1  sm:w-[80%] w-full mx-auto">
    <div className="flex space-x-4 animate-pulse mt-2">
      <div className="w-10 h-10 bg-teal-300 rounded-xl"></div>
      <div className="flex-1  space-y-6">
        <div className="h-2 bg-teal-300 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-10">
            <div className="h-2 col-span-2 bg-teal-300 rounded"></div>
            <div className="h-2 col-span-1 bg-teal-300 rounded"></div>
          </div>
          <div className=" bg-teal-300 rounded"></div>
        </div>
      </div>
    </div>
    
  </div>
  )
}

export default SkeletonAnimation