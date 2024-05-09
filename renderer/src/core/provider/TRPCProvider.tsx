import React, { useMemo, useState } from 'react';
import { api, getBaseApiUrl, wsClient } from '../../utils/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpLink, loggerLink, splitLink, wsLink } from '@trpc/client';

interface TrpcProviderProps {
  children: React.ReactNode;
}

const TrpcProvider: React.FC<TrpcProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  const trpcClient = useMemo(() => {
    return api.createClient({
      links: [
        loggerLink({
          enabled: (opts) => {
            return (
              process.env.NODE_ENV === 'development' || (opts.direction === 'down' && opts.result instanceof Error)
            );
          },
        }),
        splitLink({
          condition(op) {
            return op.type === 'subscription';
          },
          true: wsLink({
            client: wsClient,
          }),
          false: httpLink({
            url: `${getBaseApiUrl()}/api/trpc`,
          }),
        }),
      ],
    });
  }, []);

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </api.Provider>
  );
};

export default TrpcProvider;
