#!/usr/bin/env python3
"""
ResumeCraft - Local Development Server Launcher
Launches a lightweight local server and opens your browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    os.chdir(DIRECTORY)
    port = PORT
    
    # Try preferred port or find next available
    server = None
    for p in range(PORT, PORT + 20):
        try:
            server = socketserver.TCPServer(("", p), Handler)
            port = p
            break
        except OSError:
            continue

    if not server:
        print(f"Error: Could not bind to any port between {PORT} and {PORT + 20}")
        sys.exit(1)

    url = f"http://localhost:{port}/index.html"
    print("=" * 60)
    print("🚀  ResumeCraft Web Application Running!")
    print(f"👉  URL: {url}")
    print(f"📁  Directory: {DIRECTORY}")
    print("=" * 60)
    print("Press Ctrl+C to stop the server.")

    # Automatically open in browser
    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"Could not open browser automatically: {e}")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        server.server_close()

if __name__ == "__main__":
    start_server()
