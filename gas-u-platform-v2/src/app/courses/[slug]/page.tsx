import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

// This function now has to search for the file since the full path is not in the slug
function findLessonFile(slug: string): { content: string, quizPath: string } | null {
    const coursesDirectory = path.join(process.cwd(), 'courses');
    const learningPathDirs = fs.readdirSync(coursesDirectory, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (const lp of learningPathDirs) {
        const filePath = path.join(coursesDirectory, lp, `${slug}.md`);
        if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf8');
            const quizPath = `/quiz/${slug}-quiz`;
            return { content, quizPath };
        }
    }
    return null;
}

type Props = { params: { slug: string } };

export default async function CoursePage({ params }: Props) {
  const lesson = findLessonFile(params.slug);

  if (!lesson) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">Lesson not found</h1>
        <p className="mt-4 text-lg">
          Could not find the lesson for slug: <code>{params.slug}</code>.
        </p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <article className="prose lg:prose-xl">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.content}</ReactMarkdown>
        <div className="mt-12 text-center">
            <Link href={lesson.quizPath}>
                <span className="rounded-md bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-700">
                    Start Quiz
                </span>
            </Link>
        </div>
      </article>
    </main>
  );
}
