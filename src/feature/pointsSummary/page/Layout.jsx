
import { PageWrapper } from "../../../layout/PageWrapper/PageWrapper";
import { ClientsApiProvider } from "../api/ClientsApi";
import { ClientsGrid } from "../components/ClientsGrid/ClientsGrid";

export function Layout() {
  return (
    <PageWrapper headerLabel={'Points Summary'}>
      <ClientsApiProvider>
        <ClientsGrid />
      </ClientsApiProvider>
    </PageWrapper>
  )
}