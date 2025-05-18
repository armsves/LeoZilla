'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const aleoLogo = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjE2IiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjE2IDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNzMuNDI2IDBWOC45MzgyNEg4MS42ODQyVjc4Ljg5NjFIOTAuNjA0NVYwSDczLjQyNloiIGZpbGw9IiNGNUY1RjUiLz4KPHBhdGggZD0iTTE1NC4xNDUgNTEuNDIxNkMxNTQuMTQ1IDMyLjU1MTggMTQzLjY4MyAyMS4yOTcgMTI3LjYwNCAyMS4yOTdDMTExLjUyNiAyMS4yOTcgMTAwLjk1NCAzMi4wMDA3IDEwMC45NTQgNTAuODY4N0MxMDAuOTU0IDY5LjczNjcgMTExLjQxNSA4MCAxMjcuNjA0IDgwQzE0MC4zNzggODAgMTQ5Ljk2IDcyLjYwNjEgMTUyLjYwMyA2Mi4zNDQ3SDE0Mi42OTJDMTQwLjQ4OCA2Ny4wOTAyIDEzNS45NzUgNzEuMjgyOSAxMjcuNjA0IDcxLjI4MjlDMTE2LjgxMiA3MS4yODI5IDExMS4zMDcgNjQuNDQxOSAxMTAuMjA1IDU0LjYyMDlIMTU0LjE0NVY1MS40MjE2Wk0xMTAuMzE2IDQ2LjEyNUMxMTEuNjM2IDM2LjYzNTcgMTE3LjM2NCAyOS45MDM1IDEyNy42MDQgMjkuOTAzNUMxMzcuODQ1IDI5LjkwMzUgMTQzLjI0MiAzNi41MjUxIDE0NC41NjQgNDYuMTI1SDExMC4zMTZaIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xODkuMjcyIDIxLjI5N0MxNzMuMDgzIDIxLjI5NyAxNjIuNjIyIDMyLjAwMDcgMTYyLjYyMiA1MC44Njg3QzE2Mi42MjIgNjkuNzM2NyAxNzMuMDgzIDgwIDE4OS4yNzIgODBDMjA1LjQ2MSA4MCAyMTUuODEyIDcwLjA2ODQgMjE1LjgxMiA1MC44Njg3QzIxNS44MTIgMzEuNjY5IDIwNS4zNTEgMjEuMjk3IDE4OS4yNzIgMjEuMjk3Wk0xODkuMjcyIDcxLjUwNDFDMTc3LjcwOSA3MS41MDQxIDE3MS40MzIgNjIuNDU1MyAxNzEuNDMyIDUwLjc2QzE3MS40MzIgMzkuMDY0NyAxNzcuNzA5IDI5LjY4NDIgMTg5LjI3MiAyOS42ODQyQzIwMC44MzYgMjkuNjg0MiAyMDcuMDAzIDM4Ljg0M6gMjA3LjAwMyA1MC43NkMyMDcuMDAzIDYyLjY3NjQgMjAwLjk0NiA3MS41MDQxIDE4OS4yNzIgNzEuNTA0MVoiIGZpbGw9IiNGNUY1RjUiLz4KPHBhdGggZD0iTTQ2LjU1NjUgMEgyOC4zODQ5TDEyLjYxMzQgNDYuMTI1SDIyLjIxNzlMMzQuOTkzMyA4LjQ5NTkzSDM5LjYxODlMNTIuMzkyNSA0Ni4xMjVIMjIuMjE3OUwxOS4yNDU3IDU0LjYyMDlINTUuMjU2MUw2My41MTQzIDc4Ljg5NjFINzMuNDI2TDQ2LjU1NjUgMFoiIGZpbGw9IiNGNUY1RjUiLz4KPHBhdGggZD0iTTEuNDA1MDggNzguODk2MUgxMC45ODU3TDE5LjI0NTcgNTQuNjIwOUw5LjcwNzQgNTQuNjIwOUwxLjQwNTA4IDc4Ljg5NjFaIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0zLjA5MzUgNDYuMTI1TDAuMTg3NSA1NC42MjA5SDkuNzA3NEwxMi42MTM0IDQ2LjEyNUgzLjA5MzVaIiBmaWxsPSIjRjVGNUY1Ii8+Cjwvc3ZnPgo=";

export function Logo() {
  return (
    <Link href="/" className="block">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center space-x-2"
      >
        <div className="relative w-14 h-14 bg-black rounded-lg">
          <Image src="/logo.jpeg" alt="LeoZilla Logo" fill className="object-contain rounded-lg" />
        </div>
        <span className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          LeoZilla
        </span>
      </motion.div>
    </Link>
  );
} 