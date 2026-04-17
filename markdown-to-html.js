import { marked } from "marked";

const markdownData = {};

for await (const mdItem of Deno.readDir("content/markdown")) {
    if (mdItem.isFile) {
        const mdContent = await Deno.readTextFile(`content/markdown/${mdItem.name}`);
        const htmlContent = marked.parse(mdContent);
        markdownData[mdItem.name] = htmlContent;
    }
}

function getMarkdownData() {
    return markdownData;
}

export default getMarkdownData;
