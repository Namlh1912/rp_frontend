const path = require('path');
const shortid = require('shortid'); //only contains special characters -_
const fse = require('fs-extra');
const moment = require('moment');
const Bluebird = require('bluebird-global');

const ProductProvider = require('../providers/ProductProvider');
// const ThemeDetailProvider = require('../providers/ThemeDetailProvider');
// const DeviceGroupsProvider = require('../providers/DeviceGroupsProvider');
const FileUtil = require('../util/FileUtil');
const ControllerBase = require('./ControllerBase');

// const TMP_UPLOAD_PATH = path.join(process.cwd(), '.tmp', 'public', 'images', 'upload');
const IMG_PATH = path.join(process.cwd(), 'assets', 'images', 'upload');
const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.gif'];
const FILE_SIZE = 20120000; //maximum 20MB, type: byte
// const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
// const SERVER_IMG = 'http://localhost:1337/images/upload/'
// let this._rawFileName = '';

class ProductController extends ControllerBase {

	constructor() {
		super();
		this._fileUtil = new FileUtil();
		this._exportedMethods = [
			'listByBrand',
			'searchName'
		];
	}

	get productProvider() {
		if (!this._provider) {
			this._provider = new ProductProvider();
		}
		return this._provider;
	}

	getNow() {
		return moment().utc();
	}

	create(request, response) {
		this.uploadFile(request, IMG_PATH)
			.then(file => {
				let product = Object.assign({}, request.body, { imgLink: path.basename(file.fd) });
				return this.productProvider.create(product);
			})
			.then(product => response.ok(product))
			.catch(err => {
				sails.log.error(err);
				response.serverError('Upload failed at uploading images!');
			});
	}

	delete(request, response) {
		let id = parseInt(request.param('id'));
		this.productProvider.delete(id)
			.then(deleted => {
				if (deleted) {
					response.status(204);
					return response.send();
				} else {
					response.forbidden(deleted);
				}
			})
			.catch(err => {
				sails.log.error(err);
				return response.serverError('Cannot remove this asset.')
			});
	}

	detail(request, response) {
		let id = parseInt(request.param('id'), 10);
		this.productProvider.detail(id)
			.then(detail => {
				return response.ok(detail);
			})
			.catch(err => {
				response.serverError(`Get product id ${id} failed`);
				sails.log.error(err);
			});
	}

	list(request, response) {
		this.productProvider.list()
			.then(assets => response.ok(assets))
			.catch(err => {
				response.serverError('Get images failed');
				sails.log.error(err);
			});
	}

	async listByBrand(request, response) {
		let brandId = parseInt(request.param('brand_id'));

		let products = await this.productProvider.listByBrand(brandId);
		if (products && products.length) { return response.ok(products); }
		return response.notFound('Cannot find any products');
	}

	async update(request, response) {
		try {
			let check = await this.productProvider.detail(request.body['id']);
			if (check) {
				let product = await this.productProvider.update(request.body);
				return response.ok(product);
			}
			return response.notFound('Cannot find this product');
		}
		catch (err) {
			sails.log.error(err);
			return response.serverError('Cannot update this product');
		}
	}


	async searchName(request, response) {
		try {
			let name = request.param('name');
			let products = await this.productProvider.searchName(name);
			if (products && products.length) {
				return response.ok(products);
			}
			return response.notFound('Cannot find any matches');
		} catch (ex) {
			sails.log.error(ex);
			return response.serverError('Cannot find any matches');
		}
	}

	//#region upload file
	uploadFile(request, dir) {
		let fileReq = request.file('file');
		fileReq.uploadAsync = Bluebird.promisify(fileReq.upload);
		return fse.ensureDir(dir).then(() => {
			return fileReq.uploadAsync({
				dirname: dir,
				saveAs: this.saveAs.bind(this)
			});
		}).then(([file]) => {
			const rejectFn = (msg) => {
				return this._fileUtil.removeFile(file.fd)
					.then(() => Promise.reject(new Error(msg)));
			};
			let dataType = path.extname(file.filename);

			if (file.size > FILE_SIZE) {
				return rejectFn('File is larger than accepted!');
			}

			if (FILE_TYPES.indexOf(dataType.toLowerCase()) < 0) {
				return rejectFn('File is not accepted');
			}
			return file;
		});
	}

	saveAs(fileStream, next) {
		let name = shortid.generate(),
			ext = path.extname(fileStream.filename);
		return next(null, `${name}${ext}`);
	}
	//#endregion
}

module.exports = new ProductController().exports();