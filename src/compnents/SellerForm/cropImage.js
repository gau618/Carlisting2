// cropImage.js
export const createImageElement = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous'); // Needed to avoid CORS issues
      image.src = url;
    });
  
  export default async function getCroppedImg(imageFile, croppedAreaPixels, width, height) {
    const image = await createImageElement(URL.createObjectURL(imageFile));
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    canvas.width = width;
    canvas.height = height;
  
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      width,
      height
    );
  
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg');
    });
  }
  