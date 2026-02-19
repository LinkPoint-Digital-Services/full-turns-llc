"use client";

import React from "react";
import {
  Database,
  Download,
  Calendar,
  Package,
  FileSpreadsheet,
} from "lucide-react";

export default function BackupPage() {
  return (
    <main className="mt-5 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Data Backup &amp; Export
        </h1>
      </div>

      {/* Export All Orders Data Card */}
      <div className="rounded-xl border-2 border-primary bg-primary/10 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/20 flex items-center justify-center">
            <Database className="w-5 h-5 text-primary" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-gray-900">
              Export All Orders Data
            </h2>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              Download a complete backup of all property manager orders. This
              includes order details, status, pricing, and timestamps.
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                Last Export: Never
              </span>
              <span className="flex items-center gap-1.5">
                <Package className="w-4 h-4 text-primary" />
                Total Orders: 0
              </span>
            </div>

            {/* Export Button */}
            <button
              id="export-data-btn"
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-colors duration-200 active:scale-[0.98]"
            >
              <Download className="w-4 h-4" />
              Export Data Now
            </button>
          </div>
        </div>
      </div>

      {/* Automated Monthly Backup Section */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">
          Automated Monthly Backup
        </h2>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          The system is configured to automatically export all order data at the
          end of each month. Backup files are saved in Excel format and include:
        </p>

        <ul className="mt-4 space-y-2">
          {[
            "All property manager orders",
            "Order status and tracking information",
            "Service details and pricing",
            "Timestamps for all transactions",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-gray-600"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Backup File Format Info Box */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <FileSpreadsheet className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Backup File Format
            </h3>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              Files are exported in Excel format (.xlsx) with the naming
              convention:
            </p>
            <div className="mt-2 inline-flex items-center px-3 py-1.5 rounded-md bg-white border border-gray-200 shadow-sm">
              <code className="text-sm text-gray-700 font-mono tracking-wide">
                construction_data_YYYY-MM-DD.xlsx
              </code>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
