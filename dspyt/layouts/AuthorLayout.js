import Image from "@/components/Image";
import { PageSEO } from "@/components/SEO";

export default function AuthorLayout({ frontMatter, children }) {
  const {
    name,
    avatar,
    company,
    email,
    twitter,
    linkedin,
    github,
    description,
  } = frontMatter;

  return (
    <>
      <PageSEO
        title={`About - ${name}`}
        description={`${name}: ${description}`}
      />

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pb-8 pt-10">
            <Image
              src={avatar}
              alt="avatar"
              width="192px"
              height="192px"
              className="h-48 w-48 rounded-full"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
              {name}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
          </div>
          <div className="prose max-w-none pt-8 pb-8 pr-8 pl-8 dark:prose-dark xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
