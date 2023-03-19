import { PageWrapper } from "../../../layout/PageWrapper";
import { ClientsApiProvider } from "../api/ClientsApi";

export function PointsSummeryPage() {
  return (
    <PageWrapper>
      <ClientsApiProvider>
        <h1>TEST</h1>
      </ClientsApiProvider>
    </PageWrapper>
  )
}