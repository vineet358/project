interface TrendingItemProps {
  number: number;
  title: string;
  views: string;
  date: string;
}

export default function TrendingItem({ number, title, views, date }: TrendingItemProps) {
  return (
      <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-[#B2F2BB] dark:hover:bg-[#00FFFF] transition-colors bg-[#F4F4F4] dark:bg-[#1A1A1A]">
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-[#0077B6] dark:bg-[#0A1A2F] text-[#F5F5F5] dark:text-[#00E5FF] font-bold rounded-lg">
              {number}
          </div>
          <div>
              <h3 className="font-medium text-[#333333] dark:text-[#F5F5F5] group-hover:text-black dark:group-hover:text-black">
                  {title}
              </h3>
              <div className="text-sm text-[#666666] dark:text-[#A0A0A0]">
                  {views} views • {date}
              </div>
          </div>
      </div>
  );
}
