import StatusBoardTest from '@/features/board/test/StatusBoard.test';

const BoardTestPage = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <aside className="hidden md:flex w-[72px] bg-white border-r border-gray-400 flex-col items-center py-4">
        <div className="w-11 h-11 rounded-full bg-gray-300 mb-4" />
        <div className="flex flex-col gap-4 mt-4">
          <div className="w-6 h-6 bg-gray-300 rounded" />
          <div className="w-6 h-6 bg-gray-300 rounded" />
          <div className="w-6 h-6 bg-gray-300 rounded" />
        </div>
        <div className="mt-auto mb-4 w-6 h-6 bg-red-200 rounded" />
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        <nav className="h-12 bg-gray-100 border-b border-gray-400 flex items-center px-4 gap-6">
          <div className="w-16 h-5 bg-gray-300 rounded" />
          <div className="w-16 h-5 bg-gray-300 rounded" />
          <div className="w-16 h-5 bg-gray-300 rounded" />
        </nav>

        <header className="bg-white border-b border-gray-400 shadow-sm">
          <div className="hidden sm:flex items-center justify-between p-6">
            <div className="flex flex-col gap-2">
              <div className="w-32 h-4 bg-gray-300 rounded" />
              <div className="w-48 h-6 bg-gray-300 rounded" />
            </div>

            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded" />
              <div className="w-8 h-8 bg-gray-300 rounded" />
              <div className="w-24 h-8 bg-blue-300 rounded" />
            </div>
          </div>

          <div className="flex sm:hidden flex-col gap-2 p-4">
            <div className="w-32 h-4 bg-gray-300 rounded" />
            <div className="flex justify-between items-center">
              <div className="w-32 h-5 bg-gray-400 rounded" />
              <div className="flex gap-1">
                <div className="w-6 h-6 bg-gray-300 rounded" />
                <div className="w-6 h-6 bg-gray-300 rounded" />
              </div>
            </div>
            <div className="w-full h-8 bg-boost-blue/50 rounded" />
          </div>
        </header>

        <div className="border-b border-gray-400 bg-white">
          <div className="hidden lg:flex items-center justify-between p-2 px-4">
            <div className="flex gap-4">
              <div className="w-40 h-8 bg-gray-200 rounded" />
              <div className="w-32 h-8 bg-gray-200 rounded" />
            </div>
            <div className="flex gap-4">
              <div className="w-24 h-8 bg-gray-200 rounded" />
              <div className="w-24 h-8 bg-gray-200 rounded" />
            </div>
          </div>

          <div className="flex lg:hidden items-center justify-between p-2 px-4">
            <div className="w-32 h-8 bg-gray-200 rounded" />
            <div className="flex gap-2">
              <div className="w-10 h-8 bg-gray-200 rounded" />
              <div className="w-10 h-8 bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        <section className="flex-1 overflow-hidden">
          <StatusBoardTest />
        </section>
      </div>
    </div>
  );
};

export default BoardTestPage;
