"use client"

import { useEffect, useRef, useState } from "react"

interface LocationPickerProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const [selectedLocation, setSelectedLocation] = useState<string>("Click on the map to select location")

  useEffect(() => {
    if (!containerRef.current) return

    const loadMap = async () => {
      const L = await import("leaflet")
      require("leaflet/dist/leaflet.css")

      if (mapRef.current) {
        mapRef.current.remove()
      }

      // Default to Tashkent
      mapRef.current = L.map(containerRef.current).setView([41.2995, 69.2401], 13)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(mapRef.current)

      // Add click handler for location selection
      mapRef.current.on("click", async (e: any) => {
        const { lat, lng } = e.latlng

        // Remove previous marker
        if (markerRef.current) {
          mapRef.current.removeLayer(markerRef.current)
        }

        // Add new marker
        markerRef.current = L.marker([lat, lng]).bindPopup("Selected Location").addTo(mapRef.current).openPopup()

        setSelectedLocation(`${lat.toFixed(4)}, ${lng.toFixed(4)}`)
        onLocationSelect(lat, lng, `${lat.toFixed(4)}, ${lng.toFixed(4)}`)
      })
    }

    loadMap()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [onLocationSelect])

  return (
    <div className="space-y-3">
      <div className="bg-secondary border border-border rounded-lg p-3">
        <p className="text-sm text-muted-foreground">Selected: {selectedLocation}</p>
      </div>
      <div ref={containerRef} className="w-full h-80 rounded-lg border border-border" />
      <p className="text-xs text-muted-foreground">Click on the map to select your product location</p>
    </div>
  )
}
