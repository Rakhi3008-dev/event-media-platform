export default function Footer() {
    return (
      <footer className="bg-slate-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-8 py-10">
  
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
  
            <div>
              <h2 className="text-2xl font-bold">
                🎉 EventHub
              </h2>
  
              <p className="text-gray-400 mt-2">
                Create, manage and share event memories.
              </p>
            </div>
  
            <div className="text-gray-400">
              <p>AI-Powered Event Media Platform</p>
            </div>
  
          </div>
  
          <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
  
            <p className="text-gray-400">
              © 2026 EventHub. All rights reserved.
            </p>
  
            <p className="text-gray-400">
              Built by Rakhi Jha
            </p>
  
          </div>
  
        </div>
      </footer>
    );
  }