// REQUIREMENTS //
const router = require("express").Router();
const sequelize = require("../config/connection");
const {
  Post,
  User,
  Comment
} = require("../models");
const withAuth = require('../utils/auth');

// ROUTES //

// this route will GET all posts for the dashboard
// users will be required to be logged in to use this feature
router.get("/", withAuth, (req, res) => {
  Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: ["id", "title", "content", "created_at"],
      include: [{
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"]
          }
        },
        {
          model: User,
          attributes: ["username"]
        }
      ]
    })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({
        plain: true
      }));
      res.render("dashboard", {
        posts,
        loggedIn: true
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// this route will GET posts by id
// users will be required to be logged in to use this feature
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ["id", "title", "content", "created_at"],
      include: [{
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"]
          }
        },
        {
          model: User,
          attributes: ["username"]
        }
      ]
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({
          message: "No post found with this id!"
        });
        return;
      }
      const post = dbPostData.get({
        plain: true
      });
      res.render("edit-post", {
        post,
        loggedIn: true
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// this route is to GET a new post
router.get("/new", (req, res) => {
  res.render("add-post", {
    loggedIn: true
  })
})

// EXPORT MODULE //
module.exports = router;
