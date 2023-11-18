import fs from 'fs'
import { join, sep } from 'path'
import matter from 'gray-matter'
import DocViewModel from '../interfaces/docViewModel'
import markdownToHtml from './markdownToHtml'

const DOC_FOLDER: string = '_docs'
const MARKDOWN_EXTENSION: string = '.md'

export async function getDocumentByUriSegments(uriSegments: string[]) {
  const fullpathToResource = generateFullPathToMarkdownFile(uriSegments);

  const fileContents = fs.readFileSync(fullpathToResource, 'utf8')
  const { data, content } = matter(fileContents)

  const doc: DocViewModel = {
    content: await markdownToHtml(content),
    metadata: data,
    title: data['title'],
    uri: uriSegments.join('/')
  }

  return doc;
}

export function getAllExistingDocPathSegments() {
  const fullPathToDocsFolder = getFullPathToDocsFolder();
  return traverseDirectory(fullPathToDocsFolder).map(path => path.split(sep));
}

export async function getAllDocs() {
  var allPathSegments = getAllExistingDocPathSegments();
  const retrievePromises = allPathSegments.map(uriSegments => {
    return getDocumentByUriSegments(uriSegments);
  });

  var allDocs = await Promise.all(retrievePromises);

  return allDocs;
}

function traverseDirectory(directory: string): string[] {
  let relativeFilePaths: string[] = [];

  for (const entry of fs.readdirSync(directory)) {
    const entryFullPath = join(directory, entry);
    if (isDirectory(entryFullPath)) {
      const filePaths = traverseDirectory(entryFullPath)
        .map(path => `${entry}${sep}${path}`);

        relativeFilePaths = relativeFilePaths.concat(filePaths);
    } else {
      const entryWithNoExtension = entry.replace(/\.md$/, '')
      relativeFilePaths.push(entryWithNoExtension);
    }
  }

  return relativeFilePaths;
}

function isDirectory(path: string): Boolean {
  var stat = fs.lstatSync(path);
  return stat.isDirectory();
}

function generateFullPathToMarkdownFile(uriSegments: string[]): string {
  const joinedSegments: string = joinSegments(uriSegments);
  const fullPathToDocsFolder = getFullPathToDocsFolder();
  const relativePathWithExtension = `${joinedSegments}${MARKDOWN_EXTENSION}`;
  return join(fullPathToDocsFolder, relativePathWithExtension);
}

function getFullPathToDocsFolder(): string {
  return getFullPath(DOC_FOLDER);
}

function getFullPath(relativePath: string): string {
  return join(process.cwd(), relativePath);
}

function joinSegments(uriSegments: string[]): string {
  return `${Array.isArray(uriSegments) ? uriSegments.join(sep) : uriSegments}`;
}
