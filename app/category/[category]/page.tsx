import CategoryClient, { CategoryType } from "./CategoryClient";

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  return <CategoryClient initialCategory={category as CategoryType} />;
}
