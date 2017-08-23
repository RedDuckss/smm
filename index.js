var request = require('request').defaults({ encoding: null }),
    himalaya = require('himalaya');

const URL_BASE = 'https://supermariomakerbookmark.nintendo.net';
const COURSE_URL_BASE = URL_BASE + '/courses/';
const USERDATA_URL_BASE = URL_BASE + '/profile/';

var getCourseData = function(id, cb) {
    request(COURSE_URL_BASE + id, (error, response, body) => {
        if (error) throw error;
        if (response.statusCode == 404) return cb({error: 'Course not found'});

        body = body.toString();

        var json = himalaya.parse(body);
        body = json[2].children[8].children[1].children[0];

        var _return = {}

        _return.id = id;
        _return.name = body.children[3].children[1].children[0].children[0].children[0].content;
        _return.tag = body.children[3].children[1].children[1].children[1].children[1].children[0].content;
        _return.style = body.children[3].children[1].children[1].children[1].children[0].children[0].attributes.className[2].substring(10);

        switch (_return.style) {
            case 'sb':
                _return.style_long = 'superMarioBros';
                _return.style_icon = 'https://www.mariowiki.com/images/6/67/SMM-SMBlogo.png';
                break;
            case 'sb3':
                _return.style_long = 'superMarioBros3';
                _return.style_icon = 'https://www.mariowiki.com/images/e/e8/SMM-SMB3logo.png';
                break;
            case 'sw':
                _return.style_long = 'superMarioWorld';
                _return.style_icon = 'https://www.mariowiki.com/images/6/6e/SMM-SMWlogo.png';
                break;
            case 'sbu':
                _return.style_long = 'newSuperMarioBrosU';
                _return.style_icon = 'https://www.mariowiki.com/images/b/b7/SMM-NSMBUlogo.png';
                break;        
            default:
                _return.style_long = 'unknown';
                break;
        }

        _return.created = body.children[3].children[1].children[1].children[1].children[0].children[1].children[0].content;
        _return.difficulty = body.children[3].children[0].children[1].content;
        _return.plays = '';
        _return.attempts = '';
        _return.clears = '';
        _return.stars = '';
        _return.shares = '';
        _return.clear_rate = '';
        _return.miiverse_url = body.children[3].children[1].children[3].children[2].attributes.href;

        for (var i=0;i<body.children[3].children[0].children[2].children.length;i++) {
            var value = body.children[3].children[0].children[2].children[i].attributes.className[1];
            if (value) {
                value = value.substring(11);
                if (value == 'second') {
                    _return.clear_rate += '.';
                } else if(value !== 'percent') {
                    _return.clear_rate += value;
                }
            }
        }
        _return.clear_rate = parseFloat(_return.clear_rate);

        for (var i=0;i<body.children[3].children[1].children[1].children[2].children[0].children.length;i++) {
            var value = body.children[3].children[1].children[1].children[2].children[0].children[i].attributes.className[1];
            if (value) {
                value = value.substring(11);
                _return.stars += value;
            }
        }
        _return.stars = parseFloat(_return.stars);

        for (var i=0;i<body.children[3].children[1].children[1].children[2].children[1].children.length;i++) {
            var value = body.children[3].children[1].children[1].children[2].children[1].children[i].attributes.className[1];
            if (value) {
                value = value.substring(11);
                _return.plays += value;
            }
        }
        _return.plays = parseFloat(_return.plays);

        for (var i=0;i<body.children[3].children[1].children[1].children[2].children[2].children.length;i++) {
            var value = body.children[3].children[1].children[1].children[2].children[2].children[i].attributes.className[1];
            if (value) {
                value = value.substring(11);
                _return.shares += value;
            }
        }
        _return.shares = parseFloat(_return.shares);

        var clears_attempts = '';
        for (var i=0;i<body.children[3].children[1].children[1].children[3].children.length;i++) {
            var value = body.children[3].children[1].children[1].children[3].children[i].attributes.className[1];
            if (value) {
                value = value.substring(11);
                clears_attempts += value;
            }
        }
        clears_attempts = clears_attempts.split('slash');
        _return.clears = parseFloat(clears_attempts[0]);
        _return.attempts = parseFloat(clears_attempts[1]);

        _return.thumbail = body.children[3].children[1].children[1].children[0].children[0].attributes.src;
        _return.full_view = body.children[3].children[1].children[2].children[0].attributes.src;

        _return.creator = {}
        _return.first_clear = {}
        _return.world_record = {}
        _return.world_record.user = {}
        _return.recent_players = []
        _return.cleared_by = []
        _return.stared_by = []

        _return.creator.profile = URL_BASE + body.children[3].children[1].children[3].children[0].children[0].attributes.href;
        _return.creator.mii = body.children[3].children[1].children[3].children[0].children[0].children[0].attributes.src;
        _return.creator.display_name = body.children[3].children[1].children[3].children[1].children[2].children[0].content;
        _return.creator.profile_name = _return.creator.profile.substring(URL_BASE.length + 9, _return.creator.profile.indexOf('?type=posted'));
        _return.creator.flag = body.children[3].children[1].children[3].children[1].children[0].attributes.className[1];
        _return.creator.medals = parseInt(body.children[3].children[1].children[3].children[1].children[1].attributes.className[2].substring(16));

        if (body.children[6].children[1].children[1].children[0].children[0].children) {
            _return.first_clear.profile = URL_BASE + body.children[6].children[1].children[1].children[0].children[0].children[0].attributes.href;
            _return.first_clear.mii = body.children[6].children[1].children[1].children[0].children[0].children[0].children[0].attributes.src;
            _return.first_clear.display_name = body.children[6].children[1].children[1].children[0].children[1].children[1].children[0].content;
            _return.first_clear.profile_name = _return.first_clear.profile.substring(URL_BASE.length + 9, _return.first_clear.profile.indexOf('?type=posted'));
            _return.first_clear.flag = body.children[6].children[1].children[1].children[0].children[1].children[0].attributes.className[1];
        }

        if (body.children[6].children[0].children[1].children[0].children[0].children) {
            _return.world_record.user.profile = URL_BASE + body.children[6].children[0].children[1].children[0].children[0].children[0].attributes.href;
            _return.world_record.user.mii = body.children[6].children[0].children[1].children[0].children[0].children[0].children[0].attributes.src;
            _return.world_record.user.display_name = body.children[6].children[0].children[1].children[0].children[1].children[1].children[0].content;
            _return.world_record.user.profile_name = _return.world_record.user.profile.substring(URL_BASE.length + 9, _return.world_record.user.profile.indexOf('?type=posted'));
            _return.world_record.user.flag = body.children[6].children[0].children[1].children[0].children[1].children[0].attributes.className[1];

            var time = '';
            for (var i=0;i<body.children[6].children[0].children[1].children[1].children.length;i++) {
                var number = body.children[6].children[0].children[1].children[1].children[i],
                    value = number.attributes.className[1].substring(11);
                if (value == 'minute') {
                    time += ':';
                } else if (value == 'second') {
                    time += '.';
                } else {
                    time += value;
                }
            }

            _return.world_record.time_readable = time;
            _return.world_record.time = toMiliseconds(_return.world_record.time_readable);
        }



        for (var i=0;i<body.children[9].children[0].children.length;i++) {
            var player = body.children[9].children[0].children[i].children[0],
                player_data = {};

            player_data.profile = URL_BASE + player.children[0].children[0].attributes.href;
            player_data.mii = player.children[0].children[0].children[0].attributes.src;
            player_data.display_name = player.children[1].children[1].children[0].content;
            player_data.profile_name = player_data.profile.substring(URL_BASE.length + 9, player_data.profile.indexOf('?type=posted'));
            player_data.flag = player.children[1].children[0].attributes.className[1];
            
            //_return.recent_players.push(player_data);
        }

        for (var i=0;i<body.children[12].children[0].children.length;i++) {
            var player = body.children[12].children[0].children[i].children[0],
                player_data = {};

            player_data.profile = URL_BASE + player.children[0].children[0].attributes.href;
            player_data.mii = player.children[0].children[0].children[0].attributes.src;
            player_data.display_name = player.children[1].children[1].children[0].content;
            player_data.profile_name = player_data.profile.substring(URL_BASE.length + 9, player_data.profile.indexOf('?type=posted'));
            player_data.flag = player.children[1].children[0].attributes.className[1];
            
            //_return.cleared_by.push(player_data);
        }

        for (var i=0;i<body.children[15].children[0].children.length;i++) {
            var player = body.children[15].children[0].children[i].children[0],
                player_data = {};

            player_data.profile = URL_BASE + player.children[0].children[0].attributes.href;
            player_data.mii = player.children[0].children[0].children[0].attributes.src;
            player_data.display_name = player.children[1].children[1].children[0].content;
            player_data.profile_name = player_data.profile.substring(URL_BASE.length + 9, player_data.profile.indexOf('?type=posted'));
            player_data.flag = player.children[1].children[0].attributes.className[1];
            
            //_return.stared_by.push(player_data);
        }

        return cb(null, _return);
        
    });
}

module.exports = {
    getCourseData: getCourseData
}


function toMiliseconds(time) {
    var time = time.split(':');
    return ((parseInt(time[0]) * 60000) + parseFloat(time[1]) * 1000);
}