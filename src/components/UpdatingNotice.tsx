
function UpdatingNotice({ btnText }: { btnText: string }) {
  return (
    <div className="mt-12 flex justify-center">
      <div className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-rose-100 via-purple-100 to-blue-100 dark:from-rose-950/30 dark:via-purple-950/30 dark:to-blue-950/30 rounded-full border border-rose-200/50 dark:border-rose-800/30">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
        </div>
        <span className="text-sm font-medium text-rose-700 dark:text-rose-300">
            {btnText}   
        </span>
      </div>
    </div>
  )
}

export default UpdatingNotice
