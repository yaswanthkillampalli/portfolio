"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        unstyled: true, 
        classNames: {
          // Sleek, minimal pill shape
          toast: "group flex w-fit items-center gap-3.5 rounded-full border border-white/10 bg-[#080810]/90 px-5 py-3.5 shadow-2xl backdrop-blur-xl transition-all",
          // Single line text styling
          title: "text-sm font-medium text-slate-200",
          icon: "shrink-0 flex items-center justify-center",
          content: "flex-1",
        },
      }}
      icons={{
        // Naked icons with color matching
        success: <CircleCheckIcon size={18} className="text-emerald-400" />,
        info: <InfoIcon size={18} className="text-indigo-400" />,
        warning: <TriangleAlertIcon size={18} className="text-amber-400" />,
        error: <OctagonXIcon size={18} className="text-rose-400" />,
        loading: <Loader2Icon size={18} className="text-indigo-400 animate-spin" />,
      }}
      {...props}
    />
  )
}

export { Toaster }