<html>
  <body>
    <script>
      (async () => {
        const response = await fetch('https://api.github.com/repos/zeninja864/zeninja864.github.io/contents/posts');
        const data = await response.json();
        let tableString = '<table><thead><tr><th>Name</th><th>Date</th></tr></thead><tbody>';

        // Sort the data by creation date
        data.sort((a, b) => new Date(b.content.created_at) - new Date(a.content.created_at));

        for (let file of data) {
          if (file.name === 'index.html') {
            continue; // Skip index.html
          }

          const response = await fetch(file.download_url);
          const text = await response.text();
          const firstHeader = text.match(/^#\s+(.+)$/m)?.[1] || file.name;

          tableString += `<tr><td><a href="${file.download_url}">${firstHeader}</a></td><td>${file.content.creation_date}</td></tr>`;
        }

        tableString += '</tbody></table>';
        document.getElementsByTagName('body')[0].innerHTML = tableString;
      })()
    </script>
  </body>
</html>
