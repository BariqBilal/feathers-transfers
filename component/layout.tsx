// "use client"

// import { useState } from "react"
// import Sidebar from "@/components/sidebar"
// import TopNavbar from "@/components/TopNavbar"

// export default function Layout({ children }: { children: React.ReactNode }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   return (
//     <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Sidebar */}
//       <Sidebar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         currentView=""
//         onMenuClick={() => {}}
//       />

//       {/* Main */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <TopNavbar setSidebarOpen={setSidebarOpen}  />

//         <main className="flex-1 overflow-y-auto p-6">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }
