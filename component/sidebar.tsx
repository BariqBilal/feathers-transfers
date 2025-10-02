"use client"

import { useState } from "react"
import { Button } from "../component/ui/button"
import {
  Calendar,
  ClipboardList,
  FileSearch,
  DollarSign,
  Bell,
  Moon
} from "lucide-react"
import Image from "next/image"


type SidebarProps = {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  currentView: string
  onMenuClick: (view: string) => void
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  currentView,
  onMenuClick
}: SidebarProps) {
  const [expandedBooking, setExpandedBooking] = useState(true)

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#000000] dark:bg-gray-800 shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      {/* Logo + Text */}
      <div className="flex justify-between items-center h-16 px-4 py-3 mt-5">
        <div className="flex items-center bg-white p-5 rounded gap-3">
          <Image src="https://res.cloudinary.com/db4w50zwc/image/upload/v1755695001/Group_2_1_zzmeep.png" alt="Feathers Transfers" height="36" width="190" />

        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-9 px-3 space-y-1 ">
        {/* Bookings */}
        <Button
          variant={currentView === "Bookings" ? "secondary" : "ghost"}
          className={`w-full justify-start gap-3 h-11 text-white text-md dark:text-white hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 ${currentView === "Bookings"
            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
            : ""
            }`}
          onClick={() => {
            onMenuClick("Bookings")
            setSidebarOpen(false)
          }}
        >
          <ClipboardList className="h-5 w-5" />
          Bookings
        </Button>


        {/* Rates */}
        <Button
          variant={currentView === "Rates" ? "secondary" : "ghost"}
          className={`w-full justify-start gap-3 h-11 text-white text-md dark:text-white hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-700  ${currentView === "Rates"
            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
            : ""
            }`}
          onClick={() => {
            onMenuClick("Rates")
            setSidebarOpen(false)
          }}
        >
          <DollarSign className="h-4 w-4" />
          Rates
        </Button>
 <Button
          variant={currentView === "Rates" ? "secondary" : "ghost"}
          className={`w-full justify-start gap-3 h-11 text-white text-md dark:text-white hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-700  ${currentView === "Rates"
            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
            : ""
            }`}
          onClick={() => {
            onMenuClick("Completed Transfers")
            setSidebarOpen(false)
          }}
        >
          <DollarSign className="h-4 w-4" />
         Completed Transfers 
        </Button>
        {/* Date-Based Pricing */}
        <Button
          variant={currentView === "Date-Based Pricing" ? "secondary" : "ghost"}
          className={`w-full justify-start gap-3 h-11 text-white text-md dark:text-white hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-700 ${currentView === "Date-Based Pricing"
            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
            : ""
            }`}
          onClick={() => {
            onMenuClick("Date-Based Pricing")
            setSidebarOpen(false)
          }}
        >
          <Calendar className="h-4 w-4" />
          Date-Based Pricing
        </Button>

        {/* Notifications */}
        <Button
          variant={currentView === "Notifications" ? "secondary" : "ghost"}
          className={`w-full justify-start gap-3 h-11 text-white text-md dark:text-white hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-700 ${currentView === "Notifications"
            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
            : ""
            }`}
          onClick={() => {
            onMenuClick("Notifications")
            setSidebarOpen(false)
          }}
        >
          <Bell className="h-4 w-4" />
          Notifications
        </Button>

        {/* Night Time Pricing */}
        <Button
          variant={currentView === "Night Time Pricing" ? "secondary" : "ghost"}
          className={`w-full justify-start gap-3 h-11 text-white text-md dark:text-blue-400 hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-700 ${currentView === "Night Time Pricing"
            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
            : ""
            }`}
          onClick={() => {
            onMenuClick("Night Time Pricing")
            setSidebarOpen(false)
          }}
        >
          <Moon className="h-4 w-4" />
          Night Time Pricing
        </Button>
        {/* Weekend Prices */}
        <Button
          variant={currentView === "Weekend Prices" ? "secondary" : "ghost"}
          className={`w-full justify-start gap-3 h-11 text-white text-md dark:text-white hover:bg-gray-100 hover:text-blue-600 dark:hover:bg-gray-700 ${currentView === "Weekend Prices"
              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
              : ""
            }`}
          onClick={() => {
            onMenuClick("Weekend Prices")
            setSidebarOpen(false)
          }}
        >
          <DollarSign className="h-4 w-4" />
          Weekend Prices
        </Button>

      </nav>
    </div>
  )
}
