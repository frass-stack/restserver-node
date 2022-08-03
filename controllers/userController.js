const { response } = require('express');



const userGet = (req, response) => {
    response.json({
        msg:'get API - controller '
    });
};

const userPut = (req, response) => {
    response.json({
        msg:'put API - controller'
    });
};

const userPost = (req, response) => {
    response.json({
        msg:'post API - controller'
    });
};

const userDelete = (req, response) => {
    response.json({
        msg:'delete API - controller'
    });
};

const userPatch = (req, response) => {
    response.json({
        msg:'patch API - controller'
    });
};

module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}