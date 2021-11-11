const User = require('../models/user');

exports.loadUser = async (req, res) => {

    try {
        let user = await User.findById(req.payload.id);
        if (!user) {
            res.status(404);
        }
        res.json({user: user.toAuthJSON()});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.login = async (req, res) => {    
    try {
        let user = await User.findOne({email: req.body.email});

        if (!user) {
            return res.status(404).json({ msg: "User doesn't exists"});
        } else {

            if (user.validPassword(req.body.password)) {
                return res.json({user: user.toAuthJSON()});
            } else {
                return res.status(404).json({ msg: "Pass don't match"});
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.register = async (req, res, next) => {
    var user = new User();

    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save().then(function(){
        return res.json({user: user.toAuthJSON()});
    }).catch(next);
}

exports.updateUser = async (req, res, next) => {

    let user = await User.findById(req.payload.id);

    if(!user){ return res.sendStatus(401); }

    if(typeof req.body.user.username !== 'undefined'){
        user.username = req.body.user.username;
    }
    if(typeof req.body.user.email !== 'undefined'){
        user.email = req.body.user.email;
    }
    if(typeof req.body.user.bio !== 'undefined'){
        user.bio = req.body.user.bio;
    }

    if(typeof req.body.user.password !== 'undefined'){
        user.setPass(req.body.user.password);
    }

    user.save().then(function(){
        return res.json({user: user.toAuthJSON()});
    });

}

exports.follow = async (req, res) => {

    let userLogged = await User.findOne({_id: req.payload.id});
    let userFollowing = await User.findOne({username: req.body.username});

    userLogged.following.push(userFollowing._id);

    userLogged.save();

    res.json(userLogged.toProfileJSONFor(userFollowing));
}

exports.unfollow = async (req, res) => {
   
    let userLogged = await User.findOne({_id: req.payload.id});
    let userFollowing = await User.findOne({username: req.params.username});

    let position = userLogged.following.indexOf(userFollowing._id);

    userLogged.following.pop(position, 1);

    userLogged.save();

    res.json(userLogged.toProfileJSONFor(userFollowing));
}