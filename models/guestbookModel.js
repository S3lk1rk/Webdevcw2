const nedb = require('nedb');
class GuestBook {
    constructor(dbFilePath) {
        if (dbFilePath) {
        this.db = new nedb({ filename: dbFilePath, autoload: true });
        console.log('DB connected to ' + dbFilePath);
        } else {
        this.db = new nedb();
        }
        }
    //a function to seed the database
init() {

this.db.insert({
    _id: '1',
    author: 'Lunch',
    mealType: 'Main',
    description: 'A hearty locally sourced breakfast to start your day right.',
    ingredients: 'Baked beans, gluten free pork sausage, frittata muffin, white potato, roast mushroom',
    allergens: 'mustard, eggs and soya bean',
    price: '£9.00',
    dishName: 'The Après Organic English Breakfast',
    dishAvailability: 'available',
    });
    //for later debugging
    console.log('db entry Lunch inserted');
    
this.db.insert({
    _id:'2',
    author: 'Lunch',
    mealType: 'Main',
    description: 'a healthy meal  high in protein and big on flavour',
    ingredients: '1tbsp tamari, curry powder, cumin, garlic, clear honey, chicken breast, peanut butter, sweet chilli sauce, lime juice, sunflower oil, Little Gem lettuce, cucumber, banana shallot, coriander, pomegranate',
    allergens: 'Peanut',
    price: '£6.50',
    dishName: 'Chicken satay salad',
    dishAvailability: 'available',
    });
    //for later debugging
    console.log('db entry Lunch inserted');

this.db.insert({
    _id:'3',
    author: 'Dinner',
    mealType: 'Main',
    description: 'A low-calorie vegan linguine which can also be served cold as a pasta salad. It delivers on flavour and its healthy.',
    ingredients:'wholemeal linguine, lime, avocado, tomatoes, chopped, coriander, red onion, red chilli',
    allergens: 'Gluten, Avocado',
    price: '£5.50',
    dishName: 'Linguine with avocado, tomato & lime',
    dishAvailability: 'available',   
    });
    //for later debugging
    console.log('db entry Ann inserted');
  

this.db.insert({
    _id:'4',
    author: 'Dinner',
    mealType: 'Starter',
    description: 'A healthy vegetarian take on a classic dish.',
    ingredients: 'cauliflower puree, Beetroot fritters,  roast aubergine, parsley dressing.' ,
    allergens: 'None',
    price: '£8.80',
    dishName: 'Organic Beetroot & Apple Fritters with Mint & Chilli Dressing',   
    dishAvailability: 'available',
    });
    //for later debugging
    console.log('db entry Ann inserted');

this.db.insert({
    _id:'5',
    author: 'Dinner',
    mealType: 'Main',
    description: '',
    ingredients: '' ,
    allergens: '',
    price: '£',
    dishName: '',  
    dishAvailability: 'available', 
    });
    //for later debugging
    console.log('db entry Ann inserted');

this.db.insert({
    _id:'6',
    author: 'Dinner',
    mealType: 'Main',
    description: '',
    ingredients: '' ,
    allergens: '',
    price: '£',
    dishName: '',   
    dishAvailability: 'available',
    });
    //for later debugging
    console.log('db entry Ann inserted');

/*
this.db.remove({ dishName: 'Organic Beetroot & Apple Fritters with Mint & Chilli Dressing' }, {}, function (err, numRemoved) {
    // numRemoved = 1
    console.log('removed beetroot');
  });
*/

}

//a function to return all entries from the database
getAllEntries() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
    //use the find() function of the database to get the data,
    //error first callback function, err for error, entries for data
    this.db.find({}, function(err, entries) {
    //if error occurs reject Promise
    if (err) {
    reject(err);
    //if no error resolve the promise & return the data
    } else {
    resolve(entries);
    //to see what the returned data looks like
    console.log('function all() returns: ', entries);
    }
    })
    })
    }
getPetersEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
        //find(author:'Peter) retrieves the data,
        //with error first callback function, err=error, entries=data
        this.db.find({dishAvailability:'available', author: 'Lunch' }, function(err, entries) {
        //if error occurs reject Promise
        if (err) {
        reject(err);
        //if no error resolve the promise and return the data
        } else {
        resolve(entries);
        //to see what the returned data looks like
        console.log('getPetersEntries() returns: ', entries);
        }
        })
        })
        }
getAnnsEntries() {
            //return a Promise object, which can be resolved or rejected
            return new Promise((resolve, reject) => {
            //find(author:'Peter) retrieves the data,
            //with error first callback function, err=error, entries=data
            this.db.find({dishAvailability:'available', author: 'Dinner' }, function(err, entries) {
            //if error occurs reject Promise
            if (err) {
            reject(err);
            //if no error resolve the promise and return the data
            } else {
            resolve(entries);
            //to see what the returned data looks like
            console.log('getPetersEntries() returns: ', entries);
            }
            })
            })
            }

availibilitychanger(identification,available) {
        this.db.update({ _id: identification}, {  $set: { dishAvailability: available } }, {}, function (err, numReplaced) {
            // numReplaced = 3
            // Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
          }) 
    }   
                
editEntry(identification, author, dmealtype, ddescription,dingredients, dallergen, dprice, ddish, available) {
    var entry = {
        _id: identification,
        author: author,
        mealType: dmealtype,
        description: ddescription,
        ingredients: dingredients,
        allergens: dallergen,
        price: dprice,
        dishName: ddish,
        dishAvailability: available
        }
        this.db.update({ _id: identification }, { $set: entry }, { multi: true }, function (err, numReplaced) {
            // numReplaced = 3
            // Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
          })
         
    }   
    
addEntry(identification, author, dmealtype, ddescription, dingredients, dallergen, dprice, ddish, available) {
            var entry = {
            _id: identification,
            author: author,
            mealType: dmealtype,
            description: ddescription,
            ingredients: dingredients,
            allergens: dallergen,
            price: dprice,
            dishName: ddish,
            dishAvailability: available
            }
            console.log('entry created', entry);
            this.db.insert(entry, function(err, doc) {
            if (err) {
            console.log('Error inserting document', ddish);
            } else {
            console.log('document inserted into the database', doc);
            }
            }) 
        }  
        
/*
this.db.update({ dishName: 'Organic Beetroot & Apple Fritters with Mint & Chilli Dressing' }, { $set: { dishName: 'Dog biscuit' } }, { multi: true }, function (err, numReplaced) {
    // numReplaced = 3
    // Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
  });
*/        
/*        
updateEntry(_id,available, ddish, dprice, description, dallergen, dingredients, dmealtype, author) {
    this.db.update(
        { _id: _id}, 
        { $set: { dishAvailability: available} },
        { $set: { dishName: ddish} },
        { $set: { price: dprice} },
        { $set: { description: description} },
        { $set: { allergens: dallergen} },
        { $set: { ingredients: dingredients} },
        { $set: { mealType: dmealtype} },
        { $set: { author: author} },
        ); 
}
*//*
editDish() {
  this.db.update({ dishName: 'Organic Beetroot & Apple Fritters with Mint & Chilli Dressing' }, { $set: { dishName: 'Dog biscuit' } }, { multi: true }, function (err, numReplaced) {
    // numReplaced = 3
    // Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
  });
}*/
/*
removeEntry(ddish)
    var entry = {
    author: author,
    mealType: dmealtype,
    description: ddescription,
    ingredients: dingredients,
    allergens: dallergen,
    price: dprice,
    dishName: ddish
    }
    console.log('entry created', entry);
    this.db.d(entry, function(err, doc) {
    if (err) {
    console.log('Error inserting document', subject);
    } else {
    console.log('document inserted into the database', doc);
    }
    }) 
}       
 */  
getEntriesByUser(authorName) {
            return new Promise((resolve, reject) => {
                this.db.find({ 'author': authorName }, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                console.log('getEntriesByUser returns: ', entries);
            }
        })
    })
 }

 
}
module.exports = GuestBook;