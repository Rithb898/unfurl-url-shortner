import { redirect } from "next/navigation";
import URL from "@/modals/Url";
import { connectToDatabase } from "@/lib/db";

export default async function Page({
  params,
}: {
  params: { shortUrl: string };
}) {
  await connectToDatabase();

  const shortUrl = params.shortUrl;
  const exists = await URL.findOne({ shortUrl });

  if (exists) {
    exists.click += 1;
    await exists.save();
    redirect(exists.url);
  } else {
    redirect("/");
  }

  return null;
}
