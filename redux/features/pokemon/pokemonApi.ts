import { baseApi } from "@/redux/app/baseApi";
// Define a service using a base URL and expected endpoints
export const pokemonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPokemonByName: build.query<any, string>({
      query: (name) => `pokemon/${name}`,
      providesTags: ["Pokemon"],
    }),

    addPokemon: build.mutation<any, string>({
      query: (name) => `pokemon/${name}`,
      invalidatesTags: ["Pokemon"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery, useAddPokemonMutation } = pokemonApi;
