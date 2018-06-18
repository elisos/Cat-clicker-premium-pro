/*-----Model------*/
//class Cat {
//    constructor (name, imgSrc, clickCount = 0) {
//        this.name = name;
//        this.imgSrc = imgSrc;
//        this.clickCount = 0;
//    }
//}
//
//let biscuit = new Cat('Biscuit', "biscuit.png");
//let ginger = new Cat('Ginger', "ginger.png");
//let snowy = new Cat('Snowy', "snowy.png");
//let goblin = new Cat('Goblin', "goblin.png");
//let mitzi = new Cat('Mitzi', "mitzi.png");
//let gingko = new Cat('Gingko', "gingko.png");
//
//const catArray = [biscuit, ginger, snowy, goblin, mitzi, gingko];

let model = {
    currentCat: null,
    cats:[
        {name: 'Biscuit',
          clickCount: 0,
          imgSrc: "biscuit.png"},
         {name: 'Ginger',
          clickCount: 0,
          imgSrc: "ginger.png"},
          {name: 'Snowy',
          clickCount: 0,
          imgSrc: "snowy.png"},
          {name: 'Goblin',
          clickCount: 0,
          imgSrc: "goblin.png"},
          {name: 'Mitzi',
          clickCount: 0,
          imgSrc: "mitzi.png"},
          {name: 'Gingko',
          clickCount: 0,
          imgSrc: "gingko.png"}
    ]
};

/*-----Octopus-----*/
let octopus = {
    init: function () {
        model.currentCat = model.cats[0];
        navView.init();
        catView.init();
    },
    
    getCurrentCat: function () {
        return model.currentCat;
    },
    
    getCats: function () {
        return model.cats;
    },
    
    setCurrentCat: function (cat) {
        model.currentCat = cat;
    },
    
    incrementCounter: function () {
        model.currentCat.clickCount++;
        catView.render();
    }
}

/*-----Views-----*/
let navView = {
    init: function () {
        this.catNav = document.getElementById('catNav');
        this.render();
    },
    
    render: function () {
        let cat, tab;
        let cats = octopus.getCats();
        this.catNav = document.getElementById('catNav');
        this.catNav.innerHTML = "";
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            tab = document.createElement('li');
            tab.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            tab.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));
            
            this.catNav.appendChild(tab);
        }
     },
    
        
//   highlight: function () {
//        this.catNav = document.getElementById('catNav');
//        let navTabs = this.catNav.querySelectorAll('li');
//        let tabArray = [...navTabs];
//    
//        this.catNav.addEventListener('click', function (e) {
//            for (tab of tabArray) {
//                tab.classList.remove('active');
//                e.target.classList.add('active'); 
//            }
//        }
//    }
}
    
let catView = {
    init: function () {
        this.catDiv = document.getElementById('catDiv');
        this.CatName = document.getElementById('catName');
        this.catImg = document.getElementById('catImg');
        this.counter = document.getElementById('counter');
    
        this.catImg.addEventListener('click', function(){
            octopus.incrementCounter();
        });
        this.render();
    },
    
    render: function () {
        let currentCat = octopus.getCurrentCat();
        this.counter.textContent = currentCat.clickCount;
        this.CatName.textContent = currentCat.name;
        this.catImg.src = currentCat.imgSrc;
    }
}

octopus.init();