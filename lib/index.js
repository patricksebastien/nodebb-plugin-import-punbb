
var	fse = require('fs-extra'),
	marked = require('marked'),
	path = require('path'),

	ImportPUNbb = {
		admin: {
			menu: function(custom_header) {
				custom_header.plugins.push({
					"route": '/plugins/import-punbb',
					"icon": 'icon-edit',
					"name": 'ImportPUNbb'
				});

				return custom_header;
			},
			route: function(custom_routes, callback) {
				fse.readFile(path.join(__dirname, '../README.md'), function(err, tpl) {
					marked(tpl.toString(), function(err, content){
						if (err) throw err;

						custom_routes.routes.push({
							route: '/plugins/import-punbb',
							method: "get",
							options: function(req, res, callback) {
								callback({
									req: req,
									res: res,
									route: '/plugins/import-punbb',
									name: ImportPUNbb,
									content: content
								});
							}
						});

						callback(null, custom_routes);
					});
				});
			}
		}
	};
module.exports = ImportPUNbb;