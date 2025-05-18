import Link from 'next/link';
import Image from 'next/image';
import { PrismaClient } from '@prisma/client';

async function getAleoProjects() {
  const prisma = new PrismaClient();
  const projects = await prisma.project.findMany({
    where: {
      blockchain: 'aleo'
    },
    include: {
      socialMetrics: true
    }
  });
  await prisma.$disconnect();
  return projects;
}

export default async function Home() {
  const aleoLogo = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjE2IiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjE2IDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNzMuNDI2IDBWOC45MzgyNEg4MS42ODQyVjc4Ljg5NjFIOTAuNjA0NVYwSDczLjQyNloiIGZpbGw9IiNGNUY1RjUiLz4KPHBhdGggZD0iTTE1NC4xNDUgNTEuNDIxNkMxNTQuMTQ1IDMyLjU1MTggMTQzLjY4MyAyMS4yOTcgMTI3LjYwNCAyMS4yOTdDMTExLjUyNiAyMS4yOTcgMTAwLjk1NCAzMi4wMDA3IDEwMC45NTQgNTAuODY4N0MxMDAuOTU0IDY5LjczNjcgMTExLjQxNSA4MCAxMjcuNjA0IDgwQzE0MC4zNzggODAgMTQ5Ljk2IDcyLjYwNjEgMTUyLjYwMyA2Mi4zNDQ3SDE0Mi42OTJDMTQwLjQ4OCA2Ny4wOTAyIDEzNS45NzUgNzEuMjgyOSAxMjcuNjA0IDcxLjI4MjlDMTE2LjgxMiA3MS4yODI5IDExMS4zMDcgNjQuNDQxOSAxMTAuMjA1IDU0LjYyMDlIMTU0LjE0NVY1MS40MjE2Wk0xMTAuMzE2IDQ2LjEyNUMxMTEuNjM2IDM2LjYzNTcgMTE3LjM2NCAyOS45MDM1IDEyNy42MDQgMjkuOTAzNUMxMzcuODQ1IDI5LjkwMzUgMTQzLjI0MiAzNi41MjUxIDE0NC41NjQgNDYuMTI1SDExMC4zMTZaIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xODkuMjcyIDIxLjI5N0MxNzMuMDgzIDIxLjI5NyAxNjIuNjIyIDMyLjAwMDcgMTYyLjYyMiA1MC44Njg3QzE2Mi42MjIgNjkuNzM2NyAxNzMuMDgzIDgwIDE4OS4yNzIgODBDMjA1LjQ2MSA4MCAyMTUuODEyIDcwLjA2ODQgMjE1LjgxMiA1MC44Njg3QzIxNS44MTIgMzEuNjY5IDIwNS4zNTEgMjEuMjk3IDE4OS4yNzIgMjEuMjk3Wk0xODkuMjcyIDcxLjUwNDFDMTc3LjcwOSA3MS41MDQxIDE3MS40MzIgNjIuNDU1MyAxNzEuNDMyIDUwLjc2QzE3MS40MzIgMzkuMDY0NyAxNzcuNzA5IDI5LjY4NDIgMTg5LjI3MiAyOS42ODQyQzIwMC44MzYgMjkuNjg0MiAyMDcuMDAzIDM4Ljg0MzYgMjA3LjAwMyA1MC43NkMyMDcuMDAzIDYyLjY3NjQgMjAwLjk0NiA3MS41MDQxIDE4OS4yNzIgNzEuNTA0MVoiIGZpbGw9IiNGNUY1RjUiLz4KPHBhdGggZD0iTTQ2LjU1NjUgMEgyOC4zODQ5TDEyLjYxMzQgNDYuMTI1SDIyLjIxNzlMMzQuOTkzMyA4LjQ5NTkzSDM5LjYxODlMNTIuMzkyNSA0Ni4xMjVIMjIuMjE3OUwxOS4yNDU3IDU0LjYyMDlINTUuMjU2MUw2My41MTQzIDc4Ljg5NjFINzMuNDI2TDQ2LjU1NjUgMFoiIGZpbGw9IiNGNUY1RjUiLz4KPHBhdGggZD0iTTEuNDA1MDggNzguODk2MUgxMC45ODU3TDE5LjI0NTcgNTQuNjIwOUw5LjcwNzQgNTQuNjIwOUwxLjQwNTA4IDc4Ljg5NjFaIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0zLjA5MzUgNDYuMTI1TDAuMTg3NSA1NC42MjA5SDkuNzA3NEwxMi42MTM0IDQ2LjEyNUgzLjA5MzVaIiBmaWxsPSIjRjVGNUY1Ii8+Cjwvc3ZnPgo=";
  const projects = await getAleoProjects();

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Rate, Review, and Discover Aleo Projects
      </h1>
      <div className="w-full max-w-2xl">
        <Link 
          href="/aleo"
          className="block p-6 bg-black text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white"
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative w-48 h-48 mb-4">
              <Image
                src={aleoLogo}
                alt="Aleo logo"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-white">Aleo - The Privacy Blockchain</h2>
            <p className="text-white">A privacy-focused blockchain platform enabling private applications</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
