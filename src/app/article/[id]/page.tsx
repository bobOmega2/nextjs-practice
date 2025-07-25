// Dynamic article page showing full content for a given article ID

interface Props {
  params: {
    id: string;
  };
}

export default function ArticlePage({ params }: Props) {
  const { id } = params;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Article ID: {id}</h1>
      <p>This is where the article content will go.</p>
    </main>
  );
}
