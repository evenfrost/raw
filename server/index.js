import { createServer } from 'http';
import { parse } from 'url';
import { join } from 'path';
import { access, R_OK, stat, readFile } from 'fs';

const is = {
  /**
   * Checks if a file exists on a given path and accessible for Node to be read.
   *
   * @param  {String}  path The file path.
   * @return {Promise}
   */
  accessible: path => new Promise((resolve) => {
    access(path, R_OK, (err) => {
      resolve(!err);
    });
  }),

  /**
   * Checks if a path is a directory.
   *
   * @param  {String}  path The path of possible directory.
   * @return {Promise}
   */
  directory: path => new Promise((resolve) => {
    stat(path, (err, stats) => {
      if (err) resolve(false);

      resolve(stats.isDirectory());
    });
  }),
};

/**
 * Reads file from a path.
 *
 * @param  {String} path The file path.
 * @return {Promise}
 */
const read = path => new Promise((resolve, reject) => {
  readFile(path, 'utf8', (err, data) => {
    if (err) reject(err);

    resolve(data);
  });
});

createServer(async (req, res) => {
  const url = parse(req.url).pathname;
  let path = join(process.cwd(), 'client', url);

  if (!(await is.accessible(path))) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('404 Not Found\n');
    res.end();
    return;
  }

  if (await is.directory(path)) {
    path = join(path, 'index.html');
  }

  try {
    const file = await read(path);
    res.writeHead(200);
    res.write(file, 'utf8');
    res.end();
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.write(`${err}\n`);
    res.end();
  }
}).listen(process.env.PORT ? process.env.PORT : (process.env.NODE_ENV === 'production' ? 8080 : 5000)); // eslint-disable-line

