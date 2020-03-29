Contact = require('./contactModel');

exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: 200,
            message: "Contacts retrieved successfully",
            data: contacts
        });
    });
};

exports.new = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.skill = req.body.skill;
    contact.email = req.body.email;
    contact.phone = req.body.phone;

    contact.save(function (err) {
        if (err) res.json(err);
        res.json({
            status: 200,
            message: 'New contact created!',
            data: contact
        });
    });
};

exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: 200,
            message: 'Contact details loading... please wait.',
            data: contact
        });
    });
};

exports.update = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.skill = req.body.skill;
        contact.email = req.body.email;
        contact.phone = req.body.phone;

        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                status: 200,
                message: 'Contact info updated',
                data: contact
            });
        });
    });
};

exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
    res.json({
            status: 200,
            message: 'Contact deleted succesfully'
        });
    });
};