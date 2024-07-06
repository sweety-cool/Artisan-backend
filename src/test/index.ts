import db from "@db/mysql";

const Test = async () => {
	try {
		let query: any = await db.sequelize.query(
			"SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE ENGINE = 'MyISAM'",
		);
		query = query[0];

		for (let q of query) {
			try {
				if (q.TABLE_NAME == "groups") {
				} else {
					let _query: any = await db.sequelize.query(
						`ALTER TABLE ${q.TABLE_NAME} ENGINE=INNODB`,
					);
					console.log("🚀 ~ file: index.ts ~ line 14 ~ Test ~ _query", _query);
				}
			} catch (err) {}
		}
	} catch (err) {
		console.error(err);
	}
};

Test();
