import { News } from "@/types/news";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import Link from "next/link";

interface NewsCarouselProps {
  newsForCarousel: News[] | undefined;
}

export default function NewsCarousel({ newsForCarousel }: NewsCarouselProps) {
  return (
    <Carousel className="md:w-[600px] h-[250px] md:h-[400px] mx-auto mb-10">
      <CarouselContent>
        {newsForCarousel?.map((news) => (
          <CarouselItem key={news._id}>
            <div className="md:w-[600px] h-[250px] md:h-[400px] relative mx-auto mb-10  bg-slate-700">
              <Link href={`news/${news.category}/${news._id}`}>
                <div className="w-full h-28 absolute flex justify-center items-center bottom-0 bg-gradient-to-t from-black to-transparent">
                  <p className="text-white font-semibold md:text-2xl p-2 line-clamp-2">
                    {news.title}
                  </p>
                </div>
              </Link>

              <Image
                className="h-full w-full object-cover"
                src={getImageUrl(news.image)}
                alt="News Image"
                width={100}
                height={100}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
