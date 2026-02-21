import { useEffect, useRef, useState } from "react"
import { Terminal as XTerm } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"
import "@xterm/xterm/css/xterm.css"

interface TerminalProps {
    onData?: (data: string) => void
    data?: string
}

export function Terminal({ onData, data }: TerminalProps) {
    const terminalRef = useRef<HTMLDivElement>(null)
    const xtermRef = useRef<XTerm | null>(null)
    const fitAddonRef = useRef<FitAddon | null>(null)

    useEffect(() => {
        if (!terminalRef.current) return

        const xterm = new XTerm({
            cursorBlink: true,
            fontSize: 14,
            fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            theme: {
                background: "#00000000", // Transparent to use parent background
                foreground: "#ffffff",
                cursor: "#10b981",
                selectionBackground: "#10b98133",
            },
            allowProposedApi: true,
        })

        const fitAddon = new FitAddon()
        xterm.loadAddon(fitAddon)
        xterm.open(terminalRef.current)
        fitAddon.fit()

        xterm.onData((input) => {
            onData?.(input)
        })

        xtermRef.current = xterm
        fitAddonRef.current = fitAddon

        const handleResize = () => {
            fitAddon.fit()
        }
        window.addEventListener("resize", handleResize)

        // Initial greeting
        xterm.writeln("\x1b[1;32m$ Welcome to Shellio v1.0.0-beta\x1b[0m")
        // xterm.writeln("Connecting to backend...")

        return () => {
            window.removeEventListener("resize", handleResize)
            xterm.dispose()
        }
    }, [])

    // Write incoming data to xterm
    useEffect(() => {
        if (xtermRef.current && data) {
            xtermRef.current.write(data)
        }
    }, [data])

    return (
        <div>
            <div ref={terminalRef} className="flex-1 overflow-hidden p-2 rounded-lg bg-black/90" />
        </div>
    )
}
