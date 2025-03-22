import { FC } from 'react';

interface IProps {
  params: Promise<{ slug: string }>;
}
const Page: FC<IProps> = async ({ params }) => {
  const { slug } = await params;

  const blogTitle = `Blog: ${slug}`;

  return (
    <div>
      <h1>{blogTitle}</h1>
    </div>
  );
};

export default Page;
