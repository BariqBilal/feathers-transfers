"use client";
import { FC, useEffect, useState, useRef } from "react";
import { Menu, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

interface TopNavbarProps {
  setSidebarOpen: (open: boolean) => void;
  onMenuClick: (view: string) => void;
}

const TopNavbar: FC<TopNavbarProps> = ({ setSidebarOpen, onMenuClick }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("https://devsquare-apis.vercel.app/api/transfers/notifications");
        if (!res.ok) return;
        const data = await res.json();
        if (data.success) {
          setNotifications(data.notifications);
          const unread = data.notifications.filter((n: any) => !n.is_read).length;
          setUnreadCount(unread);
        }
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm relative">
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded hover:bg-gray-100 block lg:hidden"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-md font-bold text-gray-800">Admin Dashboard</h1>
      </div>

      <div className="flex items-center space-x-6">
        {/* 🔔 Notifications with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowDropdown((prev) => !prev)}
            className="relative p-2 rounded hover:bg-gray-100"
          >
            <Bell className="h-6 w-6 text-gray-700" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                {unreadCount}
              </span>
            )}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border z-50">
              <div className="p-3 font-semibold border-b">Notifications</div>
              <ul className="max-h-64 overflow-y-auto">
                {notifications.slice(0, 5).map((n) => (
                  <li key={n.id} className="px-4 py-2 border-b text-sm hover:bg-gray-50">
                    <p className="font-medium">{n.title}</p>
                    <p className="text-gray-600 truncate">{n.message}</p>
                  </li>
                ))}
                {notifications.length === 0 && (
                  <li className="px-4 py-6 text-center text-gray-500 text-sm">
                    No notifications
                  </li>
                )}
              </ul>
              <div className="p-2 text-center">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => {
                    setShowDropdown(false);
                    onMenuClick("Notifications");
                    setUnreadCount(0);
                  }}
                >
                  View All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopNavbar;
