import AboutForm from "@/components/admin/AboutForm";
import { getAbout } from "@/lib/about";

export const instant = false;

export default async function AdminAboutPage() {
  const about = await getAbout();

  return (
    <>
      <h1 className="text-2xl font-bold text-stone-900">درباره ما</h1>
      <p className="mb-6 mt-1 text-sm text-stone-500">محتوای صفحهٔ «درباره ما» سایت را از اینجا ویرایش کن.</p>
      <AboutForm about={about} />
    </>
  );
}