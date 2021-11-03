module.exports = {
    createController: (Model) => {
        return {
            post: async (req, res) => {
                req.body.owner = req.sessionID;
                new Model(req.body)
                    .save()
                    .then(
                        async (data, err) => {
                            if (err) {
                                return res.status(422).json({ status: 422, message: data, error: err });
                            }
                            return res.status(200).json({ status: 200, items: data });
                        }
                    )
            },

            get: async (req, res) => {
                if (req.params.id || req.body.id) {
                    Model.findById(
                        req.params.id || req.body.id,
                        async (data, err) => {
                            if (err) {
                                return res.status(422).json({ status: 422, message: data, error: err });
                            }
                            if (data.owner == req.sessionID || data.privacy == 'Public') {
                                return res.status(200).json({ status: 200, items: data });
                            } else {
                                return res.status(503).json({ status: 503, message: 'not your data' });
                            }
                        }
                    )
                } else {
                    Model.find({ owner: req.sessionID }, async (err, data) => {
                        if (err) {
                            return res.status(422).json({ status: 422, message: data, error: err });
                        }
                        return res.status(200).json({ status: 200, items: data });
                    })
                }
            },

            put: async (req, res) => {
                Model.findOneById(
                    req.params.id || req.body.id,
                    async (data, err) => {
                        if (err) {
                            return res.status(422).json({ status: 422, message: data, error: err });
                        }
                        if (data.owner == req.sessionID || data.privacy == 'Public') {
                            data.update(req.body, async (data, err) => {
                                if (err) {
                                    return res.status(422).json({ status: 422, message: err });
                                }
                                return res.status(200).json({ status: 200, items: data });
                            })
                        } else {
                            return res.status(503).json({ status: 503, message: 'not your data' });
                        }
                    }
                )
            },

            del: async (req, res) => {
                Model.findById(
                    req.params.id || req.body.id,
                    async (data, err) => {
                        if (err) {
                            return res.status(422).json({ status: 422, message: data, error: err });
                        }
                        if (data.owner == req.sessionID) {
                            data.remove(async (data, err) => {
                                if (err) {
                                    return res.status(422).json({ status: 422, message: data, error: err });
                                }
                                return res.status(200).json({ status: 200, items: data });
                            })
                        } else {
                            return res.status(503).json({ status: 503, message: 'not your data' });
                        }
                    }
                )
            }
        }
    }
}