import { Country } from "@/types/responses";
import Image from "next/image";

interface Props {
  country: Country;
}

export default function CountryCard({ country }: Props) {
  return (
    <div className="col-span-1 overflow-hidden rounded-lg bg-white shadow-lg shadow-md">
      <div className="relative h-32 sm:h-36 md:h-40">
        <Image
          src={country.flags.png}
          alt={country.flags.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 450px"
        />
      </div>

      <div className="p-4">
        <h2 className="mb-2 truncate text-xl font-semibold text-gray-800">
          {country.name.common}
        </h2>

        <ul className="space-y-1 text-gray-600">
          <li>
            <span className="font-medium">Region:</span> {country.region}
          </li>
          <li>
            <span className="font-medium">Population:</span>{" "}
            {country.population.toLocaleString()}
          </li>
          <li>
            <span className="font-medium">Area:</span>{" "}
            {country.area.toLocaleString()} km²
          </li>
        </ul>
      </div>
    </div>
  );
}
