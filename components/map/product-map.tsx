"use client"

import { useEffect, useRef } from "react"

interface ProductMapProps {
  latitude: number
  longitude: number
  title: string
}

export default function ProductMap({ latitude, longitude, title }: ProductMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    // Dynamically load Leaflet
    if (!containerRef.current) return

    const loadMap = async () => {
      const L = await import("leaflet")
      require("leaflet/dist/leaflet.css")

      // Create map instance
      if (mapRef.current) {
        mapRef.current.remove()
      }

      mapRef.current = L.map(containerRef.current).setView([latitude, longitude], 13)

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(mapRef.current)

      // Add marker
      L.marker([latitude, longitude]).bindPopup(title).addTo(mapRef.current).openPopup()
    }

    loadMap()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [latitude, longitude, title])

  return <div ref={containerRef} className="w-full h-96 rounded-lg border border-border" />
}
