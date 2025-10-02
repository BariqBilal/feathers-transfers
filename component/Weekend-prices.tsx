"use client"
import { useState, useEffect } from "react"

export default function WeekendPricingAdmin() {
  const [saturdayPrice, setSaturdayPrice] = useState("")
  const [sundayPrice, setSundayPrice] = useState("")
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  // ✅ Fetch Saturday & Sunday prices on mount
  useEffect(() => {
    const fetchWeekendPrices = async () => {
      try {
        const res = await fetch(
          "https://devsquare-apis.vercel.app/api/transfers/weekend-price"
        )
        const json = await res.json()

        if (json.success && json.data.length > 0) {
          const saturday = json.data.find((d: any) => d.day === "saturday")
          const sunday = json.data.find((d: any) => d.day === "sunday")
          setSaturdayPrice(saturday?.price || "")
          setSundayPrice(sunday?.price || "")
        }
      } catch (error) {
        console.error("Failed to fetch weekend prices:", error)
        showToast("❌ Failed to load weekend prices")
      }
    }

    fetchWeekendPrices()
  }, [])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  // ✅ Save/Update weekend prices
  const saveWeekend = async () => {
    setLoading(true)
    try {
      const res = await fetch(
        "https://devsquare-apis.vercel.app/api/transfers/weekend-price",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            saturdayPrice,
            sundayPrice,
          }),
        }
      )
      const json = await res.json()

      if (json.success) {
        showToast("✅ Weekend prices updated successfully")
      } else {
        showToast("❌ " + (json.error || "Update failed"))
      }
    } catch (error) {
      console.error("Save error:", error)
      showToast("❌ Server error while saving")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      {toast && (
        <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded shadow text-sm">
          {toast}
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
          Weekend Pricing
        </h3>
        <p className="text-sm text-gray-500">
          Admin can set charges separately for Saturday and Sunday.
        </p>

        {/* Saturday Price */}
        <div className="flex flex-col max-w-xs mx-auto">
          <label className="font-medium text-gray-700 mb-1">Saturday Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              %
            </span>
            <input
              type="number"
              value={saturdayPrice}
              onChange={(e) => setSaturdayPrice(e.target.value)}
              className="border rounded-lg pl-8 pr-3 py-2 w-full text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
        </div>

        {/* Sunday Price */}
        <div className="flex flex-col max-w-xs mx-auto">
          <label className="font-medium text-gray-700 mb-1">Sunday Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              %
            </span>
            <input
              type="number"
              value={sundayPrice}
              onChange={(e) => setSundayPrice(e.target.value)}
              className="border rounded-lg pl-8 pr-3 py-2 w-full text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <button
            onClick={saveWeekend}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}
