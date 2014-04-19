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
    //this.genCivs();
    //this.genTeams();
    this.randomizePeopleAndCivs();
  },

  randomizePeopleAndCivs: function() {
    this.people.sort(function() {
        return Math.random() - 0.5;
    });

    this.civs.sort(function() {
        return Math.random() - 0.5;
    });

    this.genTeamsAndCivs();
  },

  genTeamsAndCivs: function() {
    var temp_array,
        chunk,
        count = 1,
        civ_count = 1,
        list,
        people = this.people;
    
    chunk = people.length / this.settings.numberOfTeams;
    
    for (i=0; i<people.length; i+=chunk) {
      
        temp_array = people.slice(i,i+chunk);
        var team_container = $('.teams').append('<section class="team team_'+count+'"></section>').find('.team_' + count);

        team_container.append('<h3 class="team_name">Team '+count+'</h3>');
      
        for (var list_i=0; list_i<temp_array.length; list_i++) {
           team_container.append('<div class="player"><div class="player_name">'+temp_array[list_i]+'</div><div class="civ_name">'+this.civs[civ_count]+'</div></div>');
           civ_count++;
        }

        count++;
    }
  }
};

App.init();