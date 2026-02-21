import { useEffect, useRef, useState, useCallback } from "react"

export function useTerminalSocket(url: string) {
    const [data, setData] = useState<string>("")
    const socketRef = useRef<WebSocket | null>(null)
    const [status, setStatus] = useState<"connecting" | "open" | "closed" | "error">("connecting")

    useEffect(() => {
        const socket = new WebSocket(url)
        socketRef.current = socket

        socket.onopen = () => setStatus("open")
        socket.onclose = () => setStatus("closed")
        socket.onerror = () => setStatus("error")
        socket.onmessage = (event) => {
            setData(event.data)
        }

        return () => {
            socket.close()
        }
    }, [url])

    const send = useCallback((input: string) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(input)
        }
    }, [])

    return { data, send, status }
}
