import wretch from "wretch";

export type GeoapifyLocation = {
  place_id: string;
  country: string;
  state: string;
  city: string;
  lon: string;
  lat: string;
  name: string;
};
export async function autocompleteLocation(text: string, apiKey?: string) {
  if (!apiKey) return [];
  if (!text.trim().length) return [];
  const resp = await wretch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&format=json&apiKey=${apiKey}`,
  )
    .get()
    .fetchError((err) => console.error(err))
    .json<{ results: GeoapifyLocation[] }>();

  return resp.results;
}
