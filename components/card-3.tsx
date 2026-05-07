import * as React from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility from shadcn

// Define the props for the component
interface PropertyCardProps extends HTMLMotionProps<"div"> {
  imageUrl: string;
  videoUrl?: string;
  name: string;
  location: string;
  locationUrl?: string;
  rating: number;
  imageAlt?: string;
  isVIP?: boolean;
  isNext?: boolean;
}

// Animation variants for Framer Motion
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const PropertyCard = React.forwardRef<HTMLDivElement, PropertyCardProps>(
  (
    {
      className,
      imageUrl,
      videoUrl,
      name,
      location,
      locationUrl,
      rating,
      imageAlt = "Property Image",
      isVIP,
      isNext,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative group w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-500 ease-in-out hover:shadow-lg",
          isVIP && "max-w-3xl md:scale-105 z-10 border-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.6)] bg-gradient-to-br from-amber-500 via-amber-200 to-amber-600 ring-1 ring-amber-400/50",
          isNext && "grayscale blur-[4px] opacity-80 hover:grayscale-0 hover:blur-none hover:opacity-100",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        {...props}
      >
        {/* Image / Video Section */}
        <div className="overflow-hidden bg-black/5">
          {videoUrl ? (
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto max-h-[700px] object-contain transition-transform duration-500 ease-in-out"
            />
          ) : (
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-auto max-h-[600px] object-cover transition-transform duration-500 ease-in-out"
            />
          )}
        </div>

        {/* Content Section */}
        <div className="space-y-3 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <motion.h3
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className={cn("tracking-tight", isVIP ? "text-3xl font-black text-red-700 mb-1" : "text-lg font-semibold")}
              >
                {name}
              </motion.h3>
              {isVIP && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-300 shadow-sm">
                  <Star className="h-4 w-4 fill-red-600 text-red-600" />
                  <span className="text-sm font-bold text-red-700">{rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              style={{ transitionDelay: '0.2s' }} // Stagger animation
              className="flex items-center gap-1.5"
            >
              <MapPin className={cn("h-4 w-4", isVIP ? "text-red-600" : "text-violet-500")} />
              {locationUrl ? (
                <a href={locationUrl} target="_blank" rel="noopener noreferrer" className={cn("hover:underline", isVIP ? "text-red-700 hover:text-red-800 font-bold" : "hover:text-primary")}>
                  {location}
                </a>
              ) : (
                <span>{location}</span>
              )}
            </motion.div>
            {!isVIP && (
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                style={{ transitionDelay: '0.3s' }} // Stagger animation
                className="flex items-center gap-1.5"
              >
                <Star className="h-4 w-4 fill-violet-400 text-violet-500" />
                <span className="font-medium text-foreground">{rating}</span>
              </motion.div>
            )}
          </div>
        </div>
        {isVIP && (
          <div className="absolute bottom-8 right-4 rtl:right-auto rtl:left-4 z-20 pointer-events-none animate-float">
            <img 
              src="/ui/vip_tag.png" 
              alt="VIP Tag" 
              className="h-32 w-auto object-contain drop-shadow-2xl" 
            />
          </div>
        )}
      </motion.div>
    );
  }
);

PropertyCard.displayName = "PropertyCard";

export { PropertyCard };