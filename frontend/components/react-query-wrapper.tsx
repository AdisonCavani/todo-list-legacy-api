"use client";

import { client } from "@api/client";
import { queryKeys } from "@lib/hooks/query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useState, type PropsWithChildren } from "react";

function ReactQueryWrapper({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
            staleTime: 2000,
            retry: 0,
            networkMode: "offlineFirst",
          },
        },
      }),
  );

  queryClient.setMutationDefaults([queryKeys.tasks], {
    mutationFn: async (req) => {
      await queryClient.cancelQueries({ queryKey: [queryKeys.tasks] });
      return await client("/tasks").post({
        body: req,
      });
    },
  });

  const [persister] = useState(() =>
    createSyncStoragePersister({
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
    }),
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: persister }}
      onSuccess={() => {
        // resume mutations after initial restore from localStorage was successful
        queryClient.resumePausedMutations().then(() => {
          queryClient.invalidateQueries();
        });
      }}
    >
      {children}
      <ReactQueryDevtools initialIsOpen />
    </PersistQueryClientProvider>
  );
}

export default ReactQueryWrapper;
