import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";

const ActorDetailLeft = () => {
  const { actorDetail, status, error } = useSelector(
    (state: RootState) => state.actors
  );

  const [mainImage, setMainImage] = useState<string>("");

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }

  // Split the images array into the first image and the rest
  const [firstImage, ...otherImages] = actorDetail?.image || [];

  // Set the initial main image
  const initialMainImage =
    firstImage && firstImage.startsWith("http")
      ? firstImage
      : firstImage
      ? `http://localhost:8000/images/${firstImage.replace("uploads/", "")}`
      : ""; // Default to an empty string if no image

  const imageUrl = mainImage || initialMainImage;

  // Prepare other images
  const allImages = [
    initialMainImage,
    ...otherImages.map((image) =>
      image.startsWith("http")
        ? image
        : `http://localhost:8000/images/${image.replace("uploads/", "")}`
    ),
  ];

  const handleImageClick = (imageUrl: string) => {
    setMainImage(imageUrl);
  };

  return (
    <div className="w-full flex md:flex-row flex-col md:gap-y-0 gap-y-5 items-start gap-x-5">
      {/* Left side: Thumbnails of the images */}
      <div className="md:w-1/4 w-full flex md:flex-col flex-row gap-y-4 gap-x-2">
        {allImages.length > 0 ? (
          allImages.map((url, index) => (
            <div
              key={index}
              className="w-full h-[100px] flex flex-col gap-y-3 items-center justify-center"
            >
              <img
                src={url}
                alt={`Theatre Thumbnail ${index + 1}`}
                className="w-28 h-28 object-cover cursor-pointer rounded-md"
                onClick={() => handleImageClick(url)}
              />
            </div>
          ))
        ) : (
          <div>No images available.</div>
        )}
      </div>

      {/* Right side: Main image display with full height */}
      <div className="md:w-3/4 w-full md:h-[450px] h-[350px]">
        <img
          src={imageUrl}
          alt="Main Theatre"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default ActorDetailLeft;
