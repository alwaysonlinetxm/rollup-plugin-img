import { statSync, readFileSync, createReadStream, createWriteStream, existsSync, mkdirSync } from 'fs';
import { extname, basename  } from 'path';
import { createFilter } from 'rollup-pluginutils';

const mimeMap = {
	'.jpg':  'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png':  'image/png',
	'.gif':  'image/gif',
	'.svg':  'image/svg+xml'
};

function img(opt) {
	!opt && (opt = {});
	const extensions = opt.extensions || /\.(png|jpg|jpeg|gif|svg)$/;
	const filter = createFilter(opt.include, opt.exclude);

	return {
		name: 'image',
		load(id) {
      if (!filter(id)) return null;

			const ext = extname(id);
			if (!extensions.test(ext)) return null; // not an image

      if (statSync(id).size <= 8192) { // use base64
				return `export default "data:${mimeMap[ext]};base64,${readFileSync(id, 'base64')}"`;
      } else { //copy file to distPath
        const output = opt.output || '';
        if (!existsSync(output)) {
          const dirs = output.split('/');
          for (let i = 0, dir = dirs[0]; i < dirs.length; i++, dir += `/${dirs[i]}`) {
            if (dir !== '' && !existsSync(dir)) {
              mkdirSync(dir)
            }
          }
        }
				var outputFile = `${output}/${basename(id)}`;
        createReadStream(id).pipe(createWriteStream(outputFile));
        return `export default "${outputFile}"`;
      }
		}
	};
}

export default img;
