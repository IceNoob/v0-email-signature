"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon } from "lucide-react"

export default function EmailSignatureGenerator() {
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [email, setEmail] = useState("@bluecarrental.is")
  const [mobile, setMobile] = useState("+354 ")
  const [address, setAddress] = useState("Blue Car Rental – Blikavöllur 3, 235 Keflavíkurflugvöllur")
  const [downloading, setDownloading] = useState(false)

  const signatureRef = useRef<HTMLDivElement>(null)

  // PNG download function - EDIT THESE VALUES TO CONTROL PNG EXPORT
  const downloadAsPNG = async () => {
    if (!signatureRef.current) return

    setDownloading(true)

    try {
      const html2canvas = (await import("html2canvas")).default
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const canvas = await html2canvas(signatureRef.current, {
        backgroundColor: "#ffffff",
        scale: 3, // High resolution for crisp quality
        useCORS: true,
        allowTaint: true,
        logging: false,

        // *** EDIT THESE VALUES TO CONTROL PNG PADDING ***
        x: 0, // LEFT PADDING: 0 = no left padding, -15 = add left padding
        y: -10, // TOP PADDING: negative number adds padding above
        width: signatureRef.current.scrollWidth + 15, // RIGHT PADDING: +15 adds right padding
        height: signatureRef.current.scrollHeight + 20, // BOTTOM PADDING: +20 adds bottom padding

        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector("[data-signature-ref]")
          if (clonedElement) {
            clonedElement.style.fontFamily = "'Host Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

            // *** EDIT THIS TO CONTROL LOGO SPACING IN PNG ***
            const logoContainer = clonedElement.querySelector('div[style*="marginBottom"]')
            if (logoContainer) {
              logoContainer.style.marginBottom = "4px" // CHANGE THIS VALUE: smaller = less space
            }
          }
        },
      })

      // Resize canvas to exactly 490px width while maintaining aspect ratio
      const targetWidth = 490
      const aspectRatio = canvas.height / canvas.width
      const targetHeight = targetWidth * aspectRatio

      // Create a new canvas with the target dimensions
      const resizedCanvas = document.createElement("canvas")
      const ctx = resizedCanvas.getContext("2d")
      resizedCanvas.width = targetWidth
      resizedCanvas.height = targetHeight

      // Draw the high-resolution image onto the smaller canvas
      ctx?.drawImage(canvas, 0, 0, targetWidth, targetHeight)

      const link = document.createElement("a")
      link.download = "email-signature.png"
      link.href = resizedCanvas.toDataURL("image/png")
      link.click()
    } catch (error) {
      console.error("Error generating PNG:", error)
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
            <Button onClick={downloadAsPNG} disabled={downloading} size="lg">
              <ImageIcon className="mr-2 h-4 w-4" />
              {downloading ? "Generating PNG..." : "Download as PNG"}
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
                style={{
                  fontFamily: "'Host Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  width: "490px", // Updated to 490px
                  backgroundColor: "white",
                  padding: "5px",
                }}
              >
                {/* Blue Car Rental Header Image */}
                <div style={{ marginBottom: "-3px" }}>
                  <img
                    src="/images/blue-signature-header.png"
                    alt="Blue Car Rental"
                    style={{
                      width: "100%",
                      maxWidth: "490px", // Updated to 490px
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
                      flex: "1",
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
                      flex: "1",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
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
                        fontSize: "10px",
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
                        fontSize: "10px",
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
            <div className="mt-4 text-sm text-muted-foreground">
              <h3 className="font-medium mb-2">PNG Export Controls:</h3>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>
                  <strong>Final width: 490px</strong> = Exact output size
                </li>
                <li>
                  <strong>scale: 3</strong> = High resolution rendering for crisp quality
                </li>
                <li>
                  <strong>x: 0</strong> = No left padding
                </li>
                <li>
                  <strong>y: -10</strong> = Top padding
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
