"use client";

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Input } from "../component/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../component/ui/table";
import { Button } from "../component/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../component/ui/dialog";
import { Eye } from "lucide-react";

export default function CompletedTransfers() {
  const [rows, setRows] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [selectedRow, setSelectedRow] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [displayColumns, setDisplayColumns] = useState<string[]>([]);

  useEffect(() => {
    const loadExcel = async () => {
      const response = await fetch("/booking-data.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const wb = XLSX.read(arrayBuffer, { type: "array" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data: any[] = XLSX.utils.sheet_to_json(ws, { defval: "" });

      const cleaned = data.map((row) => {
        const obj: any = {};
        Object.keys(row).forEach((key) => {
          if (key && !key.startsWith("__EMPTY")) {
            obj[key] = row[key];
          }
        });
        obj.Status = "Completed Transfers"; // ✅ hardcoded
        return obj;
      });

      setRows(cleaned);

      if (cleaned.length > 0) {
        // ✅ Take first 4 headers from Excel + add Status
        const headers = Object.keys(cleaned[0]).slice(0, 4);
        setDisplayColumns([...headers, "Status"]);
      }
    };

    loadExcel();
  }, []);

  // ✅ Search Filter
  const filteredRows = rows.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // ✅ Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <Input
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {displayColumns.map((col) => (
                <TableHead key={col}>{col}</TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRows.length > 0 ? (
              currentRows.map((row, idx) => (
                <TableRow key={idx}>
                  {displayColumns.map((col) => (
                    <TableCell key={col}>
                      {col === "Status" ? (
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          {row[col]}
                        </span>
                      ) : (
                        row[col] || "-"
                      )}
                    </TableCell>
                  ))}
                  {/* Actions */}
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedRow(row);
                        setIsModalOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={displayColumns.length + 1}
                  className="text-center"
                >
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <Button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl p-0 " >
          {selectedRow && (
            <div className="flex flex-col max-h-[90vh] bg-white rounded-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold">Booking Details</h2>
                
              </div>


              {/* Body */}
              <div className="overflow-y-auto p-4 sm:p-6 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  {Object.entries(selectedRow).map(([key, value], i) => (
                    <div key={i} className="grid grid-cols-2 gap-2">
                      <strong>{key}:</strong>
                      <span
                        className={`break-words ${key === "Status" && value === "Completed Transfers"
                          ? "text-green-600 font-semibold"
                          : ""
                          }`}
                      >
                        {value ? String(value) : "N/A"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>


    </div>
  );
}
