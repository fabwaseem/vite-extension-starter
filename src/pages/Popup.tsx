import { useEffect, useState } from "react";
import browser from "webextension-polyfill";

export default function () {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    console.log("Hello from the popup!");

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get current tab info
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      if (tabs[0]) {
        setActiveTab(tabs[0].title || "Unknown");
      }
    });

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const quickActions = [
    {
      name: "Bookmarks",
      icon: "⭐",
      action: () => browser.tabs.create({ url: "chrome://bookmarks" }),
    },
    {
      name: "History",
      icon: "📖",
      action: () => browser.tabs.create({ url: "chrome://history" }),
    },
    {
      name: "Extensions",
      icon: "🧩",
      action: () => browser.tabs.create({ url: "chrome://extensions" }),
    },
    {
      name: "Settings",
      icon: "⚙️",
      action: () => browser.tabs.create({ url: "chrome://settings" }),
    },
  ];

  return (
    <div className="w-80 bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/icon-with-shadow.svg" className="size-8" />
            <div>
              <h1 className="font-bold text-lg">Extension Hub</h1>
              <p className="text-blue-100 text-xs">
                Your productivity companion
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">{formatTime(currentTime)}</div>
            <div className="text-xs text-blue-200">
              {currentTime.toLocaleDateString([], {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Current Tab Info */}
      <div className="p-4 bg-white/60 border-b border-blue-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Current Tab
        </h3>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 truncate">{activeTab}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="bg-white hover:bg-blue-50 border border-blue-200 rounded-lg p-3 transition-all duration-200 hover:shadow-md hover:scale-105 group"
            >
              <div className="text-center">
                <div className="text-xl mb-1 group-hover:scale-110 transition-transform">
                  {action.icon}
                </div>
                <div className="text-xs font-medium text-gray-700">
                  {action.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 pt-0">
        <div className="text-center mt-3">
          <p className="text-xs text-gray-500">
            Built with <span className="text-red-500">♥</span> using React &
            Vite
          </p>
        </div>
      </div>
    </div>
  );
}
