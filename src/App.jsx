import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Crudoperation from "./Crudoperation";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryclient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10000,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryclient}>
        <Crudoperation />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
