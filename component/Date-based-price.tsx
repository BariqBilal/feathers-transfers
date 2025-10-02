"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import toast from "react-hot-toast"
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "../component/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface DatePriceEntry {
  id: string
  start_date: string
  end_date: string
  price: string
}

// Helper function to format date as YYYY-MM-DD without timezone issues
const formatDateForAPI = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Helper function to format date as DD/MM/YYYY for display
const formatDateForDisplay = (dateString: string): string => {
  if (!dateString) return ""
  // Parse the date string as local date to avoid timezone issues
  const [year, month, day] = dateString.split('-')
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  return date.toLocaleDateString("en-GB")
}

// Helper function to parse date string to Date object without timezone issues
const parseDateString = (dateString: string): Date | null => {
  if (!dateString) return null
  const [year, month, day] = dateString.split('-')
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}

export default function DateBasedPricingTab() {
  const [entries, setEntries] = useState<DatePriceEntry[]>([])
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [price, setPrice] = useState("")

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedEntry, setEditedEntry] = useState<Partial<DatePriceEntry>>({})
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const fetchEntries = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        "https://devsquare-apis.vercel.app/api/transfers/date-based-price"
      )
      setEntries(res.data.data)
    } catch (err) {
      console.error(err)
      toast.error("❌ Failed to load entries")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  const resetForm = () => {
    setStartDate(null)
    setEndDate(null)
    setPrice("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!startDate || !endDate) {
      toast.error("Start and end dates are required")
      return
    }
    setSaving(true)
    try {
      await axios.post(
        "https://devsquare-apis.vercel.app/api/transfers/date-based-price",
        {
          start_date: formatDateForAPI(startDate),
          end_date: formatDateForAPI(endDate),
          price,
        }
      )
      await fetchEntries()
      resetForm()
      toast.success("✅ New date-based pricing saved")
    } catch (err) {
      console.error(err)
      toast.error("❌ Failed to save entry")
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (entry: DatePriceEntry) => {
    setEditingId(entry.id)
    setEditedEntry({ ...entry })
  }

  const handleChange = (field: keyof DatePriceEntry, value: string) => {
    setEditedEntry((prev) => ({ ...prev, [field]: value }))
  }

  const handleDateChange = (field: 'start_date' | 'end_date', date: Date | null) => {
    if (date) {
      setEditedEntry((prev) => ({ 
        ...prev, 
        [field]: formatDateForAPI(date)
      }))
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditedEntry({})
  }

  const saveEdit = async () => {
    if (!editingId) return
    setSaving(true)
    try {
      await axios.patch(
        "https://devsquare-apis.vercel.app/api/transfers/date-based-price",
        {
          id: editingId,
          ...editedEntry,
        }
      )
      await fetchEntries()
      toast.success("✅ Pricing entry updated")
    } catch (err) {
      console.error(err)
      toast.error("❌ Failed to update entry")
    } finally {
      cancelEdit()
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `https://devsquare-apis.vercel.app/api/transfers/date-based-price`,
        { data: { id } }
      )
      await fetchEntries()
      toast.success("🗑️ Entry deleted")
    } catch (err) {
      console.error(err)
      toast.error("❌ Failed to delete entry")
    }
  }

  return (
    <div className="space-y-6">
      {/* Add New Price Card */}
      <Card>
        <CardHeader>
          <CardDescription>
            Set special discounts as percentages for specific date ranges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-end"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price (%)
              </label>
              <input
                type="number"
                step="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded p-2"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={saving}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Entries Card */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <Image
                  src="/spinner-loading-dots.svg"
                  alt="Loading..."
                  width={32}
                  height={32}
                  className="animate-spin"
                />
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Start Date</th>
                    <th className="px-4 py-2 text-left">End Date</th>
                    <th className="px-4 py-2 text-left">Price (%)</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {entries.map((entry) => (
                    <tr key={entry.id}>
                      {editingId === entry.id ? (
                        <>
                          <td className="px-4 py-2">
                            <DatePicker
                              selected={parseDateString(editedEntry.start_date || "")}
                              onChange={(date) => handleDateChange("start_date", date)}
                              dateFormat="dd/MM/yyyy"
                              className="border p-1 rounded"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <DatePicker
                              selected={parseDateString(editedEntry.end_date || "")}
                              onChange={(date) => handleDateChange("end_date", date)}
                              dateFormat="dd/MM/yyyy"
                              className="border p-1 rounded"
                            />
                          </td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              value={editedEntry.price || ""}
                              onChange={(e) =>
                                handleChange("price", e.target.value)
                              }
                              className="border p-1 rounded w-20"
                            />
                            <span className="ml-1">%</span>
                          </td>
                          <td className="px-4 py-2 flex gap-2">
                            <button
                              onClick={saveEdit}
                              disabled={saving}
                              className="px-2 py-1 bg-green-600 text-white rounded text-sm disabled:opacity-50"
                            >
                              {saving ? "Saving..." : "Save"}
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="px-2 py-1 bg-gray-300 rounded text-sm"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-2">
                            {formatDateForDisplay(entry.start_date)}
                          </td>
                          <td className="px-4 py-2">
                            {formatDateForDisplay(entry.end_date)}
                          </td>
                          <td className="px-4 py-2">{entry.price}%</td>
                          <td className="px-4 py-2 flex gap-2">
                            <button
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                              onClick={() => handleEdit(entry)}
                            >
                              Edit
                            </button>
                            <button
                              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
                              onClick={() => setDeleteId(entry.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {entries.length === 0 && !loading && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-4 text-center text-gray-500"
                      >
                        No entries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          {/* Delete Confirmation Modal */}
          <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Delete</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to delete this entry? This action cannot be undone.</p>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteId(null)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    if (deleteId) {
                      await handleDelete(deleteId)
                      setDeleteId(null)
                    }
                  }}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}