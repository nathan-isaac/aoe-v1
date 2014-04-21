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

  el: {
    genBtn: $('.gen-btn'),
    players: $('#players'),
    addNameField: $('.add-name-field'),
    teams: $('.teams'),
    deleteBtn: $('.form-control_action'),
    numOfteams: $('.num-of-teams')
  },
  
  settings: {
    numberOfTeams: 4,
    teamsContainer: $('.teams'),
    civContainer: $('.civ')
  },
  
  init: function() {
    this.bindUIActions();
    this.randomizePeopleAndCivs();
  },

  bindUIActions: function() {
    this.el.genBtn.on('click', function() {
        var randomNum = Math.floor(Math.random() * 38) + 1;
        var audio = new Audio('audio/taunts/'+randomNum+'.mp3');
        audio.play();

        App.people = new Array();

        App.el.players.find('input').each(function() {
            App.people.push($(this).val());
        });

        console.log(App.el.numOfteams.val());

        App.settings.numberOfTeams = App.el.numOfteams.val();

        App.randomizePeopleAndCivs();
    });

    this.el.addNameField.keypress(function(e) {
        if (e.which == 13 && $(this).val() != "") {
            console.log("Enter pressed");
            App.el.players.append('<div class="form-group"><input type="text" value="'+$(this).val()+'" class="form-control" /><i class="form-control_action fa fa-trash-o"></i></div>');
            $(this).val("");
            return false; // prevent the button click from happening
        }
    });

    this.el.players.on('click', '.form-control_action', function() {
        $(this).parent('.form-group').remove();
    });
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

    this.el.teams.empty();

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