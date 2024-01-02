// const pmysql = require('promise-mysql');
const mysql = require('mysql')

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


    getEditEmployees: function (eid, body) {
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
