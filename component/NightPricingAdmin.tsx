"use client"

import { useEffect, useState } from "react"

export default function NightPricingAdmin() {
  const [charge, setCharge] = useState("")
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  // ✅ fetch surcharge
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://devsquare-apis.vercel.app/api/transfers/midnight-pricing")
        const json = await res.json()
        if (json.success && json.data) {
          setCharge(json.data.charge)
        }
      } catch (err) {
        console.error("Error fetching surcharge:", err)
      }
    }
    fetchData()
  }, [])

  const saveSurcharge = async () => {
    setLoading(true)
    try {
      const res = await fetch("https://devsquare-apis.vercel.app/api/transfers/midnight-pricing", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ charge }),
      })
      const json = await res.json()
      if (json.success) {
        showToast("✅ Night surcharge updated successfully")
      } else {
        showToast("❌ " + (json.error || "Update failed"))
      }
    } catch (err) {
      console.error("Error updating surcharge:", err)
      showToast("❌ Server error")
    } finally {
      setLoading(false)
    }
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      
      {/* ✅ Toast */}
      {toast && (
        <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded shadow text-sm">
          {toast}
        </div>
      )}

      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        {/* Night Window */}
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Night Window</span>
          <span className="px-3 py-1 bg-gray-100 rounded text-sm">
            08:00 PM → 05:00 AM
          </span>
        </div>

        {/* Surcharge input with € sign */}
        <div className="flex justify-between items-center">
          <label className="font-medium text-gray-700">Surcharge</label>
          <div className="relative w-36">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
             %
            </span>
            <input
              type="number"
              inputMode="decimal"
              value={charge}
              onChange={(e) => setCharge(e.target.value)}
              className="border rounded pl-6 pr-2 py-2 w-full text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={saveSurcharge}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  )
}
