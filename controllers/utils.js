const returnData = (err, data) => {
    if (err) {
        return res.status(422).json({ status: 422, message: err });
    }
    return res.status(200).json({ status: 200, items: data });
},

verifyUser = (callback) => {
    (err, data) => {
        if (err) {
            return res.status(422).json({ status: 422, message: err });
        }
        if (data.owner == req.session.userid) {
            callback(err, data)
        } else {
            return res.status(503).json({ status: 503, message: 'not your data' });
        }
    }
}

module.exports = {
    returnData,
    verifyUser,
    createController: (Model) => {
        return {
            post: async (req, res) => {
                req.body.owner = req.session.userid;
                new Model(req.body)
                    .save()
                    .then(
                        returnData
                    )
            },
        
            get: async (req, res) => {
                if (req.params.id) {
                    Model.findById(
                        req.params.id,
                        verifyUser(returnData)
                    )
                } else {
                    Model.find({ owner: req.session.userid }, returnData)
                }
            },
        
            put: async (req, res) => {
                Model.findOneById(
                    req.params.id || req.body.id,
                    verifyUser((err, data) => data.update(req.body, returnData))
                )
            },
        
            del: async (req, res) => {
                Model.findById(
                    req.params.id || req.body.id,
                    verifyUser((err, data) => data.findOneAndRemove(req.params.id, returnData))
                )
            }
        }
    }
}