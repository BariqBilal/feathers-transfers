"use client"

import { useState, useEffect } from "react"

import FindBookings from "../../component/Find-bookings";
import Sidebar from "../../component/sidebar"
import DriverRegistrations from "../../component/notifications"
import TopNavbar from "../../component/TopNavbar"
import DateBasedPricingTab from "../../component/Date-based-price"
import PricingAdmin from "../../component/rates-with-passengers"
import NightPricingAdmin from "../../component/NightPricingAdmin"
import NotificationsTab from "../../component/notifications"
import WeekendPricingAdmin from "../../component/Weekend-prices"
import CompletedTransfers from "../../component/Completed-transfers"
import { useRouter } from "next/navigation";


export default function AdminDashboard() {
   const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (token) {
      // If logged in → dashboard
      router.replace("/dashboard")
    } else {
      // If not logged in → login
      router.replace("/login")
    }
  }, [router])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentView, setCurrentView] = useState("Bookings")
  const [unreadCount, setUnreadCount] = useState(0)

  // 🔔 Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("https://devsquare-apis.vercel.app/api/transfers/notifications")
        const data = await res.json()
        if (data.success) {
          const unread = data.notifications.filter((n: any) => !n.is_read).length
          setUnreadCount(unread)
        }
      } catch (err) {
        console.error("Failed to fetch notifications", err)
      }
    }

    fetchNotifications()
    const interval = setInterval(fetchNotifications, 30000) // poll every 30s
    return () => clearInterval(interval)
  }, [])

  const renderContent = () => {
    switch (currentView) {
      case "Bookings":
        return <FindBookings />
      case "Date-Based Pricing":
        return <DateBasedPricingTab />
      case "Rates":
        return <PricingAdmin />
      case "Completed Transfers":
        return <CompletedTransfers/>
      case "Night Time Pricing":
        return <NightPricingAdmin />
      case "Notifications":
        return <NotificationsTab />
      case "Weekend Prices":
        return < WeekendPricingAdmin />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentView={currentView}
        onMenuClick={setCurrentView}

      />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar
          setSidebarOpen={setSidebarOpen}
          onMenuClick={setCurrentView}   // 👈 add this
        />


        <main className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold mb-4">{currentView}</h2>
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
