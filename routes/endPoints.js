const router = require('express').Router();
const httpStatus = require('http-status');
const utils = require('../utils/utilFunctions');
let filePaths = require("../data/filePaths");
var path = require('path');
var mime = require('mime');
var fs = require('fs');

router.get('/authors', async (req, res) => {

    try {
        utils.getsCSVData(filePaths.authorsPath).then((result) => {
            res.status(200).json({ status: httpStatus.OK, message: "request successfull", data: result });
        }).catch((err) => {
            res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "Request Failed", err: err });
        });

    } catch (exe) {
        console.log(exe)
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "Request Failed", err: exe });
    }

});


router.get('/booksMagazines', async (req, res) => {
    try {
        utils.getsCSVData(filePaths.booksPath).then((books) => {
            utils.getsCSVData(filePaths.magazinesPath).then((magazines) => {
                Array.prototype.push.apply(books, magazines);
                let sortedData = books.sort((a, b) => (a.title > b.title ? 1 : -1))
                res.status(200).json({ status: httpStatus.OK, message: "request successfull", data: sortedData });
            })
        }).catch((err) => {
            res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "Request Failed", err: err });
        });


    } catch (exe) {
        console.log(exe)
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "Request Failed", err: exe });
    }

});


router.get('/magazines', async (req, res) => {
    try {
        utils.getsCSVData(filePaths.magazinesPath).then((result) => {
            if (!utils.isEmpty(req.query)) {
                let data = fileterddata(req.query, result);
                res.status(200).json({ status: httpStatus.OK, message: "request successfull", data: data });
            } else {
                res.status(200).json({ status: httpStatus.OK, message: "request successfull", data: result });
            }

        }).catch((err) => {
            res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "Request Failed", err: err });
        });

    } catch (exe) {
        console.log(exe)
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "Request Failed", err: exe });
    }

});

router.get('/books', async (req, res) => {
    try {
        utils.getsCSVData(filePaths.booksPath).then((result) => {
            if (!utils.isEmpty(req.query)) {
                let data = fileterddata(req.query, result)

                res.status(200).json({ status: httpStatus.OK, message: "request successfull", data: data });


            } else {
                res.status(200).json({ status: httpStatus.OK, message: "request successfull", data: result });
            }

        }).catch((err) => {
            res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "Request Failed", err: err });
        });

    } catch (exe) {
        console.log(exe)
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "Request Failed", err: exe });
    }

});

router.post('/books', async (req, res) => {
    try {
        utils.addDataToCsv(req.body, "./data/books.csv")
        res.status(200).json({ status: httpStatus.OK, message: "Data added successfully", data: req.body });

    } catch (exe) {
        console.log(exe)
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "Request Failed", err: exe });
    }

});

router.post('/magazines', async (req, res) => {
    try {
        utils.addDataToCsv(req.body, "./data/magazines.csv")
        res.status(200).json({ status: httpStatus.OK, message: "Data added successfully", data: req.body });

    } catch (exe) {
        console.log(exe)
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "Request Failed", err: exe });
    }

});


router.get('/download', async (req, res) => {
    try {
        let fileLoaction;
        if (req.query.file === "books") {
            fileLoaction = filePaths.booksPath
        }
        if (req.query.file === "magazines") {
            fileLoaction = filePaths.magazinesPath;
        }
        var file = fileLoaction;
        var filename = path.basename(file);
        var mimetype = mime.lookup(file);

        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);

        var filestream = fs.createReadStream(file);
        filestream.pipe(res);

    } catch (exe) {
        console.log(exe)
        res.status(500).send({ status: httpStatus.INTERNAL_SERVER_ERROR, message: "Request Failed", err: exe });
    }

});


const fileterddata = (query, data) => {
    let filteredData = [];
    if (query.isbn) {
        index = data.findIndex(ele => ele.isbn === query.isbn);
        data = filteredData.push(data[index]);
    }
    if (query.authors) {
        data.forEach(element => {
            if (element.authors === query.authors) {
                filteredData.push(element)
            }
        });
    }

    return filteredData;
}

module.exports = router;
