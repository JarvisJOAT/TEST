import fs from 'fs';
import path from 'path';
import Link from 'next/link';

function getLearningPaths() {
  const coursesDirectory = path.join(process.cwd(), 'courses');
  
  const learningPathDirs = fs.readdirSync(coursesDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const learningPaths = learningPathDirs.map(lp => {
    const metaPath = path.join(coursesDirectory, lp, '+meta.json');
    let title = lp;
    let description = '';

    try {
      const metaContents = fs.readFileSync(metaPath, 'utf8');
      const meta = JSON.parse(metaContents);
      title = meta.title;
      description = meta.description;
    } catch (error) {
      // If meta file doesn't exist, use the directory name as the title
      console.log(`No +meta.json found for ${lp}, using directory name as title.`);
    }

    return {
      slug: lp,
      title,
      description,
    };
  });

  return learningPaths;
}

export default function Home() {
  const learningPaths = getLearningPaths();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full max-w-4xl">
        <h1 className="mb-12 text-center text-5xl font-bold">GAS U Learning Paths</h1>
        <div className="grid grid-cols-1 gap-8">
          {learningPaths.map((lp) => (
            <Link href={`/paths/${lp.slug}`} key={lp.slug}>
              <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-lg transition-transform hover:scale-105">
                <h2 className="mb-3 text-2xl font-bold text-black">{lp.title}</h2>
                <p className="flex-grow text-gray-600">{lp.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
