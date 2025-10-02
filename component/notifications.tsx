"use client"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Clipboard, Trash2 } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"


export default function NotificationsTab() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5
  const API_URL = "https://devsquare-apis.vercel.app/api/transfers/notifications"

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch(API_URL)
      const data = await res.json()
      if (data.success) {
        setNotifications(data.notifications)

        // ✅ mark as read immediately
        const ids = data.notifications.map((n: any) => n.id)
        if (ids.length > 0) {
          await fetch(API_URL, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids }),
          })
        }
      } else {
        setError("Failed to load notifications")
      }
    } catch (err) {
      console.error("Error fetching notifications:", err)
      setError("Could not connect to server")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  // 📋 Copy email + show toast
  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    setToast(`📋 ${email} copied!`)
    setTimeout(() => setToast(null), 2500)
  }

  // 🗑️ Delete notification
  const deleteNotification = async (id: number) => {
    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [id] }),
      })

      const data = await res.json()
      if (data.success) {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
        setToast("🗑️ Notification deleted")
        setTimeout(() => setToast(null), 2500)
      } else {
        setError("Failed to delete notification")
      }
    } catch (err) {
      console.error("Error deleting notification:", err)
      setError("Could not delete notification")
    }
  }

  const totalPages = Math.ceil(notifications.length / rowsPerPage) || 1
  const paginatedNotifications = notifications.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* ✅ Toast */}
      {toast && (
        <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded shadow text-sm">
          {toast}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Message</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Booking ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Pickup</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Dropoff</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-6">
                  <div className="flex justify-center items-center gap-2">
                    <Image
                      src="/spinner-loading-dots.svg"
                      alt="Loading..."
                      width={24}
                      height={24}
                      className="animate-spin"
                    />
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={8} className="text-center text-red-600 py-6">
                  {error}
                </td>
              </tr>
            ) : notifications.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-10 text-gray-500">
                  No notifications found.
                </td>
              </tr>
            ) : (
              paginatedNotifications.map((n) => (
                <tr key={n.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">{n.title}</td>
                  <td className="px-6 py-4 text-sm">{n.message}</td>
                  <td className="px-6 py-4 text-sm">{n.name}</td>
                  <td className="px-6 py-4 text-sm flex items-center gap-2">
                    {n.email}
                    <Clipboard
                      className="h-4 w-4 text-gray-500 cursor-pointer hover:text-blue-600"
                      onClick={() => copyEmail(n.email)}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm">{n.booking_id}</td>
                  <td className="px-6 py-4 text-sm">{n.from_location}</td>
                  <td className="px-6 py-4 text-sm">{n.to_location}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => deleteNotification(n.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination Controls */}
      <div className="flex items-center justify-end gap-2 p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <span className="px-2 text-sm">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
