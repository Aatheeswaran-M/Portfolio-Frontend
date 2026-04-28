import { supabase } from './supabaseClient'

const readEnvValue = (...keys) => {
  for (const key of keys) {
    const value = import.meta.env[key]

    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }

  return ''
}

const cloudinaryCloudName = readEnvValue(
  'VITE_CLOUDINARY_CLOUD_NAME',
  'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
)
const cloudinaryUploadPreset = readEnvValue(
  'VITE_CLOUDINARY_UPLOAD_PRESET',
  'NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET',
)
const supabaseMediaBucket = readEnvValue(
  'VITE_SUPABASE_MEDIA_BUCKET',
  'NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET',
)

export const isCloudinaryConfigured = Boolean(cloudinaryCloudName && cloudinaryUploadPreset)
export const isSupabaseStorageConfigured = Boolean(supabase && supabaseMediaBucket)
export const isRemoteMediaUploadConfigured =
  isCloudinaryConfigured || isSupabaseStorageConfigured

const sanitizeFileName = (fileName) =>
  (fileName || 'file')
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

const buildStoragePath = (folder, fileName) => {
  const safeFolder = folder.replace(/^\/+|\/+$/g, '')
  const uniquePrefix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  return `${safeFolder}/${uniquePrefix}-${sanitizeFileName(fileName)}`
}

const uploadToCloudinary = async (file, folder) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', cloudinaryUploadPreset)
  formData.append('folder', folder)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/auto/upload`,
    {
      method: 'POST',
      body: formData,
    },
  )

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(payload?.error?.message || 'Cloudinary upload failed.')
  }

  if (!payload?.secure_url) {
    throw new Error('Cloudinary upload succeeded, but no secure URL was returned.')
  }

  return {
    provider: 'cloudinary',
    url: payload.secure_url,
    publicId: payload.public_id,
  }
}

const uploadToSupabaseStorage = async (file, folder) => {
  const filePath = buildStoragePath(folder, file.name)

  const { error } = await supabase.storage.from(supabaseMediaBucket).upload(filePath, file, {
    cacheControl: '3600',
    contentType: file.type || undefined,
    upsert: true,
  })

  if (error) {
    throw error
  }

  const { data } = supabase.storage.from(supabaseMediaBucket).getPublicUrl(filePath)

  if (!data?.publicUrl) {
    throw new Error('Supabase Storage upload succeeded, but no public URL was returned.')
  }

  return {
    provider: 'supabase-storage',
    url: data.publicUrl,
    path: filePath,
  }
}

export const uploadMediaFile = async (file, { folder = 'portfolio/uploads' } = {}) => {
  if (!file) {
    throw new Error('No file selected for upload.')
  }

  if (isCloudinaryConfigured) {
    return uploadToCloudinary(file, folder)
  }

  if (isSupabaseStorageConfigured) {
    return uploadToSupabaseStorage(file, folder)
  }

  throw new Error(
    'Remote media upload is not configured. Add Cloudinary settings or a Supabase media bucket.',
  )
}
