module.export = ({ content }) => {
    return `
    <!DOCTYPE html>
        <html>
            <head>
                <script></script>
            </head>
            <body>
                ${content}
            </body>
        </html>
    `;
};