"use client"

import Image from "next/image"
import { useState, useEffect, useMemo } from "react"
import * as XLSX from "xlsx"
import { saveAs } from "file-saver"
import toast from "react-hot-toast"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight, Eye, List, Pencil } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
// gg
type Booking = {
    id: string
    first_name: string
    last_name: string
    email: string
    phone_number: string
    from_location: string
    to_location: string
    return_from_location?: string
    return_to_location?: string
    date_time?: string
    return_date_time?: string
    price?: number
    adults?: number
    children?: number
    flight_number?: string
    airline?: string
    status?: string
    special_requests?: string
    accommodation_address?: string
    accommodation_website?: string
    created_at?: string
}

const formatDateTimeDDMMYYYY = (dateString: string): string => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()

    return `${day}/${month}/${year} `
}
const formatDateDDMMYYYY = (dateString: string): string => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

export default function FindBookings() {
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
    const [editMode, setEditMode] = useState(false)
    const [editBooking, setEditBooking] = useState<Booking | null>(null)
    const [manageableBooking, setManageableBooking] = useState<Booking | null>(null)
    // filters
    const [searchTerm, setSearchTerm] = useState("")
    const [dateFrom, setDateFrom] = useState<Date | null>(null)
    const [dateTo, setDateTo] = useState<Date | null>(null)
    const [statusFilter, setStatusFilter] = useState("")

    // pagination
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 8

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch("https://devsquare-apis.vercel.app/api/transfers")
                const data = await res.json()
                if (data.success) setBookings(data.bookings)
                else setError("Failed to load bookings")
            } catch (err) {
                console.error("Error fetching bookings:", err)
                setError("Could not connect to server")
            } finally {
                setLoading(false)
            }
        }
        fetchBookings()
    }, [])

    // filtering
    const filteredBookings = useMemo(() => {

        return bookings.filter((b) => {
            console.log("Booking:", bookings);
            console.log("Booking created_at:", b.created_at);
            const fullName = `${b.first_name || ""} ${b.last_name || ""}`.toLowerCase()
            const matchesSearch =
                !searchTerm ||
                b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fullName.includes(searchTerm.toLowerCase())

            const bookingDate = b.created_at ? new Date(b.created_at) : null
            const matchesDate =
                (!dateFrom || (bookingDate && bookingDate >= dateFrom)) &&
                (!dateTo || (bookingDate && bookingDate <= dateTo))

            const status = (b.status || "").toLowerCase()
            const matchesStatus = !statusFilter || status === statusFilter.toLowerCase()

            return matchesSearch && matchesDate && matchesStatus
        })
    }, [bookings, searchTerm, dateFrom, dateTo, statusFilter])

    // pagination slice
    const totalPages = Math.ceil(filteredBookings.length / rowsPerPage) || 1
    const paginatedBookings = filteredBookings.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

    // export Excel
    const downloadExcel = () => {
        if (!filteredBookings.length) {
            toast.error("No bookings found for selected filters")
            return
        }
        const dataToExport = filteredBookings.map((b) => ({
            "Booking ID": b.id,
            "First Name": b.first_name,
            "Last Name": b.last_name,
            Email: b.email,
            Phone: b.phone_number,
            Pickup: b.from_location,
            Dropoff: b.to_location,
            "Return Pickup": b.return_from_location || "",
            "Return Dropoff": b.return_to_location || "",
            "Pickup Date": b.date_time ? formatDateTimeDDMMYYYY(b.date_time) : "",
            "Return Date": b.return_date_time ? formatDateTimeDDMMYYYY(b.return_date_time) : "",
            Price: b.price ? `€ ${b.price}` : "",
            Adults: b.adults || "",
            Children: b.children || "",
            "Flight Number": b.flight_number || "",
            Airline: b.airline || "",
            Status: b.status || "Pending",
            "Special Requests": b.special_requests || "",
            "Accommodation Address": b.accommodation_address || "",
            "Accommodation Website": b.accommodation_website || "",
        }))

        const worksheet = XLSX.utils.json_to_sheet(dataToExport)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings")

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" })
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" })
        saveAs(blob, `bookings_${formatDateDDMMYYYY(new Date().toISOString())}.xlsx`)
    }

    // status colors
    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case "approved":
                return "bg-green-100 text-green-800"
            case "declined":
            case "rejected":
                return "bg-red-100 text-red-800"
            default:
                return "bg-yellow-100 text-yellow-800"
        }
    }

    // update booking status
    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`https://devsquare-apis.vercel.app/api/transfers`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            })

            const data = await res.json()
            if (!res.ok || !data.success) throw new Error(data.message || "Failed to update status")

            setBookings((prev) =>
                prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
            )

            toast.success(`Booking status updated to "${newStatus}"`)
        } catch (err: any) {
            console.error("Error updating booking status:", err)
            toast.error(err.message || "Failed to update status")
        }
    }

    // update booking fields except ID
    const handleEditBookingChange = (field: keyof Booking, value: string | number | undefined) => {
        if (!editBooking) return;

        // For date-time fields, handle the local time correctly
        if (field === "date_time" || field === "return_date_time") {
            const date = new Date(value as string);

            // Ensure that the date is correctly formatted in local time
            const formattedDate = date.toLocaleString("sv-SE").slice(0, 16); // Convert to "YYYY-MM-DDTHH:MM" format
            setEditBooking({ ...editBooking, [field]: formattedDate });
        } else {
            // For other fields (non-date), directly update the value
            setEditBooking({ ...editBooking, [field]: value });
        }
    };

    const handleDeleteBooking = async (id: string) => {
        try {
            // Call the DELETE API to remove the booking
            const res = await fetch(`https://devsquare-apis.vercel.app/api/transfers?${new URLSearchParams({ id })}`, {
                method: "DELETE",
            });

            const data = await res.json();

            // Handle the response from the API
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Failed to delete booking");
            }

            // Update the state to remove the deleted booking from the list
            setBookings((prev) => prev.filter((b) => b.id !== id));

            // Show a success message
            toast.success("Booking deleted successfully!"); // Ensure this line is reached
        } catch (err: unknown) {
            // Type assertion or type guard to check if `err` is an instance of Error
            if (err instanceof Error) {
                console.error("Error deleting booking:", err);
                toast.error(err.message || "Failed to delete booking");
            } else {
                // Handle case where `err` is not an instance of Error (e.g., network error, etc.)
                console.error("Unexpected error:", err);
                toast.error("An unexpected error occurred.");
            }
        }
    };




    const convertToLocalDateTime = (dateTime: string | undefined): string => {
        if (!dateTime) return "";
        const date = new Date(dateTime);
        return date.toLocaleString("sv-SE").slice(0, 16); // Return only "YYYY-MM-DDTHH:MM"
    };

    // Save edited booking
    const [isUpdating, setIsUpdating] = useState(false);  // State to track the update process

    // Handle the update action
    const handleUpdateBooking = async () => {
        if (!editBooking) return;
        setIsUpdating(true); // Start loading

        try {
            // Simulate API request for updating booking
            const res = await fetch(`https://devsquare-apis.vercel.app/api/transfers`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editBooking),
            });

            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message || "Failed to update booking");

            setBookings((prev) =>
                prev.map((b) => (b.id === editBooking.id ? { ...editBooking } : b))
            );
            toast.success("Booking updated!");
            setEditMode(false);
            setSelectedBooking(editBooking);
        } catch (err: any) {
            toast.error(err.message || "Failed to update booking");
        } finally {
            setIsUpdating(false); // End loading
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* FILTERS */}
            <div className="flex gap-3 items-center bg-white p-4 shadow-sm rounded-lg mb-6 flex-wrap sm:flex-nowrap">
                <input
                    type="text"
                    placeholder="Search Booking ID or Name"
                    className="border p-2 rounded w-full sm:w-60"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPage(1)
                    }}
                />

                <DatePicker
                    selected={dateFrom}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setDateFrom(date)
                        setCurrentPage(1)
                    }}
                    placeholderText="dd/mm/yyyy"
                    className="border p-2 rounded w-full sm:w-44"
                />

                <span className="text-gray-400">to</span>

                <DatePicker
                    selected={dateTo}
                    onChange={(date) => {
                        setDateTo(date)
                        setCurrentPage(1)
                    }}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/yyyy"
                    className="border p-2 rounded w-full sm:w-44"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value)
                        setCurrentPage(1)
                    }}
                    className="border p-2 rounded w-full sm:w-44"
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="declined">Declined</option>
                    <option value="deposit paid">Deposit Paid</option>
                    <option value="fully paid">Fully Paid</option>
                    <option value="completed transfers">Completed Transfers</option>
                </select>

                <button
                    onClick={downloadExcel}
                    className="border px-3 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                    Export
                </button>
            </div>

            {/* BOOKINGS TABLE */}
            <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                Booking ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                Pickup
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                Dropoff
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                Date & Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="text-center py-6">
                                    <Image
                                        src="/spinner-loading-dots.svg"
                                        alt="Loading..."
                                        width={24}
                                        height={24}
                                        className="animate-spin mx-auto"
                                    />
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={7} className="text-center text-red-600 py-6">
                                    {error}
                                </td>
                            </tr>
                        ) : paginatedBookings.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-10">
                                    No bookings found.
                                </td>
                            </tr>
                        ) : (
                            paginatedBookings.map((b) => (
                                <tr key={b.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm">{b.id}</td>
                                    <td className="px-6 py-4 text-sm">
                                        {b.first_name} {b.last_name}
                                    </td>
                                    <td className="px-6 py-4 text-sm">{b.from_location}</td>
                                    <td className="px-6 py-4 text-sm">{b.to_location}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <select
                                            value={b.status || "pending"}
                                            onChange={(e) => handleStatusChange(b.id, e.target.value)}
                                            className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(
                                                b.status || "pending"
                                            )}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="declined">Declined</option>
                                            <option value="deposit paid">Deposit Paid</option>
                                            <option value="fully paid">Fully Paid</option>
                                            <option value="completed transfers">Completed Transfers</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        {b.created_at ? formatDateTimeDDMMYYYY(b.created_at) : ""}
                                    </td>

                                    <td className="px-6 py-4 text-sm flex gap-4 mt-4 items-center">
                                        {/* View Details */}
                                        <button
                                            onClick={() => setSelectedBooking(b)}
                                            className="text-blue-600 hover:underline flex items-center gap-1"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4 text-gray-500 hover:text-blue-600" />
                                        </button>

                                        {/* Update Booking */}
                                        <button
                                            onClick={() => {
                                                setEditBooking(b)
                                                setEditMode(true)
                                            }}
                                            className="text-gray-600 hover:text-blue-600 flex items-center gap-1"
                                            title="Update Booking"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>

                                        {/* Manageable Data Button */}
                                        <button
                                            onClick={() => setManageableBooking(b)}
                                            className="text-gray-600 hover:text-green-600 flex items-center gap-1"
                                            title="Manageable Data"
                                        >
                                            <List className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteBooking(b.id)}
                                            className="text-red-600 hover:text-red-800 flex items-center gap-1"
                                            title="Delete Booking"
                                        >
                                            <span className="w-4 h-4">🗑️</span>
                                        </button>
                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION CONTROLS */}
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

            {/* VIEW MODAL */}
            {selectedBooking && !editMode && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 px-4">
                    <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-xl font-bold">Booking Details</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSelectedBooking(null)}
                                    className="text-gray-600 text-2xl leading-none hover:text-black"
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                        <div className="overflow-y-auto p-4 sm:p-6 text-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                                {Object.entries({
                                    "Booking ID": selectedBooking.id,
                                    "Passenger Name": `${selectedBooking.first_name} ${selectedBooking.last_name}`,
                                    Email: selectedBooking.email || "N/A",
                                    Phone: selectedBooking.phone_number || "N/A",
                                    Pickup: selectedBooking.from_location || "N/A",
                                    Dropoff: selectedBooking.to_location || "N/A",
                                    "Return Pickup": selectedBooking.return_from_location || "N/A",
                                    "Return Dropoff": selectedBooking.return_to_location || "N/A",
                                    "Pickup Date": selectedBooking.date_time
                                        ? new Date(selectedBooking.date_time).toLocaleDateString("en-GB")
                                        : "N/A",
                                    "Pickup Time": selectedBooking.date_time
                                        ? new Date(selectedBooking.date_time).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
                                        : "N/A",
                                    "Return Date": selectedBooking.return_date_time
                                        ? new Date(selectedBooking.return_date_time).toLocaleDateString("en-GB")
                                        : "N/A",
                                    "Return Time": selectedBooking.return_date_time
                                        ? new Date(selectedBooking.return_date_time).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
                                        : "N/A",
                                    Price: `€ ${selectedBooking.price}`,
                                    Adults: selectedBooking.adults || 0,
                                    Children: selectedBooking.children || 0,
                                    Status: selectedBooking.status || "Pending",
                                    "Flight Number": selectedBooking.flight_number || "N/A",
                                    Airline: selectedBooking.airline || "N/A",
                                    "Special Requests": selectedBooking.special_requests || "N/A",
                                    "Accommodation Address": selectedBooking.accommodation_address || "N/A",
                                    "Accommodation Website": selectedBooking.accommodation_website || "N/A",
                                }).map(([label, value], i) => (
                                    <div key={i} className="grid grid-cols-2 gap-2">
                                        <strong>{label}:</strong>
                                        <span className="break-words">{value || "N/A"}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {editMode && editBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 px-4">
                    <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-xl font-bold">Edit Booking</h2>
                            <button
                                onClick={() => setEditMode(false)}
                                className="text-gray-600 text-2xl leading-none hover:text-black"
                            >
                                &times;
                            </button>
                        </div>
                        <form
                            onSubmit={e => {
                                e.preventDefault()
                                handleUpdateBooking()
                            }}
                            className="overflow-y-auto p-4 sm:p-6 text-sm"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Booking ID:</strong>
                                    <span>{editBooking.id}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Passenger Name:</strong>
                                    <input
                                        type="text"
                                        value={editBooking.first_name + " " + editBooking.last_name}
                                        onChange={(e) => {
                                            const [first_name, last_name] = e.target.value.split(" ");
                                            handleEditBookingChange("first_name", first_name);
                                            handleEditBookingChange("last_name", last_name || "");  // Default to empty if last name is not present
                                        }}
                                        className="border px-2 py-1 rounded bg-gray-100 w-full"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Email:</strong>
                                    <input
                                        type="email"
                                        value={editBooking.email || ""}
                                        onChange={e => handleEditBookingChange("email", e.target.value)}
                                        className="border px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Phone:</strong>
                                    <input
                                        type="text"
                                        value={editBooking.phone_number || ""}
                                        onChange={e => handleEditBookingChange("phone_number", e.target.value)}
                                        className="border px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Pickup:</strong>
                                    <input
                                        type="text"
                                        value={editBooking.from_location || ""}
                                        onChange={e => handleEditBookingChange("from_location", e.target.value)}
                                        className="border px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Dropoff:</strong>
                                    <input
                                        type="text"
                                        value={editBooking.to_location || ""}
                                        onChange={e => handleEditBookingChange("to_location", e.target.value)}
                                        className="border px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Return Pickup:</strong>
                                    <input
                                        type="text"
                                        value={editBooking.return_from_location || ""}
                                        onChange={e => handleEditBookingChange("return_from_location", e.target.value)}
                                        className="border px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Return Dropoff:</strong>
                                    <input
                                        type="text"
                                        value={editBooking.return_to_location || ""}
                                        onChange={e => handleEditBookingChange("return_to_location", e.target.value)}
                                        className="border px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Pickup Date:</strong>
                                    <input
                                        type="datetime-local"
                                        value={convertToLocalDateTime(editBooking?.date_time)}  // Convert the date to local format
                                        onChange={e => handleEditBookingChange("date_time", e.target.value)}
                                        className="border px-2 py-1 rounded"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Return Date:</strong>
                                    <input
                                        type="datetime-local"
                                        value={convertToLocalDateTime(editBooking?.return_date_time)}  // Convert the date to local format
                                        onChange={e => handleEditBookingChange("return_date_time", e.target.value)}
                                        className="border px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Price:</strong>
                                    <div className="flex items-center border px-2 py-1 rounded">
                                        <span className="text-gray-700">€</span>
                                        <input
                                            type="number"
                                            value={editBooking.price ?? ""}
                                            onChange={e => handleEditBookingChange("price", Number(e.target.value))}
                                            className="ml-1 w-full border-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Adults:</strong>
                                    <input
                                        type="number"
                                        value={editBooking.adults || 0}
                                        onChange={e => handleEditBookingChange("adults", Number(e.target.value))}
                                        className="border px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Children:</strong>
                                    <input
                                        type="number"
                                        value={editBooking.children || 0}
                                        onChange={e => handleEditBookingChange("children", Number(e.target.value))}
                                        className="border px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Status:</strong>
                                    <select
                                        value={editBooking.status || "pending"}
                                        onChange={e => handleEditBookingChange("status", e.target.value)}
                                        className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(editBooking.status || "pending")}`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="declined">Declined</option>
                                        <option value="deposit paid">Deposit Paid</option>
                                        <option value="fully paid">Fully Paid</option>
                                        <option value="completed transfers">Completed Transfers</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Flight Number:</strong>
                                    <input
                                        type="text"
                                        value={editBooking.flight_number || "N/A"}
                                        onChange={e => handleEditBookingChange("flight_number", e.target.value)}
                                        className="border px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Airline:</strong>
                                    <input
                                        type="text"
                                        value={editBooking.airline || "N/A"}
                                        onChange={e => handleEditBookingChange("airline", e.target.value)}
                                        className="border px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Special Requests:</strong>
                                    <input
                                        type="text"
                                        value={editBooking.special_requests || "N/A"}
                                        onChange={e => handleEditBookingChange("special_requests", e.target.value)}
                                        className="border px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Accommodation Address:</strong>
                                    <input
                                        type="text"
                                        value={editBooking.accommodation_address || "N/A"}
                                        onChange={e => handleEditBookingChange("accommodation_address", e.target.value)}
                                        className="border px-2 py-1 rounded"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <strong>Accommodation Website:</strong>
                                    <input
                                        type="text"
                                        value={editBooking.accommodation_website || "N/A"}
                                        onChange={e => handleEditBookingChange("accommodation_website", e.target.value)}
                                        className="border px-2 py-1 rounded"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-6 gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setEditMode(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-blue-600 text-white hover:bg-blue-700"
                                    disabled={isUpdating}  // Disable button when updating
                                >
                                    {isUpdating ? (
                                        <div className="w-4 h-4 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"></div>  // Loader
                                    ) : (
                                        "Update"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {manageableBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 px-4">
                    <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b bg-gray-100">
                            <h2 className="text-xl font-bold">Booking Details</h2>
                            <button
                                onClick={() => setManageableBooking(null)}
                                className="text-gray-600 text-2xl leading-none hover:text-black"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Table */}
                        <div className="overflow-y-auto p-6">
                            <div className="grid grid-cols-2 border border-gray-300 text-sm">
                                {/* Headers */}
                                <div className="bg-blue-700 font-semibold text-white p-2 border-b border-gray-300">
                                    Arrival
                                </div>
                                <div className="bg-blue-700 font-semibold text-white p-2 border-b border-gray-300">
                                    Departure
                                </div>

                                {/* Row 1 */}
                                <div className="p-2 border-b border-r border-gray-300">
                                    <strong>Lieu of arrival:</strong> {manageableBooking.from_location}
                                </div>
                                <div className="p-2 border-b border-gray-300">
                                    <strong>Departure airport:</strong>{" "}
                                    {manageableBooking.return_to_location || "—"}
                                </div>

                                {/* Row 2 */}
                                <div className="p-2 border-b border-r border-gray-300">
                                    <strong>Date of Flight:</strong>{" "}
                                    {manageableBooking.date_time
                                        ? new Date(manageableBooking.date_time).toLocaleDateString("en-GB", {
                                            weekday: "long",
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "2-digit",
                                        })
                                        : "—"}
                                </div>
                                <div className="p-2 border-b border-gray-300">
                                    <strong>Date of Departure:</strong>{" "}
                                    {manageableBooking.return_date_time
                                        ? new Date(manageableBooking.return_date_time).toLocaleDateString(
                                            "en-GB",
                                            {
                                                weekday: "long",
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "2-digit",
                                            }
                                        )
                                        : "—"}
                                </div>

                                {/* Row 3 */}
                                <div className="p-2 border-b border-r border-gray-300">
                                    <strong>Time of Flight Arrival:</strong>{" "}
                                    {manageableBooking.date_time
                                        ? new Date(manageableBooking.date_time).toLocaleDateString("en-GB", {
                                            weekday: "long",
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "2-digit",
                                        })
                                        : "—"}
                                </div>
                                <div className="p-2 border-b border-gray-300">
                                    <strong>Time of Flight Departure:</strong>{" "}
                                    {manageableBooking.return_date_time
                                        ? new Date(manageableBooking.return_date_time).toLocaleTimeString(
                                            "en-GB",
                                            { hour: "2-digit", minute: "2-digit" }
                                        )
                                        : "—"}
                                </div>

                                {/* Row 4 */}
                                <div className="p-2 border-b border-r border-gray-300">
                                    <strong>Number of Persons:</strong>{" "}
                                    {Number(manageableBooking.adults) +
                                        Number(manageableBooking.children)}
                                </div>
                                <div className="p-2 border-b border-gray-300">
                                    <strong>Number of Persons:</strong>{" "}
                                    {Number(manageableBooking.adults) +
                                        Number(manageableBooking.children)}
                                </div>

                                {/* Row 5 */}
                                <div className="p-2 border-b border-r border-gray-300">
                                    <strong>Resort Destination:</strong>{" "}
                                    {manageableBooking.to_location}
                                </div>
                                <div className="p-2 border-b border-gray-300">
                                    <strong>Resort of Departure:</strong>{" "}
                                    {manageableBooking.return_from_location || "As arrival"}
                                </div>

                                {/* Row 6 */}
                                <div className="p-2 border-b border-r border-gray-300">
                                    <strong>Airline/Flight Number:</strong>{" "}
                                    {manageableBooking.airline || "-"} / {manageableBooking.flight_number || "-"}
                                </div>

                                <div className="p-2 border-b border-gray-300">
                                    <strong>Contact number:</strong> {manageableBooking.phone_number}
                                </div>

                                {/* Row 7 */}
                                <div className="p-2 border-r border-gray-300">
                                    <strong>Special requirements:</strong>{" "}
                                    {manageableBooking.special_requests || "—"}
                                </div>
                                <div className="p-2">
                                    <strong>Accommodation:</strong>{" "}
                                    {manageableBooking.accommodation_address || "—"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </div>
    )
}