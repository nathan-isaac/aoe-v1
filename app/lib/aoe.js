// User this plugin for lists: https://github.com/javve/list.js

var App = {
  
  people: [
    'Nathan',
    'Rochelle',
    'Marti',
    'Walt',
    'Jeff',
    'Erica',
    'Logan',
    'Tyler'
  ],
  
  civs: [
    'Britons',
    'Byzanties',
    'Celts',
    'Chinese',
    'Franks',
    'Goths',
    'Huns',
    'Japanese',
    'Koreans',
    'Mongols',
    'Persians',
    'Saracens',
    'Spanish',
    'Teutons',
    'Turks',
    'Vikings'
  ],
  
  settings: {
    numberOfTeams: 4,
    teamsContainer: $('.teams'),
    civContainer: $('.civ')
  },
  
  init: function() {
    //console.log(this.getRandomNum(0,8));
    this.genCivs();
    this.genTeams();
  },
  
  genTeams: function() {
    
    var people = this.people;
    
    // Randomize People
    people.sort(function () {
        return Math.random() - 0.5;
    });
    
    var temp_array,
        chunk,
        count = 1,
        list;
    
    chunk = people.length / this.settings.numberOfTeams;
    
    for (i=0; i<people.length; i+=chunk) {
      
        temp_array = people.slice(i,i+chunk);
      
        $('.teams').append('<h3>Team '+count+'</h3>');
        
        list = $('.teams').append('<ul class="team_'+i+'"></ul>').find('.team_'+i);
      
        for (var list_i=0; list_i<temp_array.length; list_i++)
        {
           list.append('<li>'+temp_array[list_i]+'</li>');
        }
        
        count++;
    }
    
  },
  
  genCivs: function() {
    var civs = this.civs;
    // Randomize People
    civs.sort(function () {
        return Math.random() - 0.5;
    });
    
    console.log(civs);
    
    for (i=0; i<this.people.length; i++) {
      console.log(this.people[i] + ' with ' + civs[i]);
      $('.civ_list').append('<li><strong>'+this.people[i]+':</strong> '+civs[i]+'</li>');
    }
  }
};

App.init();