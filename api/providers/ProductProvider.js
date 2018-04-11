const Bluebird = require('bluebird-global');
const moment = require('moment');
const jimp = require('jimp');
const path = require('path');
const fse = require('fs-extra');

const ProductRepository = require('../repositories/ProductRepository');
// const OrderDetailRepository = require('../repositories/OrderDetailRepository');
const CategoryRepository = require('../repositories/CategoryRepository');
const FileUtil = require('../util/FileUtil');

const TMP_UPLOAD_PATH = path.join(process.cwd(), '.tmp', 'public', 'images', 'upload');
const IMG_PATH = path.join(process.cwd(), 'assets', 'images', 'upload');
const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const PRODUCT_STATUS = {
	available: 'available',
	unavailable: 'unavailable'
}

const jimpReadAsync = Bluebird.promisify(jimp.read);

class ProductProvider {

	constructor() {
		this._fileUtil = new FileUtil();
	}

	get productRepo() {
		if (!this._repo) {
			this._repo = new ProductRepository();
		}
		return this._repo;
	}

	get categoryRepo() {
		if (!this._categoryRepo) {
			this._categoryRepo = new CategoryRepository();
		}
		return this._categoryRepo;
	}

	async create(product) {
		const thumbnailPath = path.join(TMP_UPLOAD_PATH, `thumbnail-${product.imgLink}`);
		return jimpReadAsync(path.join(IMG_PATH, product.imgLink)).then(jimpFile => {
			return this.resizeImage(350, jimpFile, thumbnailPath);
		}).then(() => {
			return this.productRepo.create(product);
		}).catch(err => {
			let error = err;
			sails.log.error(error);
		});
	}

	delete(id) {
		return this.productRepo.update({ id }, { status: PRODUCT_STATUS.unavailable });
	}

	detail(id) {
		return this.productRepo.getDetail(id);
	}

	list() {
		return this.productRepo.getList();
	}

	getByCategory(cateogryId) {
		return this.productRepo.getByCategory(cateogryId);
	}

	update(data) {
		return this.productRepo.update({ id: data.id }, data).then(updatedItems => updatedItems[0])
			.catch(err => {
				sails.log.error(err);
				return err;
			});
	}

	searchName(name) {
		return this.productRepo.searchName(name);
	}

	getNow() {
		return moment().utc();
	}

	//#region upload file
	resizeImage(size, image, fromPath) {
		return new Promise((resolve, reject) => {
			image.resize(size, jimp.AUTO).write(fromPath, (err) => {
				if (err) return reject(new Error(err));
				sails.log.info('resized image');
				let toPath = path.join(IMG_PATH, path.basename(fromPath));
				return resolve(this._fileUtil.copyFile(fromPath, toPath));
			});
		});
	}
	//#endregion
}
module.exports = ProductProvider;