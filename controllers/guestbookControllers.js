const guestbookDAO = require("../models/guestbookModel");
const userDao = require("../models/userModel.js");

const db = new guestbookDAO();
db.init();

exports.show_login = function (req, res) {
  res.render("user/login");
};

exports.handle_login = function (req, res) {
   //res.redirect("/new");
  res.render("staffPage", {
    title: "Guest Book",
    user: "user"
  });
};

exports.annlanding_page = function (req, res) {
  db.getAnnsEntries()
    .then((list) => {
      res.render("entries", {
        title: "Menu items",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};
exports.peterlanding_page = function (req, res) {
  db.getPetersEntries()
    .then((list) => {
      res.render("entries", {
        title: "Menu items",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.homepage = function (req, res) {
      res.render("home")
};
exports.aboutus = function (req, res) {
  res.render("aboutus")
};

exports.show_new_entries = function (req, res) {
  res.render("newEntry", {
    title: "Guest Book",
    user: "user",
  });
};



exports.post_new_entry = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.author) {
    response.status(400).send("Entries must have an author.");
    return;
  }
  db.addEntry(req.body._id, req.body.author, req.body.mealType, req.body.description, req.body.ingredients, req.body.allergens, req.body.price, req.body.dishName, req.body.dishAvailability);
  res.render("staffPage");
};

exports.show_edit_entries = function (req, res) {
  res.render("editPage", {
    title: "Guest Book",
    user: "user",
  });
};

exports.edit_an_entry = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.author) {
    response.status(400).send("Entries must have an author.");
    return;
  }
  db.editEntry(req.body._id, req.body.author, req.body.mealType, req.body.description, req.body.ingredients, req.body.allergens, req.body.price, req.body.dishName, req.body.dishAvailability);
  res.redirect("/staffPage");
};

exports.availability_of_entries = function (req, res) {
  db.getAllEntries()
  .then((list) => {
    res.render("availabilityPage", {
      title: "Menu items",
      entries: list,
    });
  })
  .catch((err) => {
    console.log("promise rejected", err);
  });
};

exports.hide_an_entry = function (req, res) {
  console.log("hiding an entry");
  db.availibilitychanger(req.body._id,req.body.dishAvailability);
  db.getAllEntries()
};



exports.show_user_entries = function (req, res) {
  let user = req.params.author;
  db.getEntriesByUser(user)
    .then((entries) => {
      res.render("entries", {
        title: "Guest Book",
        user: "user",
        entries: entries,
      });
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};

exports.show_register_page = function (req, res) {
  res.render("user/register");
};

exports.post_new_user = function (req, res) {
  const user = req.body.username;
  const password = req.body.pass;

  if (!user || !password) {
    res.send(401, "no user or no password");
    return;
  }
  userDao.lookup(user, function (err, u) {
    if (u) {
      res.send(401, "User exists:", user);
      return;
    }
    userDao.create(user, password);
    console.log("register user", user, "password", password);
    res.redirect("/login");
  });
};

exports.loggedIn_landing = function (req, res) {
  db.getAllEntries()
    .then((list) => {
      res.render("staffPage", {
        title: "Guest Book",
        user: "user",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/");
};
