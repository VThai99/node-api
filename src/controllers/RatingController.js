const {
    likeClause,
    timeClause,
    removeLastAnd,
  } = require("../common/query/make_greate_query");
const getAllRating = (req,res,next) =>{
    try {
        var db = req.conn;
        var startDate = req.query.startDate ? req.query.startDate : null;
        var endDate = req.query.endDate ? req.query.endDate : null;
        var page =
          isNaN(parseInt(req.query.page)) || parseInt(req.query.page) === 0
            ? 1
            : parseInt(req.query.page);
        var pageSize =
          isNaN(parseInt(req.query.pageSize)) || parseInt(req.query.pageSize) === 0
            ? 20
            : parseInt(req.query.pageSize);
        var skipNumber = (page - 1) * pageSize;
        var fillPName = req.query.product
          ? req.query.product.replace(/"/g, "")
          : null;
        var fillUName = req.query.importer
          ? req.query.importer.replace(/"/g, "")
          : null;
        var sqlQuery = `select i.*, u.name as user_name, p.name as product_name 
        from 
        import i left join user u on i.importer = u.id left join product p on i.product_id = p.id
        where 
         ${likeClause("p.name", fillPName)} 
         ${likeClause("u.name", fillUName)} 
         ${timeClause("i.time_import",startDate,endDate)}
        `;
        let getAllElements = db.query(removeLastAnd(sqlQuery), (err, orders) => {
          if (err) console.log("err when get all element");
          else {
            var totalElements = orders.length;
            let results = db.query(
              `${removeLastAnd(sqlQuery)} limit ? offset ?`,
              [pageSize, skipNumber],
              (err, respond) => {
                if (err) console.log("error");
                else {
                  let currentElement = respond.length;
                  res.send({
                    status: 200,
                    message: "Success",
                    data: respond,
                    currentPage: page,
                    currentElement: currentElement,
                    totalElements: totalElements,
                  });
                }
              }
            );
          }
        });
      } catch (err) {
        res.send({
          message: "something wrong",
        });
      }
}
module.exports = {
    getAllRating
}