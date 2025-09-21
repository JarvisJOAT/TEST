import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { QuizClient } from '../quiz-client';

// This function now has to search for the files since the full path is not in the slug
function findQuizFiles(slug: string): { allQuestions: any[], quizTitle: string } | null {
    const coursesDirectory = path.join(process.cwd(), 'courses');
    const lessonSlug = slug.replace('-quiz', '');

    const learningPathDirs = fs.readdirSync(coursesDirectory, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (const lp of learningPathDirs) {
        const lessonPath = path.join(coursesDirectory, lp, `${lessonSlug}.md`);
        const quizPath = path.join(coursesDirectory, lp, `${slug}.json`);

        if (fs.existsSync(quizPath)) {
            let quizTitle = "Quiz";
            try {
                const lessonContents = fs.readFileSync(lessonPath, 'utf8');
                const { data } = matter(lessonContents);
                quizTitle = `Quiz: ${data.title}`;
            } catch {
                // ignore if lesson md doesn't exist
            }

            const quizContents = fs.readFileSync(quizPath, 'utf8');
            const allQuestions = JSON.parse(quizContents);
            return { allQuestions, quizTitle };
        }
    }
    return null;
}


type Props = { params: { slug: string } };

export default async function QuizPage({ params }: Props) {
  const quizData = findQuizFiles(params.slug);

  if (!quizData) {
      return (
          <main className="flex min-h-screen flex-col items-center justify-center p-24">
              <h1 className="text-4xl font-bold">Quiz not found</h1>
              <p className="mt-4 text-lg">
                  Could not find quiz data for slug: <code>{params.slug}</code>.
              </p>
          </main>
      );
  }

  return (
    <QuizClient allQuestions={quizData.allQuestions} quizTitle={quizData.quizTitle} />
  );
}