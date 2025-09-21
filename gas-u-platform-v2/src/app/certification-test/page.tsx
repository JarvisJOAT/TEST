import fs from 'fs';
import path from 'path';
import { TestClient } from './test-client';

function getAllQuestions() {
  const coursesDirectory = path.join(process.cwd(), 'courses');
  const learningPaths = fs.readdirSync(coursesDirectory, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const allQuestions = learningPaths.flatMap(lp => {
    const lpPath = path.join(coursesDirectory, lp);
    const files = fs.readdirSync(lpPath);

    const quizFiles = files.filter(file => file.endsWith('-quiz.json'));

    return quizFiles.flatMap(file => {
      const filePath = path.join(lpPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      try {
        return JSON.parse(fileContents);
      } catch (error) {
        console.error(`Error parsing JSON from ${file}:`, error);
        return [];
      }
    });
  });

  return allQuestions;
}

export default function CertificationTestPage() {
  const allQuestions = getAllQuestions();

  return (
    <TestClient allQuestions={allQuestions} />
  );
}
