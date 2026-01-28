/**
 * Detects if a URL points to a video file based on its extension
 */
export const isVideoUrl = (url: string): boolean => {
  if (!url) return false;
  const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv', 'flv', 'm4v'];
  const urlLower = url.toLowerCase();
  return videoExtensions.some(ext => urlLower.includes(`.${ext}`));
};

/**
 * Get the file extension from a URL
 */
export const getFileExtension = (url: string): string => {
  if (!url) return '';
  const match = url.match(/\.([a-zA-Z0-9]+)(\?|$)/);
  return match ? match[1].toLowerCase() : '';
};
