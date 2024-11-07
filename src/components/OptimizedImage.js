// components/OptimizedImage.js
export default function OptimizedImage({
  src,
  width,
  alt,
  fill,
  className,
  loading = "eager",
  ...props
}) {
  // 이미지 크기 배열 정의
  const sizes = [640, 750, 828, 1080, 1200];
  const filename = src.split("/").pop().split(".")[0];

  // 기본 이미지 소스 (가장 작은 크기)
  const defaultSrc = `/optimized/${filename}-${sizes[0]}.webp`;

  // srcset 문자열 생성
  const srcSet = sizes
    .map((size) => `/optimized/${filename}-${size}.webp ${size}w`)
    .join(", ");

  if (fill) {
    return (
      <div className="relative w-full h-full">
        <img
          src={defaultSrc}
          alt={alt}
          srcSet={srcSet}
          sizes="(max-width: 640px) 100vw, 
                 (max-width: 750px) 100vw,
                 (max-width: 828px) 100vw,
                 (max-width: 1080px) 100vw,
                 1200px"
          className={`absolute w-full h-full object-cover ${className || ""}`}
          loading={loading}
          {...props}
        />
      </div>
    );
  }

  return (
    <img
      src={defaultSrc}
      alt={alt}
      width={width}
      srcSet={srcSet}
      sizes="(max-width: 640px) 100vw, 
             (max-width: 750px) 100vw,
             (max-width: 828px) 100vw,
             (max-width: 1080px) 100vw,
             1200px"
      loading="lazy"
      className={`max-w-full h-auto ${className || ""}`}
      {...props}
    />
  );
}
