import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

type Props = { params: { path: string } };

function getPathData(slug: string) {
    const coursesDirectory = path.join(process.cwd(), 'courses');
    const lpPath = path.join(coursesDirectory, slug);

    // Get Path Metadata
    const metaPath = path.join(lpPath, '+meta.json');
    let pathTitle = slug;
    let pathDescription = '';
    try {
        const metaContents = fs.readFileSync(metaPath, 'utf8');
        const meta = JSON.parse(metaContents);
        pathTitle = meta.title;
        pathDescription = meta.description;
    } catch (error) {
        console.log(`No +meta.json found for ${slug}.`);
    }

    // Get Lessons in Path
    const files = fs.readdirSync(lpPath);
    const lessons = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const filePath = path.join(lpPath, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);

        const lessonSlug = file.replace('.md', '');

        return {
          slug: lessonSlug,
          title: data.title,
          description: data.description,
        };
      });

    return { pathTitle, pathDescription, lessons };
}


export default async function LearningPathPage({ params }: Props) {
  const { pathTitle, pathDescription, lessons } = getPathData(params.path);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold">{pathTitle}</h1>
            <p className="mt-4 text-lg text-gray-600">{pathDescription}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {lessons.map((lesson) => (
            <Link href={`/courses/${lesson.slug}`} key={lesson.slug}>
              <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-transform hover:scale-105">
                <h2 className="mb-3 text-2xl font-bold text-black">{lesson.title}</h2>
                <p className="flex-grow text-gray-600">{lesson.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
