import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
// import { Skeleton } from "../ui/skeleton";


function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl("");
    if (inputRef.current) inputRef.current.value = "";
  }

  async function uploadImageToCloudinary() {
  try {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);

    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    if (response?.data?.success) {
      setUploadedImageUrl(response.data.result.secure_url); // most important line 
    } else {
      alert("Upload failed: " + (response.data.message || "Unknown error"));
    }
  } catch (err) {
    console.error("Image upload error:", err);
    alert("Error uploading image: " + err.message);
  } finally {
    setImageLoadingState(false);
  }
}


  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 ${
          isEditMode ? "opacity-60" : ""
        }`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode || imageLoadingState}
          accept="image/*"
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center h-32 cursor-pointer ${
              isEditMode ? "cursor-not-allowed" : ""
            }`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileIcon className="w-8 text-primary h-8" />
              <p className="text-sm font-medium truncate max-w-xs">
                {imageFile.name}
              </p>
              {imageLoadingState && (
                <span className="text-xs text-muted-foreground">Uploading...</span>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
              disabled={imageLoadingState}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
      
      {uploadedImageUrl && !imageLoadingState && (
        <div className="mt-4">
          <img 
            src={uploadedImageUrl} 
            alt="Preview" 
            className="max-h-64 rounded-md object-contain"
          />
        </div>
      )}
    </div>
  );
}


export default ProductImageUpload;