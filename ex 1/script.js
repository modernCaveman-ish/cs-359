function Person(fname, lname, age) {
    this.fname = fname;
    this.lname = lname;
    this.age = age;
    this.tellYourAge = function () {
        console.log('My age is ' + this.age);
    }
}

Person.anotherProp = 'Will not appear!!';
var father = new Person('John', 'Doe', 58);
var mother = new Person('Saly', 'Raly', 53);

// console.log(father);
// father.tellYourAge();

function Violin(violinName, makerName, where, year, grade) {
    var it = {};    //{} creates an empty object
    it.violinName = violinName;
    it.makerName = makerName;
    it.where = where;
    it.year = year;
    it.grade = grade;
    return it;
}

var ilCannone = Violin('il Cannone', 'Bartolomeo', 'Giuseppe', 'Cremona', 1743,
'MasterPiece');

console.log(ilCannone);

var ilCanoni = {
    violinName: 'Bla',
    makerName: 'Blabla',
    where: {
        location: 'Cremona',
        country: 'Italy'
    },
    year: 1743,
    play: function(score) {
        makeItSing(score);
    }
}

var firstArray = new Array(10);

var fruits = ['banana', 'mango'];
fruits.forEach(function (item, index) {
    console.log(item, index);
});

function Foo(y) {
    this.y = y;
}

Foo.prototype.x = 10;
Foo.prototype.calculate = function(z) {
    return this.x + this.y + z;
};

console.log(Foo.protoype);
var b = new Foo(20);
console.log('test printing ' + b.y);
console.log('trying to print __proto__ ' + Foo.__proto__.__proto__.__proto__);