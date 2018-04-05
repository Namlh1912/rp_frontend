const fs = require('fs');
const fse = require('fs-extra');
const Bluebird = require('bluebird-global');
const removeAsync = Bluebird.promisify(fs.unlink),
	ensureDirAsync = Bluebird.promisify(fse.ensureDir);

class FileUtil {

	// uploadImage(fileName, data, upload_path, tmp_path) {
	// 	return new Promise((resolve, reject) => {
	// 		Promise.all([
	// 			this.writeFile(upload_path, fileName, data)
	// 			, this.writeFile(tmp_path, fileName, data)
	// 		]).then(([imgName, tmpImgName]) => {
	// 			resolve(imgName);
	// 		}).catch(reject);
	// 	});
	// }

	// writeFile(uploadPath, fileName, data) {
	// 	return new Promise((resolve, reject) => {
	// 		fs.open(uploadPath, 'r', (err) => {
	// 			if (!err) {
	// 				fs.writeFile(uploadPath + fileName, data, (err) => {
	// 					if (err) {
	// 						reject(err + '');
	// 					} else {
	// 						resolve(fileName);
	// 					}
	// 				});
	// 			} else {
	// 				fs.mkdirSync(uploadPath);
	// 				fs.writeFile(uploadPath + fileName, data, (err) => {
	// 					if (err) {
	// 						reject(err + '');
	// 					} else {
	// 						resolve(fileName);
	// 					}
	// 				});
	// 			}
	// 		});
	// 	});
	// }

	ensureDir(path){
		return ensureDirAsync(path);
	}

	copyFile(src, dest) {
		return fse.copy(src, dest);
	}

	removeFile(path) {
		return removeAsync(path).then(result => result);
	}
}

module.exports = FileUtil;