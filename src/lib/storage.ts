import { mkdir, writeFile, readFile, unlink } from "fs/promises"
import { existsSync } from "fs"
import path from "path"
import { randomUUID } from "crypto"

const STORAGE_PATH = process.env.STORAGE_PATH || "./storage"

// Types de dossiers de stockage
type StorageFolder = "dce" | "preuves" | "exports"

/**
 * Assure que le dossier de stockage existe
 */
async function ensureStorageDir(folder: StorageFolder): Promise<string> {
  const dirPath = path.join(STORAGE_PATH, folder)
  if (!existsSync(dirPath)) {
    await mkdir(dirPath, { recursive: true })
  }
  return dirPath
}

/**
 * Génère un nom de fichier unique
 */
function generateFilename(originalName: string): string {
  const ext = path.extname(originalName)
  const uuid = randomUUID()
  return `${uuid}${ext}`
}

/**
 * Sauvegarde un fichier
 */
export async function saveFile(
  folder: StorageFolder,
  buffer: Buffer,
  originalName: string
): Promise<{ filename: string; storagePath: string }> {
  const dirPath = await ensureStorageDir(folder)
  const filename = generateFilename(originalName)
  const storagePath = path.join(folder, filename)
  const fullPath = path.join(dirPath, filename)

  await writeFile(fullPath, buffer)

  return { filename, storagePath }
}

/**
 * Lit un fichier
 */
export async function getFile(storagePath: string): Promise<Buffer> {
  const fullPath = path.join(STORAGE_PATH, storagePath)
  return readFile(fullPath)
}

/**
 * Supprime un fichier
 */
export async function deleteFile(storagePath: string): Promise<void> {
  const fullPath = path.join(STORAGE_PATH, storagePath)
  if (existsSync(fullPath)) {
    await unlink(fullPath)
  }
}

/**
 * Vérifie si un fichier existe
 */
export function fileExists(storagePath: string): boolean {
  const fullPath = path.join(STORAGE_PATH, storagePath)
  return existsSync(fullPath)
}
