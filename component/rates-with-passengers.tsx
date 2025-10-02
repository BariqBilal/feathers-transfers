"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import toast from "react-hot-toast"

interface PricingRow {
  id: string
  location: string
  passengers: number
  price: string
}

export default function PricingAdmin() {
  const [rows, setRows] = useState<PricingRow[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch("https://devsquare-apis.vercel.app/api/transfers/pricing", {
        cache: "no-store",
      })
      const data = await res.json()
      if (data.success) {
        const sorted = data.data.sort((a: PricingRow, b: PricingRow) => {
          if (a.location === b.location) return a.passengers - b.passengers
          return a.location.localeCompare(b.location)
        })
        setRows(sorted)
      }
    } catch (err) {
      console.error("Error fetching pricing:", err)
      toast.error("❌ Failed to load pricing data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const saveEdit = async (id: string) => {
    try {
      const res = await fetch("https://devsquare-apis.vercel.app/api/transfers/pricing", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, price: editValue }),
      })

      const result = await res.json()
      if (result.success) {
        setRows((prev) =>
          prev.map((r) => (r.id === id ? { ...r, price: editValue } : r))
        )
        toast.success(`✅ Price updated to €${editValue}`)
      } else {
        toast.error("❌ Could not update the price.")
      }
    } catch (err) {
      console.error("Error updating price:", err)
      toast.error("❌ Something went wrong while updating")
    } finally {
      setEditingId(null)
      setEditValue("")
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
     

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Passengers
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Price (€)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-6">
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
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No pricing data found
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{row.location}</td>
                  <td className="px-6 py-4">{row.passengers}</td>
                  <td className="px-6 py-4">
                    {editingId === row.id ? (
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="border rounded px-2 py-1 w-24"
                        autoFocus
                      />
                    ) : (
                      <span>€ {row.price}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    {editingId === row.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(row.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 bg-gray-300 rounded text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(row.id)
                          setEditValue(row.price)
                        }}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
