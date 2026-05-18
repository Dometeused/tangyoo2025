export const dynamic = "force-dynamic";

import DemoPageClient from "@/components/DemoPageClient";

// /demo/[theme]/[phase] → invitation or memory
export default async function DemoPhasePage(props) {
  const { theme, phase } = await props.params;
  return <DemoPageClient theme={theme} phase={phase} />;
}
