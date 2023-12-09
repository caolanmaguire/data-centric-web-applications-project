// const pmysql = require('promise-mysql');
const mysql = require('mysql')

// mysql.createPool({
//     connectionLimit: 3,
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "proj2023"
// }).then(p => {
//         pool = p;
//     })
//     .catch(e => {
//         console.log("pool error: " + e)
//     })

module.exports = {
    getEmployeesList: function () {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM employee')
                .then((data) => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    // getPickEditEmployees: function (eid) {
    //     return new Promise((resolve, reject) => {
    //         pool.query(`select * from employee where eid like "${eid}";`)
    //             .then((data) => {
    //                 resolve(data)
    //             })
    //             .catch(error => {
    //                 reject(error)
    //             })
    //     })
    // },


    getEditEmployees: function (eid, body) {
        // return new Promise((resolve, reject) => {
        //     var SQLQuery = {
        //         sql: `UPDATE employee  SET ename = ?, role = ?, salary = ? WHERE eid like ("${eid}");`,
        //         values: [body.ename, body.role, body.salary]
        //     }

        //     pool.query(SQLQuery)
        //         .then((data) => {
        //             resolve(data)
        //         })
        //         .catch(error => {
        //             reject(error)
        //         })
        // })
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE employee SET
            ename = '${body.ename}',
            role = '${body.role}',
            salary = ${body.salary}
            WHERE eid LIKE(\"${eid}\")`)
                .then((data) => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },


    getDepartment: function () {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM dept')
                .then((data) => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },


    getDepartmentDelete: function (did) {
        return new Promise((resolve, reject) => {
            pool.query(`DELETE FROM dept WHERE did LIKE (\"${did}\")`)
                .then((data) => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })

    }

}
