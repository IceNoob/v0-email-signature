"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileImage } from "lucide-react"

export default function EmailSignatureGenerator() {
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [email, setEmail] = useState("@bluecarrental.is")
  const [mobile, setMobile] = useState("+354 ")
  const [address, setAddress] = useState("Blue Car Rental – Blikavöllur 3, 235 Keflavíkurflugvöllur")
  const [downloading, setDownloading] = useState(false)

  const signatureRef = useRef<HTMLDivElement>(null)

  const downloadAsJPG = async () => {
    if (!signatureRef.current) return

    setDownloading(true)

    try {
      const html2canvas = (await import("html2canvas")).default
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const canvas = await html2canvas(signatureRef.current, {
        backgroundColor: "#ffffff",
        scale: 8,
        useCORS: true,
        allowTaint: true,
        logging: false,
        pixelRatio: 8,

        x: 0,
        y: 4,
        width: signatureRef.current.scrollWidth,
        height: signatureRef.current.scrollHeight,

        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector("[data-signature-ref]")
          if (clonedElement) {
            clonedElement.style.fontFamily = "'Host Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            ;(clonedElement.style as any).WebkitFontSmoothing = "antialiased"
            ;(clonedElement.style as any).MozOsxFontSmoothing = "grayscale"
            clonedElement.style.textRendering = "optimizeLegibility"
          }
        },
      })

      const finalCanvas = document.createElement("canvas")
      const ctx = finalCanvas.getContext("2d")

      if (ctx) {
        finalCanvas.width = 510
        finalCanvas.height = Math.round((canvas.height / canvas.width) * 510)

        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = "high"

        ctx.drawImage(canvas, 0, 0, finalCanvas.width, finalCanvas.height)
      }

      const link = document.createElement("a")
      link.download = "email-signature.jpg"
      link.href = finalCanvas.toDataURL("image/jpeg", 0.98)
      link.click()
    } catch (error) {
      console.error("Error generating JPG:", error)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Blue Car Rental Email Signature Generator</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Customize Your Signature</CardTitle>
            <CardDescription>Fill in your details to generate a professional email signature</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={downloadAsJPG} disabled={downloading} size="lg">
              <FileImage className="mr-2 h-4 w-4" />
              {downloading ? "Generating JPG..." : "Download as JPG"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>This is how your signature will appear</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border p-4 rounded-md bg-white">
              <div
                ref={signatureRef}
                data-signature-ref="true"
                style={
                  {
                    fontFamily: "'Host Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    width: "510px",
                    backgroundColor: "white",
                    padding: "5px",
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                    textRendering: "optimizeLegibility",
                  } as React.CSSProperties
                }
              >
                {/* Blue Car Rental Header Image */}
                <div style={{ marginBottom: "-3px" }}>
                  <img
                    src="/images/blue-signature-header.png"
                    alt="Blue Car Rental"
                    style={{
                      width: "100%",
                      maxWidth: "510px",
                      height: "auto",
                      display: "block",
                    }}
                  />
                </div>

                {/* Content below the header - two equal height columns */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "stretch",
                    gap: "5px",
                  }}
                >
                  {/* Left Column - Name and Title */}
                  <div
                    style={{
                      flex: "0.45", // Changed from "1" to "0.4"
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#1a365d",
                        lineHeight: "1",
                        fontFamily: "'Host Grotesk', sans-serif",
                      }}
                    >
                      {name}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "#1a365d",
                        lineHeight: "1",
                        fontFamily: "'Host Grotesk', sans-serif",
                      }}
                    >
                      {title}
                    </div>
                  </div>

                  {/* Right Column - Contact Info */}
                  <div
                    style={{
                      flex: "0.55", // Changed from "1" to "0.6"
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px", // Changed from "10px" to "12px"
                        fontWeight: "400",
                        color: "#1a365d",
                        lineHeight: "1.1",
                        fontFamily: "'Host Grotesk', sans-serif",
                      }}
                    >
                      Email: {email}
                    </div>
                    <div
                      style={{
                        fontSize: "11px", // Changed from "10px" to "12px"
                        fontWeight: "400",
                        color: "#1a365d",
                        lineHeight: "1.1",
                        fontFamily: "'Host Grotesk', sans-serif",
                      }}
                    >
                      Mobile: {mobile}
                    </div>
                    <div
                      style={{
                        fontSize: "11px", // Changed from "10px" to "12px"
                        fontWeight: "400",
                        color: "#1a365d",
                        lineHeight: "1.1",
                        fontFamily: "'Host Grotesk', sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
