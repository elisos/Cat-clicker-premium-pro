/*-----Model------*/

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

let adminModel = {
    adminName: null,
    adminImgSrc: null,
    adminClickCount: null   
}

/*-----Octopus-----*/
let octopus = {
    init: function () {
        model.currentCat = model.cats[0];
        navView.init();
        catView.init();
        adminView.init();
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
    },
    
    getNewName: function () {
        adminView.reName();
    },
    
    getNewPic: function () {
        adminView.newPic();
    },
    
    getNewCount: function () {
        adminView.newCount();
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
                    tab.classList.add('active');
                };
            })(cat));
            
            this.catNav.appendChild(tab);
        }
     }
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

let adminView = {
    init: function () {
        const adminButton = document.getElementById('adminButton');
        const adminForm = document.getElementById("adminForm");
        const cancelButton = document.getElementById('cancelButton');
        const ok = document.getElementById('okButton');
        
        adminButton.addEventListener('click', function(){
            adminForm.style.display = "block";
        });
        
        cancelButton.addEventListener('click', function(){
            adminForm.style.display = "none";
        });
        
        ok.addEventListener('click', this.renderNewInfo);
    },
    
    reName: function() {
        this.adminName= document.getElementById('adminName').value;
        return adminName;
    },
    
    newPic: function() {
        this.adminPic = document.getElementById('adminImgSrc').value;
        return adminPic;
    },
    
    newCount: function() {
        this.adminCount = document.getElementById('adminClickCount').value;
        return adminCount;
    },
    
    renderNewInfo: function () {
        let ok = document.getElementById('okButton');
        const CatName = document.getElementById('catName');
        const catImg = document.getElementById('catImg');
        const counter = document.getElementById('counter');
        this.adminName= document.getElementById('adminName');
        this.adminPic = document.getElementById('adminImgSrc');
        this.adminCount = document.getElementById('adminClickCount');
        
        ok.addEventListener('click', function () {
            if(this.adminCount.value){
                counter.textContent = this.adminCount.value;
            }
            if(this.adminName.value){
                CatName.textContent = this.adminName.value;
            }
            if(this.adminPic.value){
                catImg.src = this.adminPic.value;
            }
            
            adminForm.style.display = "none";
            this.adminCount.value = "";
            this.adminName.value = "";
            this.adminPic.value = "";
        });
    }
}

let highlight = function () {
        const catNav = document.getElementById('catNav');
        let navTabs = catNav.querySelectorAll('li');
        let tabArray = [...navTabs];
    
        catNav.addEventListener('click', function (e) {
            for (tab of tabArray) {
                tab.classList.remove('active');
                e.target.classList.add('active'); 
            }
        });
    }
highlight();

octopus.init();