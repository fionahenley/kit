const router = require('express').Router();
const { stores } = require('sessions');
const { User, Post, Like } = require('../../model');
const withAuth = require('../../utils/auth');
var sessionName = global.String;

// GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method)
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                  model: Post,
                  attributes: ['title']
                }
              },
            {
                model: Post,
                attributes: ['title'],
                through: Like,
                as: 'liked_posts'
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users
router.post('/', (req, res) => {
    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        location: req.body.location,
        bio: req.body.bio,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.firstname = dbUserData.firstname;
          req.session.loggedIn = true;
    
          res.json(dbUserData);
          console.log(dbUserData) 
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//not being hit at all 
router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    console.log("user.findone")
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => { 
        console.log(dbUserData)       
        if (!dbUserData) {
            res.statusMessage = 'No user with that email address!';
            res.status(400).json({ message: 'No user with that email address!' });
            return;
        }

        // const validPassword = dbUserData.checkPassword(req.body.password);
        // if (!validPassword) {
        //     res.statusMessage = 'Incorrect password!';
        //     res.status(400).json({ message: 'Incorrect password!' });
        //     return;
        // }       

        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.firstname = dbUserData.firstname;
            req.session.lastname = dbUserData.lastname;
            req.session.user_image = dbUserData.user_image;
            req.session.location = dbUserData.location;
            req.session.bio = dbUserData.bio;
            req.session.email = dbUserData.email;
            req.session.loggedIn = true;
            
            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });

        
    });
});

// Logout!
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})  

// PUT /api/users/1
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.statusMessage
                res.status(404).end;
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/users/1
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/users/:userId', withAuth, (req, res) => {
    User.update(
        { user_image: req.body.user_image },
        { where: { id: req.params.userId } }
      )
        .success(result =>
          handleResult(result)
        )
        .error(err =>
          handleError(err)
        )
        req.session.save(() => {
            req.session.user_image = dbUserData.user_image;
        });
      return;
   });

module.exports = router;