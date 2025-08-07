"use client";

import React from "react";

type LogEntry = {
  time: string;
  status: string;
  userAgent: string;
  host: string;
  message: string;
};

const logs: LogEntry[] = [
  {
    time: "8/6/2025 03:01:39.63 PM",
    status: "GET 200",
    userAgent: "(Windows NT 10.0; Win64; x64)",
    host: "216.452.675",
    message: "prisma:query SELECT…",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[#111827] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1f2937] p-4 rounded-lg mb-4">
          <h1 className="text-xl font-semibold text-white">PRESSOC</h1>
        </div>

        <div className="bg-[#1f2937] rounded-lg overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400">
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">User Agent</th>
                <th className="px-4 py-3">Host</th>
                <th className="px-4 py-3">Messages</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-gray-800">
                  <td className="px-4 py-2 italic text-gray-300">{log.time}</td>
                  <td className="px-4 py-2 font-semibold text-green-400">{log.status}</td>
                  <td className="px-4 py-2 text-gray-300">{log.userAgent}</td>
                  <td className="px-4 py-2 text-gray-300">{log.host}</td>
                  <td className="px-4 py-2 italic text-gray-300">{log.message}</td>
                </tr>
              ))}
              {logs.map((log, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-gray-800">
                  <td className="px-4 py-2 italic text-gray-300">{log.time}</td>
                  <td className="px-4 py-2 font-semibold text-green-400">{log.status}</td>
                  <td className="px-4 py-2 text-gray-300">{log.userAgent}</td>
                  <td className="px-4 py-2 text-gray-300">{log.host}</td>
                  <td className="px-4 py-2 italic text-gray-300">{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
