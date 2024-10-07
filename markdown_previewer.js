const { useState, useEffect } = React;

const defaultMarkdown = `# Heading 1
## Subheading 2

[Link to Google](https://www.google.com)

\`Inline code\`

\`\`\`
Code block
with multiple lines
\`\`\`

- List item 1
- List item 2

> Blockquote

![Alt Text](https://via.placeholder.com/150)

**Bold text**
`;

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  const handleEditorChange = (event) => {
    setMarkdown(event.target.value);
  };

  const getMarkdownPreview = () => {
    return { __html: marked.parse(markdown) };  // Use marked.parse to convert markdown to HTML
  };

  return (
    <div className="container">
      <textarea
        id="editor"
        value={markdown}
        onChange={handleEditorChange}
      />
      <div
        id="preview"
        dangerouslySetInnerHTML={getMarkdownPreview()}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
