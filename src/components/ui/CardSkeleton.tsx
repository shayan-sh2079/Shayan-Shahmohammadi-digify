export default function CardSkeleton() {
  return (
    <div className="col-span-1 overflow-hidden rounded-lg bg-white shadow-lg shadow-md">
      <div className="relative h-32 w-full animate-pulse bg-gray-300/80 sm:h-36 md:h-40" />

      <div className="p-4">
        <span className="block h-7 w-50 animate-pulse rounded-md bg-gray-300/80" />

        <div className="mt-2 flex flex-col space-y-1">
          <span
            className={"h-6 w-40 animate-pulse rounded-md bg-gray-300/80"}
          />
          <span
            className={"h-6 w-40 animate-pulse rounded-md bg-gray-300/80"}
          />
          <span
            className={"h-6 w-40 animate-pulse rounded-md bg-gray-300/80"}
          />
        </div>
      </div>
    </div>
  );
}
