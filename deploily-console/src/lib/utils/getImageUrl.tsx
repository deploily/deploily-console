const STATIC_FILES_URL = process.env.STATIC_FILES_URL;

export const imageLoader = ({src, width, quality}: any) => {
  return `${STATIC_FILES_URL}/static/uploads/${src}?w=${width}&q=${quality || 75}`;
};
