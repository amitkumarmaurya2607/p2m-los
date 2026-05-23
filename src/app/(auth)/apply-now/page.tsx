import Login from "@/views/Auth/Login";

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const type = typeof params.type === "string" ? params.type : undefined;

  return <Login type={type} />;
}

export default Page;
