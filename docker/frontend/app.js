var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path'); // Added for better path handling

// MIME type mapping for proper content type headers
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

http.createServer(function (req, res) {

    var q = url.parse(req.url, true);

    // Default to index.html if root path is requested
    var pathname = q.pathname === '/' ? '/index.html' : q.pathname;
    var filename = "." + pathname;
    
    // Security: Prevent directory traversal attacks (e.g., ../../../etc/passwd)
    var safePath = path.normalize(filename).replace(/^(\.\.[\/\\])+/, '');
    
    // Get file extension for proper MIME type
    var ext = path.extname(safePath).toLowerCase();
    var contentType = mimeTypes[ext] || 'text/plain';
    
    // Enhanced file reading with better error handling
    fs.readFile(safePath, function(err, data) {
        
      if (err) {
        // Log the error for debugging (server-side only)
        console.error('File access error:', err.message);
        
        // Check the type of error for appropriate response
        if (err.code === 'ENOENT') {
          // File not found - return user-friendly 404 page
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>404 Not Found</title>
              <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                h1 { color: #e74c3c; }
                a { color: #3498db; text-decoration: none; }
              </style>
            </head>
            <body>
              <h1>404 - Page Not Found</h1>
              <p>The requested page "${pathname}" could not be found.</p>
              <a href="/">← Return to Home</a>
            </body>
            </html>
          `);
        } else if (err.code === 'EACCES') {
          // Permission denied - return 403 Forbidden
          res.writeHead(403, {'Content-Type': 'text/html'});
          return res.end(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>403 Forbidden</title>
              <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                h1 { color: #e74c3c; }
                a { color: #3498db; text-decoration: none; }
              </style>
            </head>
            <body>
              <h1>403 - Access Forbidden</h1>
              <p>You don't have permission to access this resource.</p>
              <a href="/">← Return to Home</a>
            </body>
            </html>
          `);
        } else {
          // Other server errors - return 500
          res.writeHead(500, {'Content-Type': 'text/html'});
          return res.end(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>500 Server Error</title>
              <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                h1 { color: #e74c3c; }
                a { color: #3498db; text-decoration: none; }
              </style>
            </head>
            <body>
              <h1>500 - Internal Server Error</h1>
              <p>Something went wrong on our end. Please try again later.</p>
              <a href="/">← Return to Home</a>
            </body>
            </html>
          `);
        }
      } 

      // Success - serve the file with proper content type
      res.writeHead(200, {'Content-Type': contentType});
      res.write(data);
      return res.end();

    });

  }).listen(31916, function() {
    // Enhanced server startup logging
    console.log('=================================');
    console.log('Server running successfully!');
    console.log('Logs: Check console for errors');
    console.log('=================================');
  });