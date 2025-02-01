import { fetchWithAuth } from "@/app/_features/common/utils/fetchWithAuth";
import { formatPrice } from "@/app/_features/common/utils/formatPrice";
import { TeaResponse } from "@/app/_features/teas/definitions/get-all-teas-success-res.definition";
import demoTea from "@public/demo-tea.png";
import Image from "next/image";

export default async function Page() {
  // get teas
  const response = await fetchWithAuth("/api/v1/teas");
  if (!response.ok) {
    return <h1>Failed to load teas</h1>;
  }
  const teas: TeaResponse = await response.json();
  console.log(teas);
  return (
    <div className="min-h-dvh bg-white">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-gray-900">Teas</h2>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {teas.map((tea) => (
            <a key={tea.id} href={"#"} className="group">
              <Image
                alt={tea.name}
                src={tea?.imageUrl || demoTea}
                className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              />
              <h3 className="mt-4 text-sm text-gray-700">{tea.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {formatPrice(tea.price)}
              </p>
            </a>
          ))}
        </ul>
      </div>
    </div>
  );
}
