export const dynamic = "force-dynamic";

import DemoPageClient from "@/components/DemoPageClient";

export default async function DemoPage(props) {
  const { theme } = await props.params;
  return <DemoPageClient theme={theme} />;
}
