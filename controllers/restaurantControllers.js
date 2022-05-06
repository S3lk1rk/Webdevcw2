const restaurantDAO = require("../models/restaurantModel");
const userDao = require("../models/userModel.js");

const db = new restaurantDAO();
db.init();

exports.show_login = function (req, res) {
  res.render("user/login");
};

exports.handle_login = function (req, res) {
  res.render("staffPage", {
    title: "RestaurantCapriciuex",
    user: "user"
  });
};

exports.Dinnerlanding = function (req, res) {
  db.getDinnerMenu()
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

exports.lunchlanding = function (req, res) {
  db.getLunchMenu()
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

exports.showAddDishToDB = function (req, res) {
  res.render("newEntry", {
    title: "RestaurantCapriciuex",
    user: "user",
  });
};

exports.addDishToDB = function (req, res) {
  console.log("processing adddishtodb controller");
  if (!req.body.Menutype) {
    response.status(400).send("Entries must have an Menutype.");
    return;
  }
  db.addEntry(req.body._id, req.body.Menutype, req.body.mealType, req.body.description, req.body.ingredients, req.body.allergens, req.body.price, req.body.dishName, req.body.dishAvailability);
  res.redirect("/loggedin");
};

exports.show_edit_entries = function (req, res) {
  res.render("editPage", {
    title: "RestaurantCapriciuex",
    user: "user",
  });
};

exports.edit_an_entry = function (req, res) {
  console.log("processing editanentry controller");
  if (!req.body.Menutype) {
    response.status(400).send("Entries must have an Menutype.");
    return;
  }
  db.editEntry(req.body._id, req.body.Menutype, req.body.mealType, req.body.description, req.body.ingredients, req.body.allergens, req.body.price, req.body.dishName, req.body.dishAvailability);
  res.redirect("/loggedin");
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
  res.redirect("/loggedin");
};



exports.show_user_entries = function (req, res) {
  let user = req.params.Menutype;
  db.getEntriesByUser(user)
    .then((entries) => {
      res.render("entries", {
        title: "RestaurantCapriciuex",
        user: "user",
        entries: entries,
      });
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
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

exports.stafflanding = function (req, res) {
  db.getAllEntries()
    .then((list) => {
      res.render("staffPage", {
        title: "RestaurantCapriciuex",
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
