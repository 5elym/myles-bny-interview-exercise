import NoImageIcon from "../assets/no-image-icon.png";

interface ArticleCardImageProps {
  imageUrl?: string;
  title: string;
}

export default function ArticleCardImage({ imageUrl, title }: ArticleCardImageProps) {
  return (
    <>
      <img
        src={imageUrl || NoImageIcon}
        alt={title}
        onError={(e) => {
          e.currentTarget.src = NoImageIcon;
          e.currentTarget.onerror = null; // Prevents infinite loop if NoImageIcon fails to load
        }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Subtle gradient shadow to make title more readable */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-500"></div>
    </>
  );
}
