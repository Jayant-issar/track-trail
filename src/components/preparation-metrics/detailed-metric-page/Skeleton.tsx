export function DetailedMetricSkeleton() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
        <div className="w-64 bg-gray-900 border-r border-gray-800"></div>
        
        <div className="flex-1 p-6 animate-pulse">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-6 w-6 bg-gray-700 rounded"></div>
            <div className="h-8 bg-gray-700 rounded w-1/4"></div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-8 bg-gray-700 rounded w-1/2"></div>
                  </div>
                  <div className="h-8 w-8 bg-gray-700 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 space-y-4">
                <div className="h-6 bg-gray-700 rounded w-1/4"></div>
                <div className="h-32 bg-gray-700/20 rounded-lg"></div>
                <div className="h-10 bg-gray-700 rounded-lg w-1/4"></div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-gray-700 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                  </div>
                  <div className="h-5 w-5 bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
  
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
                <div className="h-48 bg-gray-700/20 rounded-full"></div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 space-y-4">
                <div className="h-6 bg-gray-700 rounded w-1/4"></div>
                <div className="h-32 bg-gray-700/20 rounded-lg"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 h-64 bg-gray-800/50 rounded-lg border border-gray-700"></div>
        </div>
      </div>
    );
  }